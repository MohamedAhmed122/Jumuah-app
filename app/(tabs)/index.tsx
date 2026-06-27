import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { and, eq } from 'drizzle-orm';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PrayerCard } from '@components/PrayerCard';
import { Colors } from '@constants/Colors';
import type { PrayerName } from '@constants/prayerMethods';
import { PRAYER_NAMES } from '@constants/prayerMethods';
import { fetchMosquePrayerTimes } from '@src/api/locations';
import { db } from '@src/db';
import { prayerLogs, qadaCounters } from '@src/db/schema';
import { usePrayerTimes } from '@src/hooks/usePrayerTimes';
import { scheduleAlKahfReminder, scheduleDailyNotifications } from '@src/notifications/scheduler';
import type { PrayerTimes } from '@src/prayer/calculator';
import { toHijri } from '@src/prayer/hijri';
import { useSettingsStore } from '@src/stores/settingsStore';

type LogMap = Partial<Record<PrayerName, 'prayed' | 'missed'>>;

function timeStringToDate(date: Date, time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  const d = new Date(date);
  d.setHours(hours, minutes, 0, 0);
  return d;
}

function applyMosqueTimes(base: PrayerTimes, date: Date, times: Record<PrayerName, string>): PrayerTimes {
  return {
    ...base,
    fajr: timeStringToDate(date, times.fajr),
    dhuhr: timeStringToDate(date, times.dhuhr),
    asr: timeStringToDate(date, times.asr),
    maghrib: timeStringToDate(date, times.maghrib),
    isha: timeStringToDate(date, times.isha),
    meta: {
      ...base.meta,
      highLatitudeFallback: false,
      isAsrWindowShort: false,
    },
  };
}

function getActivePrayer(times: ReturnType<typeof usePrayerTimes>): PrayerName | null {
  if (!times) return null;
  const now = new Date();
  let active: PrayerName | null = null;
  for (const p of PRAYER_NAMES) {
    if ((times as any)[p] <= now) active = p;
    else break;
  }
  return active;
}

function getNextPrayer(times: ReturnType<typeof usePrayerTimes>): { name: PrayerName; time: Date } | null {
  if (!times) return null;
  const now = new Date();
  for (const p of PRAYER_NAMES) {
    const t = (times as any)[p] as Date;
    if (t > now) return { name: p, time: t };
  }
  return null;
}

export default function PrayerScreen() {

  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { notificationToggles, kahfReminderEnabled, userCoordinates, preferredMosqueId, togglePrayerNotification } = useSettingsStore();
  // const { userCoordinates } = useSettingsStore();

  // console.log('userCoordinatesuserCoordinates', userCoordinates)
  const calculatedTimes = usePrayerTimes();
  const [overrideTimes, setOverrideTimes] = useState<PrayerTimes | null>(null);
  const [logs, setLogs] = useState<LogMap>({});
  const [countdown, setCountdown] = useState('--:--:--');
  const [showBanner, setShowBanner] = useState(true);
  const [showAsrWarning, setShowAsrWarning] = useState(true);

  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const hijri = toHijri(new Date());
  const times = overrideTimes ?? calculatedTimes;
  const activePrayer = getActivePrayer(times);
  const nextPrayer = getNextPrayer(times);

  const loadLogs = useCallback(async () => {
    const rows = await db.select().from(prayerLogs).where(eq(prayerLogs.date, todayStr));
    const map: LogMap = {};
    for (const r of rows) {
      map[r.prayer as PrayerName] = r.prayed ? 'prayed' : 'missed';
    }
    setLogs(map);
  }, [todayStr]);

  useFocusEffect(useCallback(() => { loadLogs(); }, [loadLogs]));

  useEffect(() => {
    let cancelled = false;

    const loadMosqueOverride = async () => {
      if (!preferredMosqueId) {
        setOverrideTimes(null);
        return;
      }

      try {
        const items = await fetchMosquePrayerTimes(preferredMosqueId, todayStr, todayStr);
        const todayOverride = items.find((item) => item.date === todayStr);
        if (!cancelled && todayOverride) {
          setOverrideTimes(applyMosqueTimes(calculatedTimes, new Date(), todayOverride.times));
        } else if (!cancelled) {
          setOverrideTimes(null);
        }
      } catch {
        if (!cancelled) setOverrideTimes(null);
      }
    };

    loadMosqueOverride();
    return () => { cancelled = true; };
  }, [preferredMosqueId, todayStr, calculatedTimes]);

  // Countdown timer
  useEffect(() => {
    if (!nextPrayer) return;
    const tick = () => {
      const diff = nextPrayer.time.getTime() - Date.now();
      if (diff <= 0) { setCountdown('00:00:00'); return; }
      const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      setCountdown(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [nextPrayer?.time.getTime()]);

  // Schedule notifications when settings change
  useEffect(() => {
    if (!times) return;
    scheduleDailyNotifications(new Date(), userCoordinates, notificationToggles, times);
    scheduleAlKahfReminder(kahfReminderEnabled);
  }, [notificationToggles, kahfReminderEnabled, times]);

  const handleLog = async (prayer: PrayerName, prayed: boolean) => {
    const now = new Date().toISOString();
    const existing = await db.select().from(prayerLogs).where(
      and(eq(prayerLogs.date, todayStr), eq(prayerLogs.prayer, prayer))
    );

    if (existing.length > 0) {
      await db.update(prayerLogs).set({ prayed, loggedAt: now }).where(
        and(eq(prayerLogs.date, todayStr), eq(prayerLogs.prayer, prayer))
      );
    } else {
      await db.insert(prayerLogs).values({ date: todayStr, prayer, prayed, loggedAt: now });
    }

    // Update qada counter
    if (!prayed) {
      const existing = await db.select().from(qadaCounters).where(eq(qadaCounters.prayer, prayer));
      if (existing.length > 0) {
        await db.update(qadaCounters).set({ count: existing[0].count + 1 }).where(eq(qadaCounters.prayer, prayer));
      } else {
        await db.insert(qadaCounters).values({ prayer, count: 1 });
      }
    }

    loadLogs();
  };

  const gregDateStr = new Date().toLocaleDateString(undefined, {
    weekday: 'short', month: 'short', day: 'numeric',
  });

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.hijriDate}>{hijri.day} {hijri.monthName} {hijri.year}</Text>
          <Text style={styles.gregDate}>{gregDateStr}</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => router.push('/qibla')} style={styles.iconBtn}>
            <MaterialCommunityIcons name="compass" size={24} color={Colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/calendar')} style={styles.iconBtn}>
            <MaterialCommunityIcons name="calendar-month" size={24} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Summer banner */}
        {showBanner && times?.meta.highLatitudeFallback && (
          <View style={styles.banner}>
            <View style={styles.bannerText}>
              <Text style={styles.bannerTitle}>{t('prayer.summer_banner_title')}</Text>
              <Text style={styles.bannerBody}>{t('prayer.summer_banner_body')}</Text>
            </View>
            <TouchableOpacity onPress={() => setShowBanner(false)} hitSlop={12}>
              <MaterialCommunityIcons name="close" size={18} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        )}

        {showAsrWarning && times?.meta.isAsrWindowShort && (
          <View style={styles.banner}>
            <View style={styles.bannerText}>
              <Text style={styles.bannerTitle}>{t('prayer.asr_short_title')}</Text>
              <Text style={styles.bannerBody}>
                {t('prayer.asr_short_body', { minutes: times.meta.asrWindowMinutes })}
              </Text>
            </View>
            <TouchableOpacity onPress={() => setShowAsrWarning(false)} hitSlop={12}>
              <MaterialCommunityIcons name="close" size={18} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        )}

        {/* Next prayer countdown */}
        {nextPrayer && (
          <View style={styles.countdownCard}>
            <Text style={styles.countdownLabel}>{t('prayer.next_prayer')}</Text>
            <Text style={styles.countdownPrayer}>{t(`prayer.${nextPrayer.name}`)}</Text>
            <Text style={styles.countdownTimer}>{countdown}</Text>
          </View>
        )}

        {/* Prayer cards */}
        {times && PRAYER_NAMES.map((prayer) => (
          <PrayerCard
            key={prayer}
            prayer={prayer}
            time={(times as any)[prayer]}
            isActive={activePrayer === prayer}
            isNext={nextPrayer?.name === prayer}
            hasPassed={(times as any)[prayer] <= new Date()}
            status={logs[prayer] ?? null}
            adhanEnabled={notificationToggles[prayer]?.adhan ?? true}
            reminderEnabled={notificationToggles[prayer]?.reminder ?? true}
            onAdhanToggle={() => togglePrayerNotification(prayer, 'adhan')}
            onReminderToggle={() => togglePrayerNotification(prayer, 'reminder')}
            onLog={(prayed) => handleLog(prayer, prayed)}
          />
        ))}

        {/* Quick nav */}
        <View style={styles.quickNav}>
          {([
            { route: '/tracker', icon: 'check-circle-outline', key: 'tracker.title' },
            { route: '/qada', icon: 'redo-variant', key: 'qada.title' },
            { route: '/stats', icon: 'chart-bar', key: 'tracker.history' },
          ] as const).map(({ route, icon, key }) => (
            <TouchableOpacity key={route} style={styles.quickBtn} onPress={() => router.push(route as any)}>
              <MaterialCommunityIcons name={icon} size={22} color={Colors.accent} />
              <Text style={styles.quickLabel}>{t(key)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  hijriDate: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  gregDate: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  headerIcons: { flexDirection: 'row', gap: 12 },
  iconBtn: { padding: 6 },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 32 },

  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.surfaceElevated,
    borderColor: Colors.accentSoft,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    gap: 12,
  },
  bannerText: { flex: 1 },
  bannerTitle: { fontSize: 13, fontWeight: '700', color: Colors.accentSoft, marginBottom: 2 },
  bannerBody: { fontSize: 12, color: Colors.textSecondary, lineHeight: 17 },

  countdownCard: {
    backgroundColor: Colors.surfaceElevated,
    borderColor: Colors.accent,
    borderWidth: 1,
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 16,
  },
  countdownLabel: { fontSize: 12, color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1 },
  countdownPrayer: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary, marginTop: 4 },
  countdownTimer: { fontSize: 38, fontWeight: '200', color: Colors.accent, letterSpacing: 2, marginTop: 6 },

  quickNav: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  quickBtn: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 14,
    gap: 6,
  },
  quickLabel: { fontSize: 11, color: Colors.textSecondary, textAlign: 'center' },
});

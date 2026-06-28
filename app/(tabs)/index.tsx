import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { and, eq } from 'drizzle-orm';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PrayerCard } from '@components/PrayerCard';
import { JummahCard } from '@components/JummahCard';
import { Colors } from '@constants/Colors';
import type { PrayerName } from '@constants/prayerMethods';
import { PRAYER_NAMES } from '@constants/prayerMethods';
import { fetchLocationBundle, fetchMosquePrayerTimes, type Mosque } from '@src/api/locations';
import { db } from '@src/db';
import { prayerLogs, qadaCounters } from '@src/db/schema';
import { usePrayerTimes } from '@src/hooks/usePrayerTimes';
import { scheduleAlKahfReminder, scheduleDailyNotifications } from '@src/notifications/scheduler';
import type { PrayerTimes } from '@src/prayer/calculator';
import { calculatePrayerTimes } from '@src/prayer/calculator';
import {
  applyMosquePrayerTimes,
  calculateIqamaTimes,
  getActiveJummahTimes,
  type IqamaTimes,
} from '@src/prayer/mosqueTimes';
import { toHijri } from '@src/prayer/hijri';
import { useSettingsStore } from '@src/stores/settingsStore';

type LogMap = Partial<Record<PrayerName, 'prayed' | 'missed'>>;

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

type NextPrayer = { name: PrayerName | 'jummah'; time: Date };

function getNextPrayer(
  times: ReturnType<typeof usePrayerTimes>,
  jummahTimes: Date[],
): NextPrayer | null {
  if (!times) return null;
  const now = new Date();
  const prayers: NextPrayer[] = PRAYER_NAMES
    .filter((prayer) => prayer !== 'dhuhr' || jummahTimes.length === 0)
    .map((name) => ({ name, time: times[name] }));

  prayers.push(...jummahTimes.map((time) => ({ name: 'jummah' as const, time })));
  return prayers
    .filter((prayer) => prayer.time > now)
    .sort((a, b) => a.time.getTime() - b.time.getTime())[0] ?? null;
}

export default function PrayerScreen() {

  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { notificationToggles, kahfReminderEnabled, userCoordinates, preferredMosqueId, togglePrayerNotification } = useSettingsStore();
  // const { userCoordinates } = useSettingsStore();

  // console.log('userCoordinatesuserCoordinates', userCoordinates)
  const [refreshing, setRefreshing] = useState(false);
  const [refreshNonce, setRefreshNonce] = useState(0);
  const calculatedTimes = usePrayerTimes(new Date(), refreshNonce);
  const [overrideTimes, setOverrideTimes] = useState<PrayerTimes | null>(null);
  const [iqamaTimes, setIqamaTimes] = useState<IqamaTimes>({});
  const [selectedMosque, setSelectedMosque] = useState<Mosque | null>(null);
  const [prayerSource, setPrayerSource] = useState<'mosque' | 'calculated'>('calculated');
  const [logs, setLogs] = useState<LogMap>({});
  const [countdown, setCountdown] = useState('--:--:--');
  const [showBanner, setShowBanner] = useState(true);
  const [showAsrWarning, setShowAsrWarning] = useState(true);

  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const hijri = toHijri(new Date());
  const times = overrideTimes ?? calculatedTimes;
  const jummahTimes = getActiveJummahTimes(selectedMosque, new Date());
  const activePrayer = getActivePrayer(times);
  const nextPrayer = getNextPrayer(times, jummahTimes);

  const loadLogs = useCallback(async () => {
    const rows = await db.select().from(prayerLogs).where(eq(prayerLogs.date, todayStr));
    const map: LogMap = {};
    for (const r of rows) {
      map[r.prayer as PrayerName] = r.prayed ? 'prayed' : 'missed';
    }
    setLogs(map);
  }, [todayStr]);

  const loadPrayerData = useCallback(async () => {
    if (!preferredMosqueId) {
      setOverrideTimes(null);
      setIqamaTimes({});
      setSelectedMosque(null);
      setPrayerSource('calculated');
      return;
    }

    let baseTimes = calculatedTimes;
    let mosque: Mosque | null = null;
    try {
      const bundle = await fetchLocationBundle(refreshNonce > 0);
      mosque = bundle.mosques.find((item) => item.id === preferredMosqueId) ?? null;
      if (mosque) {
        baseTimes = calculatePrayerTimes(new Date(), { lat: mosque.lat, lng: mosque.lng });
      }
    } catch {
      // Keep the user's local calculation when mosque metadata is unavailable.
    }

    try {
      const items = await fetchMosquePrayerTimes(preferredMosqueId, todayStr, todayStr);
      const todayOverride = items.find((item) => item.date === todayStr);
      const resolvedTimes = todayOverride
        ? applyMosquePrayerTimes(baseTimes, new Date(), todayOverride.times)
        : baseTimes;
      setOverrideTimes(resolvedTimes);
      setIqamaTimes(calculateIqamaTimes(resolvedTimes, mosque?.iqamaOffsets));
      setSelectedMosque(mosque);
      setPrayerSource(todayOverride ? 'mosque' : 'calculated');
    } catch {
      setOverrideTimes(baseTimes);
      setIqamaTimes(calculateIqamaTimes(baseTimes, mosque?.iqamaOffsets));
      setSelectedMosque(mosque);
      setPrayerSource('calculated');
    }
  }, [preferredMosqueId, todayStr, calculatedTimes, refreshNonce]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await loadPrayerData();
      await loadLogs();
      if (!cancelled) setRefreshing(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [refreshNonce, loadPrayerData, loadLogs]);

  useFocusEffect(useCallback(() => { loadLogs(); }, [loadLogs]));

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

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshNonce((value) => value + 1);
  }, []);

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

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.accent}
            colors={[Colors.accent]}
          />
        }
      >
        {selectedMosque && (
          <View style={styles.mosqueSource}>
            <MaterialCommunityIcons name="mosque" size={17} color={Colors.accent} />
            <View style={styles.mosqueSourceText}>
              <Text style={styles.mosqueSourceName}>{selectedMosque.name}</Text>
              <Text style={styles.mosqueSourceDetail}>
                {t(prayerSource === 'mosque' ? 'prayer.source_mosque' : 'prayer.source_calculated')}
              </Text>
            </View>
          </View>
        )}

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
        {times && PRAYER_NAMES.map((prayer) => {
          if (prayer === 'dhuhr' && jummahTimes.length > 0) {
            return <JummahCard key="jummah" times={jummahTimes} isNext={nextPrayer?.name === 'jummah'} />;
          }

          return (
            <PrayerCard
              key={prayer}
              prayer={prayer}
              time={times[prayer]}
              iqamaTime={iqamaTimes[prayer]}
              isActive={activePrayer === prayer}
              isNext={nextPrayer?.name === prayer}
              hasPassed={times[prayer] <= new Date()}
              status={logs[prayer] ?? null}
              adhanEnabled={notificationToggles[prayer]?.adhan ?? true}
              reminderEnabled={notificationToggles[prayer]?.reminder ?? true}
              onAdhanToggle={() => togglePrayerNotification(prayer, 'adhan')}
              onReminderToggle={() => togglePrayerNotification(prayer, 'reminder')}
              onLog={(prayed) => handleLog(prayer, prayed)}
            />
          );
        })}

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
  mosqueSource: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
  },
  mosqueSourceText: { flex: 1 },
  mosqueSourceName: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary },
  mosqueSourceDetail: { fontSize: 11, color: Colors.textSecondary, marginTop: 1 },

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

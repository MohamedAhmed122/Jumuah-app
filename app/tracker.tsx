import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format, subDays } from 'date-fns';
import { and, eq, gt, gte } from 'drizzle-orm';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@constants/Colors';
import type { PrayerName } from '@constants/prayerMethods';
import { PRAYER_NAMES } from '@constants/prayerMethods';
import { db } from '@src/db';
import { prayerLogs, qadaCounters } from '@src/db/schema';
import { calculatePrayerTimes } from '@src/prayer/calculator';
import { useSettingsStore } from '@src/stores/settingsStore';

interface DayLog { date: string; prayers: Record<PrayerName, 'prayed' | 'missed' | null> }

function getPrayerDateTime(date: string, prayer: PrayerName, coords: { lat: number; lng: number }) {
  const day = new Date(`${date}T12:00:00`);
  return calculatePrayerTimes(day, coords)[prayer];
}

function isPrayerInFuture(date: string, prayer: PrayerName, coords: { lat: number; lng: number }, now: Date) {
  const dayStart = new Date(`${date}T00:00:00`);
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  if (dayStart.getTime() > todayStart.getTime()) return true;
  return getPrayerDateTime(date, prayer, coords).getTime() > now.getTime();
}

async function loadHistory(
  coords: { lat: number; lng: number },
  days = 30,
): Promise<DayLog[]> {
  const today = new Date();
  const since = format(subDays(today, days - 1), 'yyyy-MM-dd');
  const todayStr = format(today, 'yyyy-MM-dd');

  await db.delete(prayerLogs).where(gt(prayerLogs.date, todayStr));
  for (const prayer of PRAYER_NAMES) {
    if (isPrayerInFuture(todayStr, prayer, coords, today)) {
      await db.delete(prayerLogs).where(
        and(eq(prayerLogs.date, todayStr), eq(prayerLogs.prayer, prayer)),
      );
    }
  }

  const rows = await db.select().from(prayerLogs).where(gte(prayerLogs.date, since));

  const map: Record<string, Record<string, 'prayed' | 'missed'>> = {};
  for (const r of rows) {
    if (r.date > todayStr) continue;
    if (!map[r.date]) map[r.date] = {};
    map[r.date][r.prayer] = r.prayed ? 'prayed' : 'missed';
  }

  return Array.from({ length: days }, (_, i) => {
    const d = format(subDays(today, i), 'yyyy-MM-dd');
    const prayers = {} as Record<PrayerName, 'prayed' | 'missed' | null>;
    for (const p of PRAYER_NAMES) prayers[p] = (map[d]?.[p] as any) ?? null;
    return { date: d, prayers };
  });
}

function StatusDot({ status }: { status: 'prayed' | 'missed' | null }) {
  if (status === 'prayed')
    return <MaterialCommunityIcons name="check-circle" size={22} color={Colors.accent} />;
  if (status === 'missed')
    return <MaterialCommunityIcons name="close-circle" size={22} color={Colors.error} />;
  return <MaterialCommunityIcons name="circle-outline" size={22} color={Colors.border} />;
}

function LockedDot() {
  return <MaterialCommunityIcons name="lock-outline" size={20} color={Colors.border} />;
}

export default function TrackerScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { userCoordinates } = useSettingsStore();
  const [history, setHistory] = useState<DayLog[]>([]);

  const refresh = useCallback(async () => setHistory(await loadHistory(userCoordinates)), [userCoordinates]);
  useEffect(() => { refresh(); }, []);

  const handleToggle = async (date: string, prayer: PrayerName, current: 'prayed' | 'missed' | null) => {
    if (isPrayerInFuture(date, prayer, userCoordinates, new Date())) return;

    const next = current === 'prayed' ? 'missed' : 'prayed';
    const now = new Date().toISOString();

    const existing = await db.select().from(prayerLogs).where(
      and(eq(prayerLogs.date, date), eq(prayerLogs.prayer, prayer))
    );

    const wasNoPreviously = current === 'missed';
    const isNowNo = next === 'missed';

    if (existing.length > 0) {
      await db.update(prayerLogs).set({ prayed: next === 'prayed', loggedAt: now }).where(
        and(eq(prayerLogs.date, date), eq(prayerLogs.prayer, prayer))
      );
    } else {
      await db.insert(prayerLogs).values({ date, prayer, prayed: next === 'prayed', loggedAt: now });
    }

    // Sync qada counter
    const counter = await db.select().from(qadaCounters).where(eq(qadaCounters.prayer, prayer));
    const count = counter[0]?.count ?? 0;

    if (isNowNo && !wasNoPreviously) {
      // changing to missed: increment
      if (counter.length > 0) {
        await db.update(qadaCounters).set({ count: count + 1 }).where(eq(qadaCounters.prayer, prayer));
      } else {
        await db.insert(qadaCounters).values({ prayer, count: 1 });
      }
    } else if (!isNowNo && wasNoPreviously && count > 0) {
      // changing from missed to prayed: decrement
      await db.update(qadaCounters).set({ count: count - 1 }).where(eq(qadaCounters.prayer, prayer));
    }

    refresh();
  };

  const renderDay = ({ item }: { item: DayLog }) => {
    const now = new Date();
    const isToday = item.date === format(new Date(), 'yyyy-MM-dd');
    const dateLabel = isToday
      ? t('calendar.today')
      : new Date(item.date + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

    return (
      <View style={styles.dayCard}>
        <Text style={[styles.dayLabel, isToday && styles.dayLabelToday]}>{dateLabel}</Text>
        <View style={styles.prayerRow}>
          {PRAYER_NAMES.map((p) => {
            const isFuturePrayer = isPrayerInFuture(item.date, p, userCoordinates, now);
            const status = isFuturePrayer ? null : item.prayers[p];
            const cell = (
              <>
                <Text style={[styles.prayerName, isFuturePrayer && styles.prayerNameDisabled]}>
                  {t(`prayer.${p}`).slice(0, 3)}
                </Text>
                {isFuturePrayer ? <LockedDot /> : <StatusDot status={status} />}
              </>
            );

            if (!isToday) {
              return (
                <View key={p} style={[styles.prayerCell, styles.prayerCellDisabled]} pointerEvents="none">
                  {cell}
                </View>
              );
            }

            return (
              <TouchableOpacity
                key={p}
                style={styles.prayerCell}
                onPress={() => handleToggle(item.date, p, status)}
              >
                {cell}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.title}>{t('tracker.title')}</Text>

      <FlatList
        data={history}
        keyExtractor={(item) => item.date}
        renderItem={renderDay}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  backBtn: { padding: 16 },
  title: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary, paddingHorizontal: 20, marginBottom: 12 },
  list: { paddingHorizontal: 16, paddingBottom: 32 },

  dayCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    marginBottom: 10,
  },
  dayLabel: { fontSize: 13, color: Colors.textSecondary, marginBottom: 10 },
  dayLabelToday: { color: Colors.accent, fontWeight: '700' },

  prayerRow: { flexDirection: 'row', justifyContent: 'space-between' },
  prayerCell: { alignItems: 'center', gap: 6, flex: 1 },
  prayerCellDisabled: { opacity: 0.35 },
  prayerName: { fontSize: 11, color: Colors.textSecondary },
  prayerNameDisabled: { color: Colors.border },
});

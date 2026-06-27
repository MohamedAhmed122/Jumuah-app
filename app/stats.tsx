import { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { gte, and, eq } from 'drizzle-orm';
import { format, subDays, startOfMonth, getDaysInMonth, getDay } from 'date-fns';

import { Colors } from '@constants/Colors';
import { PRAYER_NAMES } from '@constants/prayerMethods';
import { db } from '@src/db';
import { prayerLogs } from '@src/db/schema';

const { width: W } = Dimensions.get('window');
const CELL = Math.floor((W - 48) / 7);

function heatColor(prayed: number): string {
  if (prayed === 5) return Colors.accent;
  if (prayed >= 3) return '#2AA870';
  if (prayed >= 1) return '#D97706';
  return Colors.error;
}

interface StatsData {
  monthlyPct: number;
  streak: number;
  heatmap: { day: number; prayed: number; isFuture: boolean }[];
  weekly: { label: string; prayed: number }[];
  firstWeekday: number;
}

async function computeStats(): Promise<StatsData> {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const since60 = format(subDays(today, 60), 'yyyy-MM-dd');
  const rows = await db.select().from(prayerLogs).where(gte(prayerLogs.date, since60));

  // Map: date -> {prayer -> prayed}
  const byDate: Record<string, Record<string, boolean>> = {};
  for (const r of rows) {
    if (!byDate[r.date]) byDate[r.date] = {};
    byDate[r.date][r.prayer] = r.prayed;
  }

  const countForDate = (d: string) =>
    PRAYER_NAMES.filter((p) => byDate[d]?.[p] === true).length;

  // Heatmap for current month
  const days = getDaysInMonth(monthStart);
  const firstWeekday = (getDay(monthStart) + 6) % 7;
  const heatmap = Array.from({ length: days }, (_, i) => {
    const d = i + 1;
    const dateStr = format(new Date(monthStart.getFullYear(), monthStart.getMonth(), d), 'yyyy-MM-dd');
    const isFuture = new Date(dateStr) > today;
    return { day: d, prayed: isFuture ? 0 : countForDate(dateStr), isFuture };
  });

  // Monthly %
  const pastDays = heatmap.filter((h) => !h.isFuture);
  const totalPossible = pastDays.length * 5;
  const totalPrayed = pastDays.reduce((s, h) => s + h.prayed, 0);
  const monthlyPct = totalPossible > 0 ? Math.round((totalPrayed / totalPossible) * 100) : 0;

  // Weekly (last 7 days)
  const weekly = Array.from({ length: 7 }, (_, i) => {
    const d = subDays(today, 6 - i);
    const ds = format(d, 'yyyy-MM-dd');
    return {
      label: d.toLocaleDateString(undefined, { weekday: 'narrow' }),
      prayed: countForDate(ds),
    };
  });

  // Streak: consecutive full days backwards from yesterday
  let streak = 0;
  for (let i = 1; i <= 60; i++) {
    const ds = format(subDays(today, i), 'yyyy-MM-dd');
    if (countForDate(ds) === 5) streak++;
    else break;
  }

  return { monthlyPct, streak, heatmap, weekly, firstWeekday };
}

export default function StatsScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [stats, setStats] = useState<StatsData | null>(null);

  const refresh = useCallback(async () => setStats(await computeStats()), []);
  useEffect(() => { refresh(); }, []);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.title}>{t('tracker.history')}</Text>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {stats && (
          <>
            {/* Top stats row */}
            <View style={styles.topRow}>
              {/* Progress ring (simplified: percentage circle) */}
              <View style={styles.ringCard}>
                <View style={styles.ring}>
                  <View style={[styles.ringFill, { opacity: stats.monthlyPct / 100 }]} />
                  <Text style={styles.ringPct}>{stats.monthlyPct}%</Text>
                </View>
                <Text style={styles.ringLabel}>{new Date().toLocaleDateString(undefined, { month: 'short' })}</Text>
              </View>

              {/* Streak */}
              <View style={styles.streakCard}>
                <Text style={styles.streakNum}>{stats.streak}</Text>
                <MaterialCommunityIcons name="fire" size={28} color={Colors.accent} />
                <Text style={styles.streakLabel}>{t('tracker.streak_label')}</Text>
              </View>
            </View>

            {/* Weekly bar chart */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>{t('tracker.last_7_days')}</Text>
              <View style={styles.barChart}>
                {stats.weekly.map((w, i) => {
                  const isToday = i === 6;
                  const pct = w.prayed / 5;
                  return (
                    <View key={i} style={styles.barCol}>
                      <View style={styles.barTrack}>
                        <View style={[
                          styles.barFill,
                          { height: `${Math.max(4, pct * 100)}%` },
                          isToday ? styles.barFillToday : {},
                        ]} />
                      </View>
                      <Text style={[styles.barLabel, isToday && styles.barLabelToday]}>{w.label}</Text>
                      <Text style={styles.barCount}>{w.prayed}</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Heatmap */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>
                {new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
              </Text>
              <View style={styles.heatmapGrid}>
                {/* Empty leading cells */}
                {Array.from({ length: stats.firstWeekday }).map((_, i) => (
                  <View key={`e${i}`} style={[styles.heatCell, { width: CELL, height: CELL }]} />
                ))}
                {stats.heatmap.map((h) => (
                  <View
                    key={h.day}
                    style={[
                      styles.heatCell,
                      { width: CELL, height: CELL, borderRadius: 6 },
                      h.isFuture
                        ? { backgroundColor: Colors.surface }
                        : { backgroundColor: h.prayed > 0 ? heatColor(h.prayed) : Colors.surfaceElevated },
                    ]}
                  >
                    <Text style={styles.heatDay}>{h.day}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  backBtn: { padding: 16 },
  title: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary, paddingHorizontal: 20, marginBottom: 16 },
  scroll: { paddingHorizontal: 16, paddingBottom: 40 },

  topRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },

  ringCard: {
    flex: 1, backgroundColor: Colors.surface, borderRadius: 16, borderWidth: 1,
    borderColor: Colors.border, alignItems: 'center', paddingVertical: 20, gap: 8,
  },
  ring: {
    width: 90, height: 90, borderRadius: 45,
    borderWidth: 8, borderColor: Colors.accent,
    alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  ringFill: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 45,
    backgroundColor: 'rgba(61,214,140,0.15)',
  },
  ringPct: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary },
  ringLabel: { fontSize: 12, color: Colors.textSecondary },

  streakCard: {
    flex: 1, backgroundColor: Colors.surface, borderRadius: 16, borderWidth: 1,
    borderColor: Colors.border, alignItems: 'center', justifyContent: 'center',
    paddingVertical: 20, gap: 4,
  },
  streakNum: { fontSize: 42, fontWeight: '700', color: Colors.textPrimary },
  streakLabel: { fontSize: 12, color: Colors.textSecondary },

  card: {
    backgroundColor: Colors.surface, borderRadius: 16, borderWidth: 1,
    borderColor: Colors.border, padding: 16, marginBottom: 14,
  },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary, marginBottom: 14 },

  barChart: { flexDirection: 'row', height: 100, alignItems: 'flex-end', gap: 6 },
  barCol: { flex: 1, alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: 4 },
  barTrack: {
    width: '80%', flex: 1, backgroundColor: Colors.surfaceElevated,
    borderRadius: 4, justifyContent: 'flex-end', overflow: 'hidden',
  },
  barFill: { width: '100%', backgroundColor: Colors.border, borderRadius: 4 },
  barFillToday: { backgroundColor: Colors.accent },
  barLabel: { fontSize: 11, color: Colors.textSecondary },
  barLabelToday: { color: Colors.accent, fontWeight: '700' },
  barCount: { fontSize: 10, color: Colors.textSecondary },

  heatmapGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 2 },
  heatCell: { alignItems: 'center', justifyContent: 'center' },
  heatDay: { fontSize: 9, color: 'rgba(240,255,244,0.5)' },
});

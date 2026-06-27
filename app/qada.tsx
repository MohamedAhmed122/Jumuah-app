import { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { eq } from 'drizzle-orm';

import { Colors } from '@constants/Colors';
import { PRAYER_NAMES } from '@constants/prayerMethods';
import type { PrayerName } from '@constants/prayerMethods';
import { db } from '@src/db';
import { qadaCounters } from '@src/db/schema';

type CountMap = Record<PrayerName, number>;

async function loadCounts(): Promise<CountMap> {
  const rows = await db.select().from(qadaCounters);
  const map = Object.fromEntries(PRAYER_NAMES.map((p) => [p, 0])) as CountMap;
  for (const r of rows) map[r.prayer as PrayerName] = r.count;
  return map;
}

async function adjust(prayer: PrayerName, delta: 1 | -1, current: number) {
  const next = Math.max(0, current + delta);
  const existing = await db.select().from(qadaCounters).where(eq(qadaCounters.prayer, prayer));
  if (existing.length > 0) {
    await db.update(qadaCounters).set({ count: next }).where(eq(qadaCounters.prayer, prayer));
  } else {
    await db.insert(qadaCounters).values({ prayer, count: next });
  }
}

export default function QadaScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [counts, setCounts] = useState<CountMap>(
    Object.fromEntries(PRAYER_NAMES.map((p) => [p, 0])) as CountMap
  );

  const refresh = useCallback(async () => setCounts(await loadCounts()), []);
  useEffect(() => { refresh(); }, []);

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  const handleAdjust = async (prayer: PrayerName, delta: 1 | -1) => {
    await adjust(prayer, delta, counts[prayer]);
    refresh();
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.textPrimary} />
      </TouchableOpacity>

      <Text style={styles.title}>{t('qada.title')}</Text>

      <View style={styles.totalCard}>
        <Text style={styles.totalNum}>{total}</Text>
        <Text style={styles.totalLabel}>{t('qada.total', { count: total })}</Text>
      </View>

      <View style={styles.list}>
        {PRAYER_NAMES.map((prayer) => (
          <View key={prayer} style={styles.row}>
            <Text style={styles.prayerName}>{t(`prayer.${prayer}`)}</Text>
            <View style={styles.controls}>
              <TouchableOpacity
                style={[styles.adjBtn, counts[prayer] === 0 && styles.adjBtnDisabled]}
                onPress={() => handleAdjust(prayer, -1)}
                disabled={counts[prayer] === 0}
              >
                <MaterialCommunityIcons name="minus" size={20} color={counts[prayer] === 0 ? Colors.border : Colors.error} />
              </TouchableOpacity>
              <Text style={styles.count}>{counts[prayer]}</Text>
              <TouchableOpacity style={styles.adjBtn} onPress={() => handleAdjust(prayer, 1)}>
                <MaterialCommunityIcons name="plus" size={20} color={Colors.accent} />
              </TouchableOpacity>
            </View>
            <Text style={styles.outstanding}>{t('qada.outstanding', { count: counts[prayer] })}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 20 },
  backBtn: { paddingVertical: 16 },
  title: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary, marginBottom: 20 },

  totalCard: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 24,
  },
  totalNum: { fontSize: 52, fontWeight: '200', color: Colors.accent },
  totalLabel: { fontSize: 14, color: Colors.textSecondary, marginTop: 4 },

  list: { gap: 10 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  prayerName: { flex: 1, fontSize: 16, fontWeight: '600', color: Colors.textPrimary },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  adjBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adjBtnDisabled: { opacity: 0.3 },
  count: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary, minWidth: 32, textAlign: 'center' },
  outstanding: { fontSize: 12, color: Colors.textSecondary, marginLeft: 16, minWidth: 80, textAlign: 'right' },
});

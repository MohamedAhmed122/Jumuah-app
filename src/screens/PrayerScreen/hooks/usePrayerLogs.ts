import { useCallback, useState } from 'react';
import { and, eq } from 'drizzle-orm';
import { useFocusEffect } from 'expo-router';
import type { PrayerName } from '@constants/prayerMethods';
import { db } from '@src/db';
import { prayerLogs, qadaCounters } from '@src/db/schema';
import type { PrayerLogMap } from '../PrayerScreen.types';

export function usePrayerLogs(today: string) {
  const [logs, setLogs] = useState<PrayerLogMap>({});
  const loadLogs = useCallback(async () => {
    const rows = await db.select().from(prayerLogs).where(eq(prayerLogs.date, today));
    const nextLogs: PrayerLogMap = {};
    for (const row of rows) nextLogs[row.prayer as PrayerName] = row.prayed ? 'prayed' : 'missed';
    setLogs(nextLogs);
  }, [today]);
  useFocusEffect(useCallback(() => { void loadLogs(); }, [loadLogs]));

  const logPrayer = async (prayer: PrayerName, prayed: boolean) => {
    const condition = and(eq(prayerLogs.date, today), eq(prayerLogs.prayer, prayer));
    const existing = await db.select().from(prayerLogs).where(condition);
    const values = { prayed, loggedAt: new Date().toISOString() };
    if (existing.length > 0) await db.update(prayerLogs).set(values).where(condition);
    else await db.insert(prayerLogs).values({ date: today, prayer, ...values });
    if (!prayed) await incrementQada(prayer);
    await loadLogs();
  };

  return { logs, loadLogs, logPrayer };
}

async function incrementQada(prayer: PrayerName) {
  const existing = await db.select().from(qadaCounters).where(eq(qadaCounters.prayer, prayer));
  if (existing.length > 0) {
    await db.update(qadaCounters).set({ count: existing[0].count + 1 }).where(eq(qadaCounters.prayer, prayer));
  } else {
    await db.insert(qadaCounters).values({ prayer, count: 1 });
  }
}

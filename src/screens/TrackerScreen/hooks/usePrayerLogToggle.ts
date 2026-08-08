import { useCallback } from 'react';
import { and, eq } from 'drizzle-orm';

import type { PrayerName } from '@constants/prayerMethods';
import { db } from '@src/db';
import { prayerLogs, qadaCounters } from '@src/db/schema';

import type { Coordinates, PrayerLogStatus } from '../TrackerScreen.types';
import { isPrayerInFuture } from '../TrackerScreen.utils';

async function syncQadaCounter(prayer: PrayerName, current: PrayerLogStatus, next: PrayerLogStatus) {
  const counters = await db.select().from(qadaCounters).where(eq(qadaCounters.prayer, prayer));
  const count = counters[0]?.count ?? 0;
  const becameMissed = next === 'missed' && current !== 'missed';
  const becamePrayed = next !== 'missed' && current === 'missed';

  if (becameMissed && counters.length > 0) {
    await db.update(qadaCounters).set({ count: count + 1 }).where(eq(qadaCounters.prayer, prayer));
  } else if (becameMissed) {
    await db.insert(qadaCounters).values({ prayer, count: 1 });
  } else if (becamePrayed && count > 0) {
    await db.update(qadaCounters).set({ count: count - 1 }).where(eq(qadaCounters.prayer, prayer));
  }
}

export function usePrayerLogToggle(coordinates: Coordinates, refresh: () => Promise<void>) {
  return useCallback(async (date: string, prayer: PrayerName, current: PrayerLogStatus) => {
    if (isPrayerInFuture(date, prayer, coordinates, new Date())) return;
    const next = current === 'prayed' ? 'missed' : 'prayed';
    const condition = and(eq(prayerLogs.date, date), eq(prayerLogs.prayer, prayer));
    const existing = await db.select().from(prayerLogs).where(condition);
    const values = { prayed: next === 'prayed', loggedAt: new Date().toISOString() };

    if (existing.length > 0) {
      await db.update(prayerLogs).set(values).where(condition);
    } else {
      await db.insert(prayerLogs).values({ date, prayer, ...values });
    }

    await syncQadaCounter(prayer, current, next);
    await refresh();
  }, [coordinates, refresh]);
}

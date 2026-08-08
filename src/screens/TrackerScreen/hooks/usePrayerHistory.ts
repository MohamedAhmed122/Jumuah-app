import { useCallback, useEffect, useState } from 'react';
import { format, subDays } from 'date-fns';
import { and, eq, gt, gte } from 'drizzle-orm';

import { PRAYER_NAMES } from '@constants/prayerMethods';
import { db } from '@src/db';
import { prayerLogs } from '@src/db/schema';

import { HISTORY_DAYS } from '../TrackerScreen.constants';
import type { Coordinates, DayLog, PrayerLogStatus } from '../TrackerScreen.types';
import { isPrayerInFuture } from '../TrackerScreen.utils';

async function loadPrayerHistory(coordinates: Coordinates): Promise<DayLog[]> {
  const today = new Date();
  const todayString = format(today, 'yyyy-MM-dd');
  const since = format(subDays(today, HISTORY_DAYS - 1), 'yyyy-MM-dd');

  await db.delete(prayerLogs).where(gt(prayerLogs.date, todayString));
  for (const prayer of PRAYER_NAMES) {
    if (isPrayerInFuture(todayString, prayer, coordinates, today)) {
      await db.delete(prayerLogs).where(
        and(eq(prayerLogs.date, todayString), eq(prayerLogs.prayer, prayer)),
      );
    }
  }

  const rows = await db.select().from(prayerLogs).where(gte(prayerLogs.date, since));
  const logs: Record<string, Record<string, Exclude<PrayerLogStatus, null>>> = {};
  rows.forEach((row) => {
    if (row.date > todayString) return;
    logs[row.date] ??= {};
    logs[row.date][row.prayer] = row.prayed ? 'prayed' : 'missed';
  });

  return Array.from({ length: HISTORY_DAYS }, (_, index) => {
    const date = format(subDays(today, index), 'yyyy-MM-dd');
    const prayers = {} as DayLog['prayers'];
    PRAYER_NAMES.forEach((prayer) => { prayers[prayer] = logs[date]?.[prayer] ?? null; });
    return { date, prayers };
  });
}

export function usePrayerHistory(coordinates: Coordinates) {
  const [history, setHistory] = useState<DayLog[]>([]);
  const refresh = useCallback(async () => {
    setHistory(await loadPrayerHistory(coordinates));
  }, [coordinates]);

  useEffect(() => { void refresh(); }, [refresh]);

  return { history, refresh };
}

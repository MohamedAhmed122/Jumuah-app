import { useCallback, useEffect, useState } from 'react';
import { eq } from 'drizzle-orm';

import type { PrayerName } from '@constants/prayerMethods';
import { db } from '@src/db';
import { qadaCounters } from '@src/db/schema';

import type { QadaAdjustment, QadaCountMap } from '../QadaScreen.types';
import { createEmptyQadaCounts, getAdjustedCount } from '../QadaScreen.utils';

async function loadQadaCounts(): Promise<QadaCountMap> {
  const rows = await db.select().from(qadaCounters);
  const counts = createEmptyQadaCounts();
  rows.forEach((row) => { counts[row.prayer as PrayerName] = row.count; });
  return counts;
}

async function persistCount(prayer: PrayerName, count: number) {
  const condition = eq(qadaCounters.prayer, prayer);
  const existing = await db.select().from(qadaCounters).where(condition);
  if (existing.length > 0) {
    await db.update(qadaCounters).set({ count }).where(condition);
  } else {
    await db.insert(qadaCounters).values({ prayer, count });
  }
}

export function useQadaCounters() {
  const [counts, setCounts] = useState<QadaCountMap>(createEmptyQadaCounts);
  const refresh = useCallback(async () => { setCounts(await loadQadaCounts()); }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  const adjust = useCallback(async (prayer: PrayerName, delta: QadaAdjustment) => {
    await persistCount(prayer, getAdjustedCount(counts[prayer], delta));
    await refresh();
  }, [counts, refresh]);

  return { adjust, counts };
}

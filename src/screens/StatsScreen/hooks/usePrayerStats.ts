import { useCallback, useEffect, useState } from 'react';
import { format, subDays } from 'date-fns';
import { gte } from 'drizzle-orm';
import { db } from '@src/db';
import { prayerLogs } from '@src/db/schema';
import type { StatsData } from '../StatsScreen.types';
import { calculateStats } from '../StatsScreen.utils';

export function usePrayerStats() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const refresh = useCallback(async () => {
    const since = format(subDays(new Date(), 60), 'yyyy-MM-dd');
    const rows = await db.select().from(prayerLogs).where(gte(prayerLogs.date, since));
    setStats(calculateStats(rows));
  }, []);
  useEffect(() => { void refresh(); }, [refresh]);
  return { stats, refresh };
}

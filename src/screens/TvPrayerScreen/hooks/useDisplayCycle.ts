import { useEffect, useRef, useState } from 'react';
import { advanceCycle, INITIAL_CYCLE } from '../TvPrayerScreen.cycle';
import type { TvCycleState } from '../TvPrayerScreen.types';

interface CycleOptions {
  now: Date;
  alertActive: boolean;
  menuOpen: boolean;
  enabled: boolean;
  count: number;
  slideSeconds: number;
}

export function useDisplayCycle(options: CycleOptions): TvCycleState {
  const { now, alertActive, menuOpen, enabled, count, slideSeconds } = options;
  const [cycle, setCycle] = useState<TvCycleState>(INITIAL_CYCLE);
  const lastTick = useRef(now.getTime());

  useEffect(() => {
    const deltaMs = now.getTime() - lastTick.current;
    lastTick.current = now.getTime();
    setCycle((current) => advanceCycle(current, { deltaMs, alertActive, menuOpen, enabled, count, slideSeconds }));
  }, [now, alertActive, menuOpen, enabled, count, slideSeconds]);

  return cycle;
}

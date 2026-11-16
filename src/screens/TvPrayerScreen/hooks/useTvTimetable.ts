import { useCallback, useState } from 'react';
import { fetchMosquePrayerTimes } from '@src/api/locations';
import type { TvTimetable } from '../TvPrayerScreen.days';
import { useRefreshLoop } from './useRefreshLoop';

interface TimetableState {
  mosqueId: string | null;
  entries: TvTimetable;
  online: boolean;
}

export function useTvTimetable(mosqueId: string | null, firstKey: string, lastKey: string) {
  const [state, setState] = useState<TimetableState>({ mosqueId: null, entries: {}, online: true });

  const load = useCallback(async (isActive: () => boolean) => {
    if (!mosqueId) return false;
    try {
      const items = await fetchMosquePrayerTimes(mosqueId, firstKey, lastKey);
      if (!isActive()) return true;
      const fetched = Object.fromEntries(items.map((item) => [item.date, item.times]));
      setState((current) => ({
        mosqueId,
        entries: current.mosqueId === mosqueId ? { ...current.entries, ...fetched } : fetched,
        online: true,
      }));
      return true;
    } catch {
      if (isActive()) setState((current) => ({ ...current, online: false }));
      return false;
    }
  }, [mosqueId, firstKey, lastKey]);

  useRefreshLoop(load, !!mosqueId);

  return {
    timetable: state.mosqueId === mosqueId ? state.entries : {},
    online: state.online,
  };
}

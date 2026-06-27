import { create } from 'zustand';
import type { PrayerName } from '@constants/prayerMethods';

export type PrayerStatus = 'prayed' | 'missed' | null;

interface DayLog {
  [prayer: string]: PrayerStatus;
}

interface TrackerState {
  todayLog: DayLog;
  setStatus: (prayer: PrayerName, status: PrayerStatus) => void;
  resetDay: () => void;
}

export const useTrackerStore = create<TrackerState>((set) => ({
  todayLog: {},
  setStatus: (prayer, status) =>
    set((s) => ({ todayLog: { ...s.todayLog, [prayer]: status } })),
  resetDay: () => set({ todayLog: {} }),
}));

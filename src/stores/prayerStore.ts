import { create } from 'zustand';
import type { PrayerName } from '@constants/prayerMethods';

interface PrayerTimes {
  fajr: Date;
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
}

interface NotificationToggles {
  fajr: { adhan: boolean; reminder: boolean };
  dhuhr: { adhan: boolean; reminder: boolean };
  asr: { adhan: boolean; reminder: boolean };
  maghrib: { adhan: boolean; reminder: boolean };
  isha: { adhan: boolean; reminder: boolean };
}

interface PrayerState {
  todayTimes: PrayerTimes | null;
  nextPrayer: PrayerName | null;
  activePrayer: PrayerName | null;
  notificationToggles: NotificationToggles;

  setTodayTimes: (times: PrayerTimes) => void;
  setNextPrayer: (prayer: PrayerName | null) => void;
  setActivePrayer: (prayer: PrayerName | null) => void;
  toggleAdhan: (prayer: PrayerName) => void;
  toggleReminder: (prayer: PrayerName) => void;
}

const defaultToggles: NotificationToggles = {
  fajr: { adhan: true, reminder: true },
  dhuhr: { adhan: true, reminder: true },
  asr: { adhan: true, reminder: true },
  maghrib: { adhan: true, reminder: true },
  isha: { adhan: true, reminder: true },
};

export const usePrayerStore = create<PrayerState>((set) => ({
  todayTimes: null,
  nextPrayer: null,
  activePrayer: null,
  notificationToggles: defaultToggles,

  setTodayTimes: (times) => set({ todayTimes: times }),
  setNextPrayer: (prayer) => set({ nextPrayer: prayer }),
  setActivePrayer: (prayer) => set({ activePrayer: prayer }),

  toggleAdhan: (prayer) =>
    set((s) => ({
      notificationToggles: {
        ...s.notificationToggles,
        [prayer]: {
          ...s.notificationToggles[prayer],
          adhan: !s.notificationToggles[prayer].adhan,
        },
      },
    })),

  toggleReminder: (prayer) =>
    set((s) => ({
      notificationToggles: {
        ...s.notificationToggles,
        [prayer]: {
          ...s.notificationToggles[prayer],
          reminder: !s.notificationToggles[prayer].reminder,
        },
      },
    })),
}));

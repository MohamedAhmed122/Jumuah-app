import type { StoreApi } from 'zustand';

import type { PrayerState, PrayerStoreActions } from './prayerStore.types';
import { togglePrayerNotification } from './prayerStore.utils';

type SetPrayerState = StoreApi<PrayerState>['setState'];

export function createPrayerStoreActions(set: SetPrayerState): PrayerStoreActions {
  return {
    setActivePrayer: (activePrayer) => set({ activePrayer }),
    setNextPrayer: (nextPrayer) => set({ nextPrayer }),
    setTodayTimes: (todayTimes) => set({ todayTimes }),
    toggleAdhan: (prayer) => set((state) => ({
      notificationToggles: togglePrayerNotification(
        state.notificationToggles,
        prayer,
        'adhan',
      ),
    })),
    toggleReminder: (prayer) => set((state) => ({
      notificationToggles: togglePrayerNotification(
        state.notificationToggles,
        prayer,
        'reminder',
      ),
    })),
  };
}

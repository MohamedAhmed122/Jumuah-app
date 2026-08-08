import { create } from 'zustand';

import { createPrayerStoreActions } from './prayerStore.actions';
import { DEFAULT_PRAYER_STATE } from './prayerStore.constants';
import type { PrayerState } from './prayerStore.types';

export const usePrayerStore = create<PrayerState>((set) => ({
  ...DEFAULT_PRAYER_STATE,
  ...createPrayerStoreActions(set),
}));

import { DEFAULT_NOTIFICATION_TOGGLES } from '../settingsStore/settingsStore.constants';

import type { PrayerStoreData } from './prayerStore.types';

export const DEFAULT_PRAYER_STATE: PrayerStoreData = {
  activePrayer: null,
  nextPrayer: null,
  notificationToggles: DEFAULT_NOTIFICATION_TOGGLES,
  todayTimes: null,
};

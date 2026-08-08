import type { PrayerName } from '@constants/prayerMethods';
import type { PrayerTimes } from '@src/prayer/calculator';
import type { NotificationToggles } from '@src/stores/settingsStore';

export type StoredPrayerTimes = Pick<PrayerTimes, PrayerName>;

export interface PrayerStoreData {
  activePrayer: PrayerName | null;
  nextPrayer: PrayerName | null;
  notificationToggles: NotificationToggles;
  todayTimes: StoredPrayerTimes | null;
}

export interface PrayerStoreActions {
  setActivePrayer: (prayer: PrayerName | null) => void;
  setNextPrayer: (prayer: PrayerName | null) => void;
  setTodayTimes: (times: StoredPrayerTimes) => void;
  toggleAdhan: (prayer: PrayerName) => void;
  toggleReminder: (prayer: PrayerName) => void;
}

export type PrayerState = PrayerStoreActions & PrayerStoreData;

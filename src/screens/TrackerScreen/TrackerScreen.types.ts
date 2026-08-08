import type { StyleProp, ViewStyle } from 'react-native';

import type { PrayerName } from '@constants/prayerMethods';

export type PrayerLogStatus = 'prayed' | 'missed' | null;

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface DayLog {
  date: string;
  prayers: Record<PrayerName, PrayerLogStatus>;
}

export interface PrayerCellViewModel {
  disabled: boolean;
  label: string;
  locked: boolean;
  prayer: PrayerName;
  status: PrayerLogStatus;
}

export interface PrayerDayViewModel {
  date: string;
  isToday: boolean;
  label: string;
  prayers: PrayerCellViewModel[];
}

export interface TrackerScreenViewModel {
  days: PrayerDayViewModel[];
  onBack: () => void;
  onToggle: (date: string, prayer: PrayerName, status: PrayerLogStatus) => void;
  rootStyle: StyleProp<ViewStyle>;
  title: string;
}

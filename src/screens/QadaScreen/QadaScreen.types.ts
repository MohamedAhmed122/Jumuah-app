import type { StyleProp, ViewStyle } from 'react-native';

import type { PrayerName } from '@constants/prayerMethods';

export type QadaCountMap = Record<PrayerName, number>;
export type QadaAdjustment = 1 | -1;

export interface QadaPrayerViewModel {
  count: number;
  decrementDisabled: boolean;
  label: string;
  onDecrement: () => void;
  onIncrement: () => void;
  outstandingLabel: string;
  prayer: PrayerName;
}

export interface QadaScreenViewModel {
  onBack: () => void;
  prayers: QadaPrayerViewModel[];
  rootStyle: StyleProp<ViewStyle>;
  title: string;
  total: number;
  totalLabel: string;
}

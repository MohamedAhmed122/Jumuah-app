import type { StyleProp, ViewStyle } from 'react-native';

export type CalendarEvent =
  | 'ramadan'
  | 'eid_fitr'
  | 'eid_adha'
  | 'arafah'
  | 'ashura'
  | 'dhul_hijjah';

export interface CalendarDayViewModel {
  day: number;
  event: CalendarEvent | null;
  hijriDay: number;
  isRamadan: boolean;
  isToday: boolean;
  key: string;
}

export type CalendarCellViewModel = CalendarDayViewModel | null;

export interface LegendItemViewModel {
  event: CalendarEvent;
  label: string;
}

export interface CalendarScreenViewModel {
  cells: CalendarCellViewModel[];
  gregorianMonth: string;
  hijriMonth: string;
  legend: LegendItemViewModel[];
  onBack: () => void;
  onNextMonth: () => void;
  onPreviousMonth: () => void;
  rootStyle: StyleProp<ViewStyle>;
  title: string;
}

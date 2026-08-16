import { Colors } from '@constants/Colors';

export const AGENDA_COLORS = {
  announcement: '#A78BFA',
  event: '#2DD4BF',
} as const;

export const AGENDA_THEME = {
  backgroundColor: Colors.background,
  calendarBackground: Colors.surface,
  reservationsBackgroundColor: Colors.background,
  agendaKnobColor: Colors.accent,
  agendaDayTextColor: Colors.textSecondary,
  agendaDayNumColor: Colors.textPrimary,
  agendaTodayColor: Colors.accent,
  dayTextColor: Colors.textPrimary,
  monthTextColor: Colors.textPrimary,
  textDisabledColor: Colors.border,
  selectedDayBackgroundColor: Colors.accent,
  selectedDayTextColor: Colors.background,
  todayTextColor: Colors.accent,
  dotColor: Colors.accent,
  arrowColor: Colors.accent,
  textSectionTitleColor: Colors.textSecondary,
  todayButtonTextColor: Colors.background,
  todayButtonPosition: 'right',
};

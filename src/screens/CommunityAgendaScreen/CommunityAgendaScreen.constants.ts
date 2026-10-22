import type { ThemeColors } from '@constants/Colors';

export const AGENDA_COLORS = {
  announcement: '#A78BFA',
  event: '#2DD4BF',
} as const;

export function createAgendaTheme(colors: ThemeColors) {
  return {
    backgroundColor: colors.background,
    calendarBackground: colors.surface,
    reservationsBackgroundColor: colors.background,
    agendaKnobColor: colors.accent,
    agendaDayTextColor: colors.textSecondary,
    agendaDayNumColor: colors.textPrimary,
    agendaTodayColor: colors.accent,
    dayTextColor: colors.textPrimary,
    monthTextColor: colors.textPrimary,
    textDisabledColor: colors.border,
    selectedDayBackgroundColor: colors.accent,
    selectedDayTextColor: colors.onAccent,
    todayTextColor: colors.accent,
    dotColor: colors.accent,
    arrowColor: colors.accent,
    textSectionTitleColor: colors.textSecondary,
    todayButtonTextColor: colors.onAccent,
    todayButtonPosition: 'right',
  };
}

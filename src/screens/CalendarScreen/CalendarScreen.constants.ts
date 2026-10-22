import type { ThemeColors } from '@constants/Colors';

import type { CalendarEvent } from './CalendarScreen.types';

export const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export const LEGEND_EVENTS: CalendarEvent[] = ['ramadan', 'eid_fitr', 'arafah', 'ashura'];

export function getEventColors(colors: ThemeColors): Record<CalendarEvent, string> {
  return {
    arafah: colors.accentSoft,
    ashura: colors.accentSoft,
    dhul_hijjah: colors.textSecondary,
    eid_adha: colors.accentSoft,
    eid_fitr: colors.accentSoft,
    ramadan: colors.accent,
  };
}

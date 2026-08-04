import { Colors } from '@constants/Colors';

import type { CalendarEvent } from './CalendarScreen.types';

export const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export const LEGEND_EVENTS: CalendarEvent[] = ['ramadan', 'eid_fitr', 'arafah', 'ashura'];

export const EVENT_COLORS: Record<CalendarEvent, string> = {
  arafah: Colors.accentSoft,
  ashura: Colors.accentSoft,
  dhul_hijjah: Colors.textSecondary,
  eid_adha: Colors.accentSoft,
  eid_fitr: Colors.accentSoft,
  ramadan: Colors.accent,
};

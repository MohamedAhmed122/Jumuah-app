import { getDay, getDaysInMonth, startOfMonth } from 'date-fns';

import type { AppLanguage } from '@src/i18n/languages';
import {
  isAshura,
  isDayOfArafah,
  isEidAlAdha,
  isEidAlFitr,
  isFirstTenDhulHijjah,
  isRamadan,
  toHijri,
} from '@src/prayer/hijri';

import type { CalendarCellViewModel, CalendarEvent } from './CalendarScreen.types';

function getEvents(hijri: ReturnType<typeof toHijri>): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  if (isRamadan(hijri)) events.push('ramadan');
  if (isEidAlFitr(hijri)) events.push('eid_fitr');
  if (isEidAlAdha(hijri)) events.push('eid_adha');
  if (isDayOfArafah(hijri)) events.push('arafah');
  if (isAshura(hijri)) events.push('ashura');
  if (isFirstTenDhulHijjah(hijri) && !isEidAlAdha(hijri)) events.push('dhul_hijjah');
  return events;
}

export function buildCalendarCells(
  monthStart: Date,
  language: AppLanguage,
  today: Date,
): CalendarCellViewModel[] {
  const leadingCells = (getDay(startOfMonth(monthStart)) + 6) % 7;
  const cells: CalendarCellViewModel[] = Array(leadingCells).fill(null);

  for (let day = 1; day <= getDaysInMonth(monthStart); day += 1) {
    const date = new Date(monthStart.getFullYear(), monthStart.getMonth(), day);
    const hijri = toHijri(date, language);
    const events = getEvents(hijri);
    cells.push({
      day,
      event: events[0] ?? null,
      hijriDay: hijri.day,
      isRamadan: events.includes('ramadan'),
      isToday: date.toDateString() === today.toDateString(),
      key: date.toISOString(),
    });
  }

  return cells;
}

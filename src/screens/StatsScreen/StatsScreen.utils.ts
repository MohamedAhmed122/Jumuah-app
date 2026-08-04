import { format, getDay, getDaysInMonth, startOfMonth, subDays } from 'date-fns';
import { PRAYER_NAMES } from '@constants/prayerMethods';
import type { PrayerLogRow, StatsData } from './StatsScreen.types';

export function calculateStats(rows: PrayerLogRow[], today = new Date()): StatsData {
  const byDate = groupLogsByDate(rows);
  const countForDate = (date: string) => PRAYER_NAMES
    .filter((prayer) => byDate[date]?.[prayer] === true).length;
  const monthStart = startOfMonth(today);
  const heatmap = Array.from({ length: getDaysInMonth(monthStart) }, (_, index) => {
    const day = index + 1;
    const date = format(new Date(monthStart.getFullYear(), monthStart.getMonth(), day), 'yyyy-MM-dd');
    const isFuture = new Date(date) > today;
    return { day, prayed: isFuture ? 0 : countForDate(date), isFuture };
  });
  const pastDays = heatmap.filter((day) => !day.isFuture);
  const possible = pastDays.length * 5;
  const prayed = pastDays.reduce((sum, day) => sum + day.prayed, 0);
  return {
    monthlyPct: possible > 0 ? Math.round((prayed / possible) * 100) : 0,
    streak: calculateStreak(today, countForDate),
    heatmap,
    weekly: calculateWeek(today, countForDate),
    firstWeekday: (getDay(monthStart) + 6) % 7,
  };
}

function groupLogsByDate(rows: PrayerLogRow[]) {
  const byDate: Record<string, Record<string, boolean>> = {};
  for (const row of rows) {
    if (!byDate[row.date]) byDate[row.date] = {};
    byDate[row.date][row.prayer] = row.prayed;
  }
  return byDate;
}

function calculateWeek(today: Date, count: (date: string) => number) {
  return Array.from({ length: 7 }, (_, index) => {
    const day = subDays(today, 6 - index);
    return {
      label: day.toLocaleDateString(undefined, { weekday: 'narrow' }),
      prayed: count(format(day, 'yyyy-MM-dd')),
    };
  });
}

function calculateStreak(today: Date, count: (date: string) => number) {
  let streak = 0;
  for (let offset = 1; offset <= 60; offset++) {
    if (count(format(subDays(today, offset), 'yyyy-MM-dd')) === 5) streak++;
    else break;
  }
  return streak;
}

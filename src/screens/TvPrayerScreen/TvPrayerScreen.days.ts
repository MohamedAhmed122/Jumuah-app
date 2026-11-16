import { format } from 'date-fns';
import type { Mosque, MosquePrayerTime } from '@src/api/locations';
import { calculatePrayerTimes } from '@src/prayer/calculator';
import { applyMosquePrayerTimes, calculateIqamaTimes, getActiveJummahTimes } from '@src/prayer/mosqueTimes';
import type { Coordinates } from '@src/stores/settingsStore';
import { SCHEDULE_ANCHOR_HOUR } from './TvPrayerScreen.constants';
import type { TvDay } from './TvPrayerScreen.types';

export type TvTimetable = Record<string, MosquePrayerTime['times']>;

export function toDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function getDisplayDates(now: Date): Date[] {
  return [-1, 0, 1].map((offset) => new Date(
    now.getFullYear(), now.getMonth(), now.getDate() + offset, SCHEDULE_ANCHOR_HOUR,
  ));
}

export function buildTvDays(
  dates: Date[],
  coordinates: Coordinates,
  mosque: Mosque | null,
  timetable: TvTimetable,
): TvDay[] {
  const origin = mosque ? { lat: mosque.lat, lng: mosque.lng } : coordinates;
  return dates.map((date) => {
    const base = calculatePrayerTimes(date, origin);
    const override = timetable[toDateKey(date)];
    const times = override ? applyMosquePrayerTimes(base, date, override) : base;
    return {
      date,
      times,
      iqamaTimes: calculateIqamaTimes(times, mosque),
      jummahTimes: getActiveJummahTimes(mosque, date),
    };
  });
}

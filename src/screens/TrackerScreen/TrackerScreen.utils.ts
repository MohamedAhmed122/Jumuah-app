import { format } from 'date-fns';

import type { PrayerName } from '@constants/prayerMethods';
import { PRAYER_NAMES } from '@constants/prayerMethods';
import { calculatePrayerTimes } from '@src/prayer/calculator';

import type { Coordinates, DayLog, PrayerDayViewModel, PrayerLogStatus } from './TrackerScreen.types';

export function isPrayerInFuture(
  date: string,
  prayer: PrayerName,
  coordinates: Coordinates,
  now: Date,
) {
  const dayStart = new Date(`${date}T00:00:00`);
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  if (dayStart.getTime() > todayStart.getTime()) return true;
  const prayerTime = calculatePrayerTimes(new Date(`${date}T12:00:00`), coordinates)[prayer];
  return prayerTime.getTime() > now.getTime();
}

export function createDayViewModel(
  day: DayLog,
  coordinates: Coordinates,
  now: Date,
  translate: (key: string) => string,
): PrayerDayViewModel {
  const isToday = day.date === format(now, 'yyyy-MM-dd');
  const label = isToday
    ? translate('calendar.today')
    : new Date(`${day.date}T12:00:00`).toLocaleDateString(undefined, {
        day: 'numeric', month: 'short', weekday: 'short',
      });

  return {
    date: day.date,
    isToday,
    label,
    prayers: PRAYER_NAMES.map((prayer) => {
      const locked = isPrayerInFuture(day.date, prayer, coordinates, now);
      const status: PrayerLogStatus = locked ? null : day.prayers[prayer];
      return {
        disabled: !isToday,
        label: translate(`prayer.${prayer}`).slice(0, 3),
        locked,
        prayer,
        status,
      };
    }),
  };
}

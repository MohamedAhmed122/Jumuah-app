import { fetchLocationBundle, fetchMosquePrayerTimes } from '@src/api/locations';
import type { Mosque, MosquePrayerTime } from '@src/api/locations';
import { calculatePrayerTimes } from '@src/prayer/calculator';
import { applyMosquePrayerTimes } from '@src/prayer/mosqueTimes';
import { toDateKey } from './scheduler.utils';
import type { NotificationScheduleSettings, ScheduledPrayerDay } from './scheduler.types';

async function loadPreferredMosque(mosqueId: string): Promise<Mosque | null> {
  try {
    const bundle = await fetchLocationBundle();
    return bundle.mosques.find((item) => item.id === mosqueId) ?? null;
  } catch {
    return null;
  }
}

async function loadMosqueTimetable(mosqueId: string, dates: Date[]): Promise<MosquePrayerTime[]> {
  try {
    const items = await fetchMosquePrayerTimes(mosqueId, toDateKey(dates[0]), toDateKey(dates[dates.length - 1]));
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

export async function resolveScheduleDays(
  settings: NotificationScheduleSettings,
  dates: Date[],
): Promise<ScheduledPrayerDay[]> {
  const mosqueId = settings.preferredMosqueId;
  const [mosque, timetable] = mosqueId
    ? await Promise.all([loadPreferredMosque(mosqueId), loadMosqueTimetable(mosqueId, dates)])
    : [null, []];
  const coordinates = mosque ? { lat: mosque.lat, lng: mosque.lng } : settings.coordinates;

  return dates.map((date) => {
    const baseTimes = calculatePrayerTimes(date, coordinates);
    const override = timetable.find((item) => item.date === toDateKey(date));
    return { date, times: override ? applyMosquePrayerTimes(baseTimes, date, override.times) : baseTimes };
  });
}

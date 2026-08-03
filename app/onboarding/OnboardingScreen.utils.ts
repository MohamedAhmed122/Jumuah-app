import { PRAYER_NAMES, type PrayerName } from '@constants/prayerMethods';
import { calculatePrayerTimes } from '@src/prayer/calculator';

interface PrayerTeaser {
  prayer: PrayerName | null;
  time: string;
}

export function getNextPrayerTeaser(
  coordinates: { lat: number; lng: number },
  now = new Date(),
): PrayerTeaser {
  const times = calculatePrayerTimes(now, coordinates);
  const prayer = PRAYER_NAMES.find((name) => times[name] > now) ?? null;
  if (!prayer) return { prayer: null, time: '' };
  return {
    prayer,
    time: times[prayer].toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}

export function splitLanguageLabel(value: string): { flag: string; label: string } {
  const [flag, ...parts] = value.split(' ');
  return { flag, label: parts.join(' ') };
}

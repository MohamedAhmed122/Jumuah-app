import { PRAYER_NAMES, type PrayerName } from '@constants/prayerMethods';
import type { PrayerTimes } from '@src/prayer/calculator';
import type { ScheduledPrayer } from './PrayerScreen.types';

export function getPrayerSchedule(times: PrayerTimes, jummahTimes: Date[]): ScheduledPrayer[] {
  const prayers: ScheduledPrayer[] = PRAYER_NAMES
    .filter((prayer) => prayer !== 'dhuhr' || jummahTimes.length === 0)
    .map((name) => ({ name, time: times[name] }));
  prayers.push(...jummahTimes.map((time) => ({ name: 'jummah' as const, time })));
  return prayers.sort((a, b) => a.time.getTime() - b.time.getTime());
}

export function getActivePrayer(times: PrayerTimes, now = new Date()): PrayerName | null {
  let active: PrayerName | null = null;
  for (const prayer of PRAYER_NAMES) {
    if (times[prayer] <= now) active = prayer;
    else break;
  }
  return active;
}

export function getNextPrayer(times: PrayerTimes, jummahTimes: Date[]): ScheduledPrayer | null {
  const now = new Date();
  return getPrayerSchedule(times, jummahTimes).find((prayer) => prayer.time > now) ?? null;
}

export function getPreviousPrayer(times: PrayerTimes, jummahTimes: Date[]): ScheduledPrayer | null {
  const now = new Date();
  const passed = getPrayerSchedule(times, jummahTimes).filter((prayer) => prayer.time <= now);
  return passed[passed.length - 1] ?? null;
}

export function getPrayerProgress(
  previous: ScheduledPrayer | null,
  next: ScheduledPrayer | null,
  now = Date.now(),
): number {
  if (!previous || !next) return 0;
  const total = next.time.getTime() - previous.time.getTime();
  return total <= 0 ? 0 : (now - previous.time.getTime()) / total;
}

export function formatCountdown(target: Date, now = Date.now()): string | null {
  const difference = target.getTime() - now;
  if (difference <= 0) return null;
  const hours = String(Math.floor(difference / 3600000)).padStart(2, '0');
  const minutes = String(Math.floor((difference % 3600000) / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((difference % 60000) / 1000)).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

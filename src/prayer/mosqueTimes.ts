import type { PrayerName } from '@constants/prayerMethods';
import { PRAYER_NAMES } from '@constants/prayerMethods';
import type { Mosque, MosquePrayerTime } from '@src/api/locations';
import type { PrayerTimes } from './calculator';

export type IqamaTimes = Partial<Record<PrayerName, Date>>;

export function timeStringToDate(date: Date, time: string): Date | null {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) return null;
  const [hours, minutes] = time.split(':').map(Number);
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return Number.isNaN(result.getTime()) ? null : result;
}

export function applyMosquePrayerTimes(
  base: PrayerTimes,
  date: Date,
  times: MosquePrayerTime['times'],
): PrayerTimes {
  const resolved = { ...base };
  let appliedCount = 0;

  for (const prayer of PRAYER_NAMES) {
    const override = timeStringToDate(date, times[prayer]);
    if (!override) continue;
    resolved[prayer] = override;
    appliedCount += 1;
  }

  if (appliedCount > 0) {
    const asrWindowMinutes = Math.max(0, Math.round((resolved.maghrib.getTime() - resolved.asr.getTime()) / 60000));
    resolved.meta = {
      ...base.meta,
      highLatitudeFallback: base.meta.highLatitudeFallback && appliedCount < PRAYER_NAMES.length,
      asrWindowMinutes,
      isAsrWindowShort: asrWindowMinutes > 0 && asrWindowMinutes < 45,
    };
  }
  return resolved;
}

export function calculateIqamaTimes(
  prayerTimes: PrayerTimes,
  offsets?: Mosque['iqamaOffsets'],
): IqamaTimes {
  if (!offsets) return {};
  return Object.fromEntries(PRAYER_NAMES.map((prayer) => [
    prayer,
    new Date(prayerTimes[prayer].getTime() + offsets[prayer] * 60 * 1000),
  ])) as IqamaTimes;
}

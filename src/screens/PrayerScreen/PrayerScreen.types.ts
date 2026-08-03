import type { PrayerName } from '@constants/prayerMethods';
import type { PrayerTimes } from '@src/prayer/calculator';

export type PrayerLogMap = Partial<Record<PrayerName, 'prayed' | 'missed'>>;
export type PrayerSource = 'mosque' | 'calculated';

export interface ScheduledPrayer {
  name: PrayerName | 'jummah';
  time: Date;
}

export interface PrayerScheduleState {
  times: PrayerTimes;
  jummahTimes: Date[];
  activePrayer: PrayerName | null;
  nextPrayer: ScheduledPrayer | null;
  previousPrayer: ScheduledPrayer | null;
  progress: number;
}

import type { PrayerName } from '@constants/prayerMethods';

export type PrayerStatus = 'prayed' | 'missed' | null;

export interface PrayerCardProps {
  adhanEnabled: boolean;
  hasPassed: boolean;
  iqamaTime?: Date;
  isActive: boolean;
  isNext: boolean;
  onAdhanToggle: () => void;
  onLog: (prayed: boolean) => void;
  onReminderToggle: () => void;
  prayer: PrayerName;
  reminderEnabled: boolean;
  showLogControls: boolean;
  status: PrayerStatus;
  time: Date;
}

export interface PrayerCardViewModel extends Omit<PrayerCardProps, 'iqamaTime' | 'onLog' | 'time'> {
  adhanLabel: string;
  iqamaLabel: string;
  iqamaTime: string | undefined;
  missedLabel: string;
  onMissed: () => void;
  onPrayed: () => void;
  prayerLabel: string;
  prayedLabel: string;
  showLogActions: boolean;
  time: string;
}

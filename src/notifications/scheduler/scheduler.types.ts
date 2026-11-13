import type { PrayerName } from '@constants/prayerMethods';
import type { PrayerTimes } from '@src/prayer/calculator';
import type { Coordinates, NotificationToggles, NotificationType } from '@src/stores/settingsStore';

export interface NotificationScheduleSettings {
  coordinates: Coordinates;
  kahfReminderEnabled: boolean;
  notificationToggles: NotificationToggles;
  preferredMosqueId: string | null;
}

export interface ScheduledPrayerDay {
  date: Date;
  times: PrayerTimes;
}

export interface PrayerNotificationPlanItem {
  identifier: string;
  prayer: PrayerName;
  prayerTime: Date;
  triggerAt: Date;
  type: NotificationType;
}

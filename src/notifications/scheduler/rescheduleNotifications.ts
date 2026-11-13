import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import i18n from '@src/i18n';
import type { AppLanguage } from '@src/i18n/languages';
import { toKahfReminderRequest, toPrayerNotificationRequest } from './notificationContent';
import { resolveScheduleDays } from './resolveScheduleDays';
import { IOS_PENDING_NOTIFICATION_LIMIT, SCHEDULE_DAY_COUNT } from './scheduler.constants';
import type { NotificationScheduleSettings } from './scheduler.types';
import { buildPrayerNotificationPlan, getScheduleDates } from './scheduler.utils';

let scheduleQueue: Promise<void> = Promise.resolve();

function getPrayerNotificationLimit(kahfReminderEnabled: boolean): number | null {
  if (Platform.OS !== 'ios') return null;
  return IOS_PENDING_NOTIFICATION_LIMIT - (kahfReminderEnabled ? 1 : 0);
}

async function applySchedule(settings: NotificationScheduleSettings, language: AppLanguage): Promise<void> {
  if (i18n.language !== language) await i18n.changeLanguage(language);
  const now = new Date();
  const days = await resolveScheduleDays(settings, getScheduleDates(now, SCHEDULE_DAY_COUNT));
  const plan = buildPrayerNotificationPlan(
    days,
    settings.notificationToggles,
    now,
    getPrayerNotificationLimit(settings.kahfReminderEnabled),
  );

  await Notifications.cancelAllScheduledNotificationsAsync();
  for (const item of plan) {
    await Notifications.scheduleNotificationAsync(toPrayerNotificationRequest(item));
  }
  if (settings.kahfReminderEnabled) {
    await Notifications.scheduleNotificationAsync(toKahfReminderRequest());
  }
}

export function rescheduleNotifications(
  settings: NotificationScheduleSettings,
  language: AppLanguage,
): Promise<void> {
  const run = scheduleQueue.then(() => applySchedule(settings, language));
  scheduleQueue = run.catch(() => undefined);
  return run;
}

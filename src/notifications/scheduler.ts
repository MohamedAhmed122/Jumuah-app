import * as Notifications from 'expo-notifications';
import i18n from '@src/i18n';
import { calculatePrayerTimes } from '@src/prayer/calculator';
import type { PrayerTimes } from '@src/prayer/calculator';
import { PRAYER_NAMES } from '@constants/prayerMethods';
import { format } from 'date-fns';

interface Coords { lat: number; lng: number }

interface NotificationToggles {
  [prayer: string]: { adhan: boolean; reminder: boolean };
}

export async function scheduleDailyNotifications(
  date: Date,
  coords: Coords,
  toggles: NotificationToggles,
  prayerTimesOverride?: PrayerTimes
) {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const times = prayerTimesOverride ?? calculatePrayerTimes(date, coords);

  for (const prayer of PRAYER_NAMES) {
    const time = times[prayer as keyof typeof times] as Date;
    const toggle = toggles[prayer];
    if (!toggle) continue;

    const prayerLabel = i18n.t(`prayer.${prayer}`);
    const timeStr = format(time, 'HH:mm');

    if (toggle.adhan && time > new Date()) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: i18n.t('notifications.adhan_title', { name: prayerLabel }),
          body: i18n.t('notifications.adhan_body', { name: prayerLabel, time: timeStr }),
          sound: 'adhan.mp3',
        },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: time },
      });
    }

    if (toggle.reminder) {
      const reminderTime = new Date(time.getTime() - 10 * 60 * 1000);
      if (reminderTime > new Date()) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: i18n.t('notifications.reminder_title', { name: prayerLabel }),
            body: i18n.t('notifications.reminder_body'),
          },
          trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: reminderTime },
        });
      }
    }
  }
}

export async function scheduleAlKahfReminder(enabled: boolean) {
  if (!enabled) return;
  await Notifications.scheduleNotificationAsync({
    content: {
      title: i18n.t('notifications.kahf_title'),
      body: i18n.t('notifications.kahf_body'),
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
      weekday: 6,
      hour: 8,
      minute: 0,
      repeats: true,
    },
  });
}

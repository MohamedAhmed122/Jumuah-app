import { format } from 'date-fns';
import * as Notifications from 'expo-notifications';
import i18n from '@src/i18n';
import { ADHAN_SOUND, KAHF_REMINDER_TRIGGER } from './scheduler.constants';
import type { PrayerNotificationPlanItem } from './scheduler.types';

export function toPrayerNotificationRequest(
  item: PrayerNotificationPlanItem,
): Notifications.NotificationRequestInput {
  const prayerLabel = i18n.t(`prayer.${item.prayer}`);
  const trigger: Notifications.DateTriggerInput = {
    type: Notifications.SchedulableTriggerInputTypes.DATE,
    date: item.triggerAt,
  };

  if (item.type === 'adhan') {
    return {
      identifier: item.identifier,
      content: {
        title: i18n.t('notifications.adhan_title', { name: prayerLabel }),
        body: i18n.t('notifications.adhan_body', { name: prayerLabel, time: format(item.prayerTime, 'HH:mm') }),
        sound: ADHAN_SOUND,
      },
      trigger,
    };
  }

  return {
    identifier: item.identifier,
    content: {
      title: i18n.t('notifications.reminder_title', { name: prayerLabel }),
      body: i18n.t('notifications.reminder_body'),
    },
    trigger,
  };
}

export function toKahfReminderRequest(): Notifications.NotificationRequestInput {
  return {
    identifier: 'kahf:weekly',
    content: {
      title: i18n.t('notifications.kahf_title'),
      body: i18n.t('notifications.kahf_body'),
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
      ...KAHF_REMINDER_TRIGGER,
    },
  };
}

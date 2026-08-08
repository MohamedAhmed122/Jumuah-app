import type { PrayerName } from '@constants/prayerMethods';
import { DEFAULT_COORDS } from '@constants/prayerMethods';
import { isAppLanguage } from '@src/i18n/languages';

import { DEFAULT_NOTIFICATION_TOGGLES } from './settingsStore.constants';
import type {
  NotificationToggles,
  NotificationType,
  SettingsData,
  StoredSettings,
} from './settingsStore.types';

export function toggleNotification(
  toggles: NotificationToggles,
  prayer: PrayerName,
  type: NotificationType,
): NotificationToggles {
  return {
    ...toggles,
    [prayer]: { ...toggles[prayer], [type]: !toggles[prayer][type] },
  };
}

export function parseStoredSettings(stored: StoredSettings): SettingsData {
  return {
    appLanguage: isAppLanguage(stored.appLanguage) ? stored.appLanguage : 'en',
    hydrated: true,
    kahfReminderEnabled: stored.kahfReminderEnabled !== 'false',
    notificationToggles: stored.notificationToggles
      ? JSON.parse(stored.notificationToggles)
      : DEFAULT_NOTIFICATION_TOGGLES,
    onboardingComplete: stored.onboardingComplete === 'true',
    preferredHalalCity: stored.preferredHalalCity,
    preferredMosqueId: stored.preferredMosqueId,
    userCoordinates: stored.userCoordinates ? JSON.parse(stored.userCoordinates) : DEFAULT_COORDS,
  };
}

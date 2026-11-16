import type { PrayerName } from '@constants/prayerMethods';
import { DEFAULT_COORDS } from '@constants/prayerMethods';
import { isAppLanguage } from '@src/i18n/languages';
import { isThemePreference } from '@src/theme';

import {
  DEFAULT_APP_VISIBILITY,
  DEFAULT_NOTIFICATION_TOGGLES,
  TV_ANNOUNCEMENT_SECONDS,
} from './settingsStore.constants';
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

export function clampAnnouncementSeconds(seconds: number): number {
  if (!Number.isFinite(seconds)) return TV_ANNOUNCEMENT_SECONDS.default;
  const stepped = Math.round(seconds / TV_ANNOUNCEMENT_SECONDS.step) * TV_ANNOUNCEMENT_SECONDS.step;
  return Math.min(TV_ANNOUNCEMENT_SECONDS.max, Math.max(TV_ANNOUNCEMENT_SECONDS.min, stepped));
}

export function parseStoredSettings(stored: StoredSettings): SettingsData {
  return {
    appLanguage: isAppLanguage(stored.appLanguage) ? stored.appLanguage : 'en',
    appVisibility: stored.appVisibility
      ? { ...DEFAULT_APP_VISIBILITY, ...JSON.parse(stored.appVisibility) }
      : DEFAULT_APP_VISIBILITY,
    hydrated: true,
    kahfReminderEnabled: stored.kahfReminderEnabled !== 'false',
    notificationToggles: stored.notificationToggles
      ? JSON.parse(stored.notificationToggles)
      : DEFAULT_NOTIFICATION_TOGGLES,
    onboardingComplete: stored.onboardingComplete === 'true',
    preferredHalalCity: stored.preferredHalalCity,
    preferredMosqueId: stored.preferredMosqueId,
    themePreference: isThemePreference(stored.themePreference) ? stored.themePreference : 'dark',
    tvAnnouncementSeconds: stored.tvAnnouncementSeconds
      ? clampAnnouncementSeconds(Number(stored.tvAnnouncementSeconds))
      : TV_ANNOUNCEMENT_SECONDS.default,
    tvAnnouncementsEnabled: stored.tvAnnouncementsEnabled !== 'false',
    userCoordinates: stored.userCoordinates ? JSON.parse(stored.userCoordinates) : DEFAULT_COORDS,
  };
}

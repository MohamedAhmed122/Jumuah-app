import { DEFAULT_COORDS, PRAYER_NAMES } from '@constants/prayerMethods';

import type { AppVisibility, NotificationToggles, SettingsData } from './settingsStore.types';

export const SETTINGS_STORAGE_KEYS = {
  appLanguage: 'appLanguage',
  appVisibility: 'appVisibility',
  kahfReminderEnabled: 'kahfReminderEnabled',
  notificationToggles: 'notificationToggles',
  onboardingComplete: 'onboardingComplete',
  preferredHalalCity: 'preferredHalalCity',
  preferredMosqueId: 'preferredMosqueId',
  themePreference: 'themePreference',
  tvAnnouncementSeconds: 'tvAnnouncementSeconds',
  tvAnnouncementsEnabled: 'tvAnnouncementsEnabled',
  userCoordinates: 'userCoordinates',
} as const;

export type SettingsStorageKey = typeof SETTINGS_STORAGE_KEYS[keyof typeof SETTINGS_STORAGE_KEYS];

export const SETTINGS_STORAGE_KEY_LIST: SettingsStorageKey[] = [
  SETTINGS_STORAGE_KEYS.appLanguage,
  SETTINGS_STORAGE_KEYS.appVisibility,
  SETTINGS_STORAGE_KEYS.userCoordinates,
  SETTINGS_STORAGE_KEYS.preferredMosqueId,
  SETTINGS_STORAGE_KEYS.preferredHalalCity,
  SETTINGS_STORAGE_KEYS.onboardingComplete,
  SETTINGS_STORAGE_KEYS.notificationToggles,
  SETTINGS_STORAGE_KEYS.kahfReminderEnabled,
  SETTINGS_STORAGE_KEYS.themePreference,
  SETTINGS_STORAGE_KEYS.tvAnnouncementsEnabled,
  SETTINGS_STORAGE_KEYS.tvAnnouncementSeconds,
];

export const TV_ANNOUNCEMENT_SECONDS = {
  default: 45,
  max: 300,
  min: 10,
  step: 5,
} as const;

export const DEFAULT_NOTIFICATION_TOGGLES = Object.fromEntries(
  PRAYER_NAMES.map((prayer) => [prayer, { adhan: true, reminder: true }]),
) as NotificationToggles;

export const DEFAULT_APP_VISIBILITY: AppVisibility = {
  agenda: true,
  announcements: true,
  community: true,
  events: true,
  halalPlaces: true,
  prayerHistory: true,
  prayerLogActions: true,
  prayerQada: true,
  prayerTracker: true,
};

export const DEFAULT_SETTINGS: SettingsData = {
  appLanguage: 'en',
  appVisibility: DEFAULT_APP_VISIBILITY,
  hydrated: false,
  kahfReminderEnabled: true,
  notificationToggles: DEFAULT_NOTIFICATION_TOGGLES,
  onboardingComplete: false,
  preferredHalalCity: null,
  preferredMosqueId: null,
  themePreference: 'dark',
  tvAnnouncementSeconds: TV_ANNOUNCEMENT_SECONDS.default,
  tvAnnouncementsEnabled: true,
  userCoordinates: DEFAULT_COORDS,
};

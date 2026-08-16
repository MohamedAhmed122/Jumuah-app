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
];

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
  userCoordinates: DEFAULT_COORDS,
};

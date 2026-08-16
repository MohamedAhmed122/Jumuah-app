import type { StoreApi } from 'zustand';

import { DEFAULT_SETTINGS, SETTINGS_STORAGE_KEYS } from './settingsStore.constants';
import { clearStoredSettings, deleteSetting, readStoredSettings, writeSetting } from './settingsStore.storage';
import type { SettingsActions, SettingsState } from './settingsStore.types';
import { parseStoredSettings, toggleNotification } from './settingsStore.utils';

type SetSettings = StoreApi<SettingsState>['setState'];
type GetSettings = StoreApi<SettingsState>['getState'];

export function createSettingsActions(set: SetSettings, get: GetSettings): SettingsActions {
  const keys = SETTINGS_STORAGE_KEYS;

  return {
    completeOnboarding: async () => {
      await writeSetting(keys.onboardingComplete, 'true');
      set({ onboardingComplete: true });
    },
    hydrate: async () => {
      set(parseStoredSettings(await readStoredSettings()));
    },
    resetLocalSettings: async () => {
      await clearStoredSettings();
      set({ ...DEFAULT_SETTINGS, hydrated: true });
    },
    resetOnboarding: async () => {
      await writeSetting(keys.onboardingComplete, 'false');
      set({ onboardingComplete: false });
    },
    setCoordinates: async (userCoordinates) => {
      await writeSetting(keys.userCoordinates, JSON.stringify(userCoordinates));
      set({ userCoordinates });
    },
    setAppVisibility: async (key, visible) => {
      const appVisibility = { ...get().appVisibility, [key]: visible };
      await writeSetting(keys.appVisibility, JSON.stringify(appVisibility));
      set({ appVisibility });
    },
    setKahfReminder: async (kahfReminderEnabled) => {
      await writeSetting(keys.kahfReminderEnabled, kahfReminderEnabled ? 'true' : 'false');
      set({ kahfReminderEnabled });
    },
    setLanguage: async (appLanguage) => {
      await writeSetting(keys.appLanguage, appLanguage);
      set({ appLanguage });
    },
    setPreferredHalalCity: async (preferredHalalCity) => {
      if (preferredHalalCity) await writeSetting(keys.preferredHalalCity, preferredHalalCity);
      else await deleteSetting(keys.preferredHalalCity);
      set({ preferredHalalCity });
    },
    setPreferredMosque: async (preferredMosqueId) => {
      if (preferredMosqueId) await writeSetting(keys.preferredMosqueId, preferredMosqueId);
      else await deleteSetting(keys.preferredMosqueId);
      set({ preferredMosqueId });
    },
    togglePrayerNotification: async (prayer, type) => {
      const notificationToggles = toggleNotification(get().notificationToggles, prayer, type);
      await writeSetting(keys.notificationToggles, JSON.stringify(notificationToggles));
      set({ notificationToggles });
    },
  };
}

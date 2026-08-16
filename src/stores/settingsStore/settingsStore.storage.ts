import * as SecureStore from 'expo-secure-store';

import { SETTINGS_STORAGE_KEYS, SETTINGS_STORAGE_KEY_LIST } from './settingsStore.constants';
import type { SettingsStorageKey } from './settingsStore.constants';
import type { StoredSettings } from './settingsStore.types';

export function writeSetting(key: SettingsStorageKey, value: string) {
  return SecureStore.setItemAsync(key, value);
}

export function deleteSetting(key: SettingsStorageKey) {
  return SecureStore.deleteItemAsync(key);
}

export function clearStoredSettings() {
  return Promise.all(SETTINGS_STORAGE_KEY_LIST.map(deleteSetting));
}

export async function readStoredSettings(): Promise<StoredSettings> {
  const keys = SETTINGS_STORAGE_KEYS;
  const values = await Promise.all([
    SecureStore.getItemAsync(keys.appLanguage),
    SecureStore.getItemAsync(keys.appVisibility),
    SecureStore.getItemAsync(keys.userCoordinates),
    SecureStore.getItemAsync(keys.preferredMosqueId),
    SecureStore.getItemAsync(keys.preferredHalalCity),
    SecureStore.getItemAsync(keys.onboardingComplete),
    SecureStore.getItemAsync(keys.notificationToggles),
    SecureStore.getItemAsync(keys.kahfReminderEnabled),
  ]);

  return {
    appLanguage: values[0],
    appVisibility: values[1],
    userCoordinates: values[2],
    preferredMosqueId: values[3],
    preferredHalalCity: values[4],
    onboardingComplete: values[5],
    notificationToggles: values[6],
    kahfReminderEnabled: values[7],
  };
}

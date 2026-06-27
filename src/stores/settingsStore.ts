import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import type { PrayerName } from '@constants/prayerMethods';
import { DEFAULT_COORDS, PRAYER_NAMES } from '@constants/prayerMethods';

interface Coordinates { lat: number; lng: number }

export type NotificationToggles = Record<PrayerName, { adhan: boolean; reminder: boolean }>;

const DEFAULT_TOGGLES: NotificationToggles = Object.fromEntries(
  PRAYER_NAMES.map((p) => [p, { adhan: true, reminder: true }])
) as NotificationToggles;

interface SettingsState {
  appLanguage: 'en' | 'ru';
  userCoordinates: Coordinates;
  preferredMosqueId: string | null;
  onboardingComplete: boolean;
  notificationToggles: NotificationToggles;
  kahfReminderEnabled: boolean;
  hydrated: boolean;

  setLanguage: (lang: 'en' | 'ru') => Promise<void>;
  setCoordinates: (coords: Coordinates) => Promise<void>;
  setPreferredMosque: (mosqueId: string | null) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
  resetLocalSettings: () => Promise<void>;
  togglePrayerNotification: (prayer: PrayerName, type: 'adhan' | 'reminder') => Promise<void>;
  setKahfReminder: (enabled: boolean) => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  appLanguage: 'en',
  userCoordinates: DEFAULT_COORDS,
  preferredMosqueId: null,
  onboardingComplete: false,
  notificationToggles: DEFAULT_TOGGLES,
  kahfReminderEnabled: true,
  hydrated: false,

  setLanguage: async (lang) => {
    await SecureStore.setItemAsync('appLanguage', lang);
    set({ appLanguage: lang });
  },

  setCoordinates: async (coords) => {
    await SecureStore.setItemAsync('userCoordinates', JSON.stringify(coords));
    set({ userCoordinates: coords });
  },

  setPreferredMosque: async (mosqueId) => {
    if (mosqueId) {
      await SecureStore.setItemAsync('preferredMosqueId', mosqueId);
    } else {
      await SecureStore.deleteItemAsync('preferredMosqueId');
    }
    set({ preferredMosqueId: mosqueId });
  },

  completeOnboarding: async () => {
    await SecureStore.setItemAsync('onboardingComplete', 'true');
    set({ onboardingComplete: true });
  },

  resetOnboarding: async () => {
    await SecureStore.setItemAsync('onboardingComplete', 'false');
    set({ onboardingComplete: false });
  },

  resetLocalSettings: async () => {
    await Promise.all([
      SecureStore.deleteItemAsync('appLanguage'),
      SecureStore.deleteItemAsync('userCoordinates'),
      SecureStore.deleteItemAsync('preferredMosqueId'),
      SecureStore.deleteItemAsync('onboardingComplete'),
      SecureStore.deleteItemAsync('notificationToggles'),
      SecureStore.deleteItemAsync('kahfReminderEnabled'),
    ]);
    set({
      appLanguage: 'en',
      userCoordinates: DEFAULT_COORDS,
      preferredMosqueId: null,
      onboardingComplete: false,
      notificationToggles: DEFAULT_TOGGLES,
      kahfReminderEnabled: true,
      hydrated: true,
    });
  },

  togglePrayerNotification: async (prayer, type) => {
    const current = get().notificationToggles;
    const updated: NotificationToggles = {
      ...current,
      [prayer]: { ...current[prayer], [type]: !current[prayer][type] },
    };
    await SecureStore.setItemAsync('notificationToggles', JSON.stringify(updated));
    set({ notificationToggles: updated });
  },

  setKahfReminder: async (enabled) => {
    await SecureStore.setItemAsync('kahfReminderEnabled', enabled ? 'true' : 'false');
    set({ kahfReminderEnabled: enabled });
  },

  hydrate: async () => {
    const [lang, coords, preferredMosqueId, onboarding, togglesRaw, kahf] = await Promise.all([
      SecureStore.getItemAsync('appLanguage'),
      SecureStore.getItemAsync('userCoordinates'),
      SecureStore.getItemAsync('preferredMosqueId'),
      SecureStore.getItemAsync('onboardingComplete'),
      SecureStore.getItemAsync('notificationToggles'),
      SecureStore.getItemAsync('kahfReminderEnabled'),
    ]);

    set({
      appLanguage: (lang as 'en' | 'ru') ?? 'en',
      userCoordinates: coords ? JSON.parse(coords) : DEFAULT_COORDS,
      preferredMosqueId,
      onboardingComplete: onboarding === 'true',
      notificationToggles: togglesRaw ? JSON.parse(togglesRaw) : DEFAULT_TOGGLES,
      kahfReminderEnabled: kahf !== 'false',
      hydrated: true,
    });
  },
}));

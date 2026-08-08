import type { PrayerName } from '@constants/prayerMethods';
import type { AppLanguage } from '@src/i18n/languages';

export interface Coordinates {
  lat: number;
  lng: number;
}

export type NotificationType = 'adhan' | 'reminder';
export type NotificationToggles = Record<PrayerName, Record<NotificationType, boolean>>;

export interface SettingsData {
  appLanguage: AppLanguage;
  hydrated: boolean;
  kahfReminderEnabled: boolean;
  notificationToggles: NotificationToggles;
  onboardingComplete: boolean;
  preferredHalalCity: string | null;
  preferredMosqueId: string | null;
  userCoordinates: Coordinates;
}

export interface SettingsActions {
  completeOnboarding: () => Promise<void>;
  hydrate: () => Promise<void>;
  resetLocalSettings: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
  setCoordinates: (coordinates: Coordinates) => Promise<void>;
  setKahfReminder: (enabled: boolean) => Promise<void>;
  setLanguage: (language: AppLanguage) => Promise<void>;
  setPreferredHalalCity: (city: string | null) => Promise<void>;
  setPreferredMosque: (mosqueId: string | null) => Promise<void>;
  togglePrayerNotification: (prayer: PrayerName, type: NotificationType) => Promise<void>;
}

export type SettingsState = SettingsData & SettingsActions;

export interface StoredSettings {
  appLanguage: string | null;
  kahfReminderEnabled: string | null;
  notificationToggles: string | null;
  onboardingComplete: string | null;
  preferredHalalCity: string | null;
  preferredMosqueId: string | null;
  userCoordinates: string | null;
}

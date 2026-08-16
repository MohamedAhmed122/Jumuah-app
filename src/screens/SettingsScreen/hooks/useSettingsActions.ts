import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import type { AppLanguage } from '@src/i18n/languages';
import i18n from '@src/i18n';
import { clearUserDatabaseData } from '@src/db/userData';
import { useSettingsStore } from '@src/stores/settingsStore';

export function useSettingsActions() {
  const settings = useSettingsStore();
  const selectLanguage = async (language: AppLanguage) => {
    await settings.setLanguage(language);
    await i18n.changeLanguage(language);
  };
  const resetApplication = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await clearUserDatabaseData();
    await settings.resetLocalSettings();
    await i18n.changeLanguage('en');
    router.replace('/onboarding');
  };
  return {
    appLanguage: settings.appLanguage,
    appVisibility: settings.appVisibility,
    notificationToggles: settings.notificationToggles,
    kahfReminderEnabled: settings.kahfReminderEnabled,
    selectLanguage,
    togglePrayerNotification: settings.togglePrayerNotification,
    setKahfReminder: settings.setKahfReminder,
    setAppVisibility: settings.setAppVisibility,
    resetApplication,
  };
}

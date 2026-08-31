import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import type { AppLanguage } from '@src/i18n/languages';
import i18n from '@src/i18n';
import { clearUserDatabaseData } from '@src/db/userData';
import { deleteDeviceId } from '@src/device/deviceIdentity';
import { useSettingsStore } from '@src/stores/settingsStore';

export function useSettingsActions() {
  const settings = useSettingsStore();
  const selectLanguage = async (language: AppLanguage) => {
    await settings.setLanguage(language);
    await i18n.changeLanguage(language);
  };
  const clearApplicationData = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await clearUserDatabaseData();
    await deleteDeviceId();
    await settings.resetLocalSettings();
    await i18n.changeLanguage('en');
    router.replace('/onboarding');
  };
  const resetApplication = () => {
    Alert.alert(
      i18n.t('settings.reset_application'),
      i18n.t('settings.reset_confirmation'),
      [
        { text: i18n.t('settings.cancel'), style: 'cancel' },
        { text: i18n.t('settings.reset'), style: 'destructive', onPress: () => { void clearApplicationData(); } },
      ],
    );
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

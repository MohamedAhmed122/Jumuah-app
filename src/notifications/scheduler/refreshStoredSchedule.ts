import { useSettingsStore } from '@src/stores/settingsStore';
import type { SettingsData } from '@src/stores/settingsStore';
import { rescheduleNotifications } from './rescheduleNotifications';
import type { NotificationScheduleSettings } from './scheduler.types';

export function toNotificationScheduleSettings(settings: SettingsData): NotificationScheduleSettings {
  return {
    coordinates: settings.userCoordinates,
    kahfReminderEnabled: settings.kahfReminderEnabled,
    notificationToggles: settings.notificationToggles,
    preferredMosqueId: settings.preferredMosqueId,
  };
}

export async function refreshStoredSchedule(): Promise<void> {
  if (!useSettingsStore.getState().hydrated) await useSettingsStore.getState().hydrate();
  const settings = useSettingsStore.getState();
  if (!settings.onboardingComplete) return;
  await rescheduleNotifications(toNotificationScheduleSettings(settings), settings.appLanguage);
}

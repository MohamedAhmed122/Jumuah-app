import { useEffect } from 'react';
import { AppState } from 'react-native';

import { registerNotificationRefreshTask, rescheduleNotifications } from '@src/notifications/scheduler';
import { useSettingsStore } from '@src/stores/settingsStore';

export function useNotificationScheduleSync() {
  const hydrated = useSettingsStore((state) => state.hydrated);
  const onboardingComplete = useSettingsStore((state) => state.onboardingComplete);
  const language = useSettingsStore((state) => state.appLanguage);
  const coordinates = useSettingsStore((state) => state.userCoordinates);
  const kahfReminderEnabled = useSettingsStore((state) => state.kahfReminderEnabled);
  const notificationToggles = useSettingsStore((state) => state.notificationToggles);
  const preferredMosqueId = useSettingsStore((state) => state.preferredMosqueId);
  const ready = hydrated && onboardingComplete;

  useEffect(() => {
    if (!ready) return;
    void registerNotificationRefreshTask();
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    const settings = { coordinates, kahfReminderEnabled, notificationToggles, preferredMosqueId };
    const sync = () => { rescheduleNotifications(settings, language).catch(() => undefined); };
    sync();
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') sync();
    });
    return () => subscription.remove();
  }, [ready, language, coordinates, kahfReminderEnabled, notificationToggles, preferredMosqueId]);
}

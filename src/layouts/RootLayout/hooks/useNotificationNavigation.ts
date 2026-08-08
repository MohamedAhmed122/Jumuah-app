import { useEffect } from 'react';
import { router } from 'expo-router';
import * as Notifications from 'expo-notifications';

import { useSettingsStore } from '@src/stores/settingsStore';

export function useNotificationNavigation() {
  const hydrated = useSettingsStore((state) => state.hydrated);
  const onboardingComplete = useSettingsStore((state) => state.onboardingComplete);

  useEffect(() => {
    if (!hydrated || !onboardingComplete) return;
    const openAnnouncement = (response: Notifications.NotificationResponse | null) => {
      const data = response?.notification.request.content.data;
      if (data?.type === 'announcement' && typeof data.id === 'string') {
        router.push(`/announcement/${data.id}`);
        void Notifications.clearLastNotificationResponse();
      }
    };

    void Notifications.getLastNotificationResponseAsync().then(openAnnouncement);
    const subscription = Notifications.addNotificationResponseReceivedListener(openAnnouncement);
    return () => subscription.remove();
  }, [hydrated, onboardingComplete]);
}

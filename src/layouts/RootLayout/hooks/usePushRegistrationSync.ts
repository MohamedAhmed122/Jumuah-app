import { useEffect } from 'react';
import { AppState } from 'react-native';

import { syncPushRegistration } from '@src/notifications/pushRegistration';
import { useSettingsStore } from '@src/stores/settingsStore';

export function usePushRegistrationSync() {
  const hydrated = useSettingsStore((state) => state.hydrated);
  const onboardingComplete = useSettingsStore((state) => state.onboardingComplete);
  const mosqueId = useSettingsStore((state) => state.preferredMosqueId);
  const language = useSettingsStore((state) => state.appLanguage);

  useEffect(() => {
    if (!hydrated || !onboardingComplete) return;
    const sync = () => { void syncPushRegistration(mosqueId, language); };
    sync();
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') sync();
    });
    return () => subscription.remove();
  }, [hydrated, language, mosqueId, onboardingComplete]);
}

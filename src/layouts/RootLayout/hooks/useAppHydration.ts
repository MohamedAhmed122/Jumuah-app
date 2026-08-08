import { useEffect } from 'react';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import i18n from '@src/i18n';
import { useSettingsStore } from '@src/stores/settingsStore';

export function useAppHydration() {
  const settings = useSettingsStore();

  useEffect(() => {
    void settings.hydrate();
  }, []);

  useEffect(() => {
    if (!settings.hydrated) return;
    void i18n.changeLanguage(settings.appLanguage);
    void SplashScreen.hideAsync();
    if (!settings.onboardingComplete) router.replace('/onboarding');
  }, [settings.appLanguage, settings.hydrated, settings.onboardingComplete]);

  return settings.hydrated;
}

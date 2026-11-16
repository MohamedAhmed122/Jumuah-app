import { useEffect } from 'react';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { isTelevision } from '@src/device/television';
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
  }, [settings.appLanguage, settings.hydrated]);

  useEffect(() => {
    if (!settings.hydrated) return;
    void SplashScreen.hideAsync();
    if (!isTelevision && !settings.onboardingComplete) router.replace('/onboarding');
  }, [settings.hydrated, settings.onboardingComplete]);

  return settings.hydrated;
}

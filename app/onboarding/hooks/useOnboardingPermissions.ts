import { useState } from 'react';
import { usePermissions } from '@src/hooks/usePermissions';
import i18n from '@src/i18n';
import type { AppLanguage } from '@src/i18n/languages';
import { useSettingsStore } from '@src/stores/settingsStore';
import { resolveOnboardingCoordinates } from '../OnboardingScreen.location';

interface Args { goTo: (step: number) => void; loadMosques: () => Promise<void> }

export function useOnboardingPermissions({ goTo, loadMosques }: Args) {
  const [selectedLanguage, setSelectedLanguage] = useState<AppLanguage>('en');
  const { requestLocation, requestNotifications } = usePermissions();
  const setLanguage = useSettingsStore((state) => state.setLanguage);
  const setCoordinates = useSettingsStore((state) => state.setCoordinates);

  const selectLanguage = async (language: AppLanguage) => {
    setSelectedLanguage(language);
    await setLanguage(language);
    await i18n.changeLanguage(language);
  };
  const selectLocation = async (allow: boolean) => {
    const coordinates = resolveOnboardingCoordinates(allow, requestLocation);
    goTo(3);
    await setCoordinates(await coordinates);
  };
  const selectNotifications = async (allow: boolean) => {
    if (allow) await requestNotifications();
    await loadMosques();
    goTo(4);
  };

  return {
    selectedLanguage,
    selectLanguage,
    allowLocation: () => selectLocation(true),
    skipLocation: () => selectLocation(false),
    allowNotifications: () => selectNotifications(true),
    skipNotifications: () => selectNotifications(false),
  };
}

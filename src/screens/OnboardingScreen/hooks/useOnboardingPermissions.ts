import { useState } from 'react';

import { ONBOARDING_STEPS } from '@/app/onboarding/OnboardingScreen.constants';
import { resolveOnboardingCoordinates } from '@/app/onboarding/OnboardingScreen.location';
import { usePermissions } from '@src/hooks/usePermissions';
import i18n from '@src/i18n';
import type { AppLanguage } from '@src/i18n/languages';
import { useSettingsStore } from '@src/stores/settingsStore';

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
    goTo(ONBOARDING_STEPS.notifications);
    await setCoordinates(await coordinates);
  };
  const selectNotifications = async (allow: boolean) => {
    if (allow) await requestNotifications();
    await loadMosques();
    goTo(ONBOARDING_STEPS.mosque);
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

import { useState } from 'react';
import { DEFAULT_COORDS } from '@constants/prayerMethods';
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
    if (!allow || !(await requestLocation())) {
      await setCoordinates(DEFAULT_COORDS);
    } else {
      const Location = await import('expo-location');
      const position = await Location.getCurrentPositionAsync({});
      await setCoordinates({ lat: position.coords.latitude, lng: position.coords.longitude });
    }
    goTo(3);
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

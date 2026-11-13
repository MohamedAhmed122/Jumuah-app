import { useEffect } from 'react';
import { Appearance } from 'react-native';

import { useSettingsStore } from '@src/stores/settingsStore';

export function useAppearanceSync() {
  const preference = useSettingsStore((state) => state.themePreference);
  const hydrated = useSettingsStore((state) => state.hydrated);

  useEffect(() => {
    if (!hydrated) return;
    Appearance.setColorScheme(preference === 'system' ? null : preference);
  }, [hydrated, preference]);
}

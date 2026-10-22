import { useSettingsStore } from '@src/stores/settingsStore';

export function useOnboardingTheme() {
  const selectedTheme = useSettingsStore((state) => state.themePreference);
  const setThemePreference = useSettingsStore((state) => state.setThemePreference);

  return { selectedTheme, selectTheme: setThemePreference };
}

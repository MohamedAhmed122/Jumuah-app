import { useColorScheme } from 'react-native';

import { ThemePalettes } from '@constants/Colors';
import type { ThemeColors, ThemeName } from '@constants/Colors';
import { useSettingsStore } from '@src/stores/settingsStore';
import { resolveThemeName } from '@src/theme';
import type { ThemedStyles } from '@src/theme';

export function useThemeName(): ThemeName {
  const preference = useSettingsStore((state) => state.themePreference);
  const scheme = useColorScheme();
  return resolveThemeName(preference, scheme);
}

export function useThemeColors(): ThemeColors {
  return ThemePalettes[useThemeName()];
}

export function useThemedStyles<T>(themed: ThemedStyles<T>): T {
  return themed[useThemeName()];
}

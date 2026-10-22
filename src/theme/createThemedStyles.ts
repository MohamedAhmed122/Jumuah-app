import { StyleSheet } from 'react-native';

import { DarkColors, LightColors } from '@constants/Colors';
import type { ThemeColors, ThemeName } from '@constants/Colors';

export type ThemedStyles<T> = Record<ThemeName, T>;

export function createThemedStyles<T extends StyleSheet.NamedStyles<T>>(
  factory: (colors: ThemeColors) => T,
): ThemedStyles<T> {
  return {
    dark: StyleSheet.create(factory(DarkColors)),
    light: StyleSheet.create(factory(LightColors)),
  };
}

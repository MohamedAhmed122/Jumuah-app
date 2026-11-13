import type { ThemeName } from '@constants/Colors';

export const THEME_PREFERENCES = ['system', 'light', 'dark'] as const;

export type ThemePreference = (typeof THEME_PREFERENCES)[number];

export type SystemColorScheme = ThemeName | null | undefined;

import type { ThemeName } from '@constants/Colors';

import { THEME_PREFERENCES } from './theme.types';
import type { SystemColorScheme, ThemePreference } from './theme.types';

export function isThemePreference(value: string | null): value is ThemePreference {
  return value !== null && (THEME_PREFERENCES as readonly string[]).includes(value);
}

export function resolveThemeName(preference: ThemePreference, scheme: SystemColorScheme): ThemeName {
  if (preference !== 'system') return preference;
  return scheme === 'light' ? 'light' : 'dark';
}

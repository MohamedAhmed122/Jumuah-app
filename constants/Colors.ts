export type ThemeName = 'light' | 'dark';

export interface ThemeColors {
  accent: string;
  accentRing: string;
  accentSoft: string;
  accentTint: string;
  background: string;
  border: string;
  error: string;
  iconMuted: string;
  iconOn: string;
  iconOnSoft: string;
  iqamaTime: string;
  onAccent: string;
  prayerName: string;
  prayerTime: string;
  success: string;
  surface: string;
  surfaceElevated: string;
  switchThumb: string;
  tabPill: string;
  textMuted: string;
  textPrimary: string;
  textSecondary: string;
}

export const DarkColors: ThemeColors = {
  accent: '#3DD68C',
  accentRing: 'rgba(61,214,140,0.15)',
  accentSoft: '#A8F0C6',
  accentTint: 'rgba(61,214,140,0.07)',
  background: '#0A1A0F',
  border: '#2D4F38',
  error: '#F87171',
  iconMuted: '#2D4F38',
  iconOn: '#3DD68C',
  iconOnSoft: '#A8F0C6',
  iqamaTime: '#A8F0C6',
  onAccent: '#0A1A0F',
  prayerName: '#86EFAC',
  prayerTime: '#86EFAC',
  success: '#3DD68C',
  surface: '#162A1C',
  surfaceElevated: '#1E3B27',
  switchThumb: '#F0FFF4',
  tabPill: 'transparent',
  textMuted: 'rgba(240,255,244,0.5)',
  textPrimary: '#F0FFF4',
  textSecondary: '#86EFAC',
};

export const LightColors: ThemeColors = {
  accent: '#1C7A4A',
  accentRing: 'rgba(28,122,74,0.15)',
  accentSoft: '#145C37',
  accentTint: 'rgba(28,122,74,0.08)',
  background: '#EEF6F0',
  border: '#D6E7DC',
  error: '#B3392A',
  iconMuted: '#9DB5A6',
  iconOn: '#4A6656',
  iconOnSoft: '#4A6656',
  iqamaTime: '#10241A',
  onAccent: '#FFFFFF',
  prayerName: '#10241A',
  prayerTime: '#10241A',
  success: '#1C7A4A',
  surface: '#FFFFFF',
  surfaceElevated: '#E4F4EA',
  switchThumb: '#FFFFFF',
  tabPill: '#D5EEDD',
  textMuted: 'rgba(16,36,26,0.5)',
  textPrimary: '#10241A',
  textSecondary: '#4A6656',
};

export const ThemePalettes: Record<ThemeName, ThemeColors> = {
  dark: DarkColors,
  light: LightColors,
};

export type ColorKey = keyof ThemeColors;

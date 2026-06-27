export const Colors = {
  background: '#0A1A0F',
  surface: '#162A1C',
  surfaceElevated: '#1E3B27',
  accent: '#3DD68C',
  accentSoft: '#A8F0C6',
  textPrimary: '#F0FFF4',
  textSecondary: '#86EFAC',
  border: '#2D4F38',
  error: '#F87171',
  success: '#3DD68C',
} as const;

export type ColorKey = keyof typeof Colors;

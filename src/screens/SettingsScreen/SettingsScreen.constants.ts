import type { ThemeColors } from '@constants/Colors';

export function createTrackColors(colors: ThemeColors) {
  return {
    adhan: { false: colors.border, true: colors.accent },
    reminder: { false: colors.border, true: colors.accentSoft },
  };
}

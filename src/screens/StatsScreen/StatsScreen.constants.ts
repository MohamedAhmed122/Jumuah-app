import { Dimensions } from 'react-native';

import type { ThemeColors } from '@constants/Colors';

export const HEATMAP_CELL_SIZE = Math.floor((Dimensions.get('window').width - 48) / 7);

export function getHeatColor(colors: ThemeColors, prayed: number): string {
  if (prayed === 5) return colors.accent;
  if (prayed >= 3) return '#2AA870';
  if (prayed >= 1) return '#D97706';
  return colors.error;
}

export function getHeatmapBackground(colors: ThemeColors, prayed: number, future: boolean): string {
  if (future) return colors.surface;
  return prayed > 0 ? getHeatColor(colors, prayed) : colors.surfaceElevated;
}

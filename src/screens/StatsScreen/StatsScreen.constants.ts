import { Dimensions } from 'react-native';
import { Colors } from '@constants/Colors';

export const HEATMAP_CELL_SIZE = Math.floor((Dimensions.get('window').width - 48) / 7);

export function getHeatColor(prayed: number): string {
  if (prayed === 5) return Colors.accent;
  if (prayed >= 3) return '#2AA870';
  if (prayed >= 1) return '#D97706';
  return Colors.error;
}

export function getHeatmapBackground(prayed: number, future: boolean): string {
  if (future) return Colors.surface;
  return prayed > 0 ? getHeatColor(prayed) : Colors.surfaceElevated;
}

import { StyleSheet } from 'react-native';

import type { ThemeColors } from '@constants/Colors';
import { createThemedStyles } from '@src/theme';

import { getHeatmapBackground, HEATMAP_CELL_SIZE } from '../StatsScreen.constants';

export const createDayStyle = (colors: ThemeColors, prayed: number, future: boolean) => StyleSheet.create({
  day: { borderRadius: 6, backgroundColor: getHeatmapBackground(colors, prayed, future) },
}).day;

export const themedStyles = createThemedStyles((colors) => ({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 2 },
  cell: {
    width: HEATMAP_CELL_SIZE, height: HEATMAP_CELL_SIZE,
    alignItems: 'center', justifyContent: 'center',
  },
  day: { fontSize: 9, color: colors.textMuted },
}));

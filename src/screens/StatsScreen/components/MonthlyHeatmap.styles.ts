import { StyleSheet } from 'react-native';
import { getHeatmapBackground, HEATMAP_CELL_SIZE } from '../StatsScreen.constants';

export const createDayStyle = (prayed: number, future: boolean) => StyleSheet.create({
  day: { borderRadius: 6, backgroundColor: getHeatmapBackground(prayed, future) },
}).day;

export const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 2 },
  cell: {
    width: HEATMAP_CELL_SIZE, height: HEATMAP_CELL_SIZE,
    alignItems: 'center', justifyContent: 'center',
  },
  day: { fontSize: 9, color: 'rgba(240,255,244,0.5)' },
});

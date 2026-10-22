import { Text, View } from 'react-native';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import type { HeatmapDay } from '../StatsScreen.types';
import { StatsCard } from './StatsCard';
import { createDayStyle, themedStyles } from './MonthlyHeatmap.styles';

interface Props { days: HeatmapDay[]; firstWeekday: number }

export function MonthlyHeatmap({ days, firstWeekday }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  const title = new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  return (
    <StatsCard title={title}>
      <View style={styles.grid}>
        {Array.from({ length: firstWeekday }).map((_, index) => (
          <View key={`empty-${index}`} style={styles.cell} />
        ))}
        {days.map((day) => (
          <View key={day.day} style={[styles.cell, createDayStyle(colors, day.prayed, day.isFuture)]}>
            <Text style={styles.day}>{day.day}</Text>
          </View>
        ))}
      </View>
    </StatsCard>
  );
}

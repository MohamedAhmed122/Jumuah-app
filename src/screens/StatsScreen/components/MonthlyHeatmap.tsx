import { Text, View } from 'react-native';
import type { HeatmapDay } from '../StatsScreen.types';
import { StatsCard } from './StatsCard';
import { createDayStyle, styles } from './MonthlyHeatmap.styles';

interface Props { days: HeatmapDay[]; firstWeekday: number }

export function MonthlyHeatmap({ days, firstWeekday }: Props) {
  const title = new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  return (
    <StatsCard title={title}>
      <View style={styles.grid}>
        {Array.from({ length: firstWeekday }).map((_, index) => (
          <View key={`empty-${index}`} style={styles.cell} />
        ))}
        {days.map((day) => (
          <View key={day.day} style={[styles.cell, createDayStyle(day.prayed, day.isFuture)]}>
            <Text style={styles.day}>{day.day}</Text>
          </View>
        ))}
      </View>
    </StatsCard>
  );
}

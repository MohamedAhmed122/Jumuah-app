import { Text, View } from 'react-native';

import type { LegendItemViewModel } from '../CalendarScreen.types';
import { legendDotStyles, styles } from './EventLegend.styles';

interface EventLegendProps {
  items: LegendItemViewModel[];
}

export function EventLegend({ items }: EventLegendProps) {
  return (
    <View style={styles.legend}>
      {items.map((item) => (
        <View key={item.event} style={styles.item}>
          <View style={[styles.dot, legendDotStyles[item.event]]} />
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

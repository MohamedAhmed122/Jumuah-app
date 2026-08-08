import { ScrollView, View } from 'react-native';

import type { CalendarCellViewModel } from '../CalendarScreen.types';
import { CalendarDay } from './CalendarDay';
import { styles } from './CalendarGrid.styles';

interface CalendarGridProps {
  cells: CalendarCellViewModel[];
}

export function CalendarGrid({ cells }: CalendarGridProps) {
  return (
    <ScrollView contentContainerStyle={styles.grid}>
      {cells.map((cell, index) => cell
        ? <CalendarDay day={cell} key={cell.key} />
        : <View key={`empty-${index}`} style={styles.cell} />)}
    </ScrollView>
  );
}

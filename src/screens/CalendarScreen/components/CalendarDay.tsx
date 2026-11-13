import { Text, View } from 'react-native';

import { useThemedStyles } from '@src/hooks/useTheme';
import type { CalendarDayViewModel } from '../CalendarScreen.types';
import { themedEventDotStyles, themedStyles } from './CalendarDay.styles';

interface CalendarDayProps {
  day: CalendarDayViewModel;
}

export function CalendarDay({ day }: CalendarDayProps) {
  const styles = useThemedStyles(themedStyles);
  const eventDotStyles = useThemedStyles(themedEventDotStyles);
  return (
    <View style={[styles.cell, day.isRamadan && styles.cellRamadan]}>
      <View style={[styles.dayCircle, day.isToday && styles.dayCircleToday]}>
        <Text style={[styles.dayNumber, day.isToday && styles.dayNumberToday]}>{day.day}</Text>
      </View>
      <Text style={styles.hijriNumber}>{day.hijriDay}</Text>
      {day.event && !day.isRamadan && (
        <View style={[styles.eventDot, eventDotStyles[day.event]]} />
      )}
    </View>
  );
}

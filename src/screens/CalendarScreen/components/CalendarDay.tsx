import { Text, View } from 'react-native';

import type { CalendarDayViewModel } from '../CalendarScreen.types';
import { eventDotStyles, styles } from './CalendarDay.styles';

interface CalendarDayProps {
  day: CalendarDayViewModel;
}

export function CalendarDay({ day }: CalendarDayProps) {
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

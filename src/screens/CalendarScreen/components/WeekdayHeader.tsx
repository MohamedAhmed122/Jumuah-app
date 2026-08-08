import { Text, View } from 'react-native';

import { WEEKDAYS } from '../CalendarScreen.constants';
import { styles } from './WeekdayHeader.styles';

export function WeekdayHeader() {
  return (
    <View style={styles.row}>
      {WEEKDAYS.map((weekday, index) => (
        <Text key={index} style={[styles.label, index === 4 && styles.friday]}>{weekday}</Text>
      ))}
    </View>
  );
}

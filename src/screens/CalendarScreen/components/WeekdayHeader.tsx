import { Text, View } from 'react-native';

import { useThemedStyles } from '@src/hooks/useTheme';
import { WEEKDAYS } from '../CalendarScreen.constants';
import { themedStyles } from './WeekdayHeader.styles';

export function WeekdayHeader() {
  const styles = useThemedStyles(themedStyles);
  return (
    <View style={styles.row}>
      {WEEKDAYS.map((weekday, index) => (
        <Text key={index} style={[styles.label, index === 4 && styles.friday]}>{weekday}</Text>
      ))}
    </View>
  );
}

import { Text, View } from 'react-native';

import { styles } from './PrayerTimes.styles';

interface PrayerTimesProps {
  adhanLabel: string;
  iqamaLabel: string;
  iqamaTime?: string;
  isActive: boolean;
  time: string;
}

export function PrayerTimes(props: PrayerTimesProps) {
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.label}>{props.adhanLabel}</Text>
        <Text style={[styles.time, props.isActive && styles.timeActive]}>{props.time}</Text>
      </View>
      {props.iqamaTime && (
        <View style={styles.iqamaBlock}>
          <Text style={styles.label}>{props.iqamaLabel}</Text>
          <Text style={styles.iqamaTime}>{props.iqamaTime}</Text>
        </View>
      )}
    </View>
  );
}

import { Text, TouchableOpacity, View } from 'react-native';

import type { PrayerName } from '@constants/prayerMethods';

import type {
  PrayerCellViewModel,
  PrayerDayViewModel,
  PrayerLogStatus,
} from '../TrackerScreen.types';
import { useThemedStyles } from '@src/hooks/useTheme';
import { PrayerStatus } from './PrayerStatus';
import { themedStyles } from './PrayerDayCard.styles';

interface PrayerDayCardProps {
  day: PrayerDayViewModel;
  onToggle: (date: string, prayer: PrayerName, status: PrayerLogStatus) => void;
}

function PrayerCellContent({ item }: { item: PrayerCellViewModel }) {
  const styles = useThemedStyles(themedStyles);
  return (
    <>
      <Text style={[styles.prayerName, item.locked && styles.prayerNameDisabled]}>
        {item.label}
      </Text>
      <PrayerStatus locked={item.locked} status={item.status} />
    </>
  );
}

export function PrayerDayCard({ day, onToggle }: PrayerDayCardProps) {
  const styles = useThemedStyles(themedStyles);
  return (
    <View style={styles.card}>
      <Text style={[styles.dayLabel, day.isToday && styles.dayLabelToday]}>{day.label}</Text>
      <View style={styles.row}>
        {day.prayers.map((item) => item.disabled ? (
          <View key={item.prayer} pointerEvents="none" style={[styles.cell, styles.cellDisabled]}>
            <PrayerCellContent item={item} />
          </View>
        ) : (
          <TouchableOpacity
            key={item.prayer}
            onPress={() => onToggle(day.date, item.prayer, item.status)}
            style={styles.cell}
          >
            <PrayerCellContent item={item} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

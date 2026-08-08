import { FlatList } from 'react-native';

import type { PrayerName } from '@constants/prayerMethods';

import type { PrayerDayViewModel, PrayerLogStatus } from '../TrackerScreen.types';
import { PrayerDayCard } from './PrayerDayCard';
import { styles } from './TrackerList.styles';

interface TrackerListProps {
  days: PrayerDayViewModel[];
  onToggle: (date: string, prayer: PrayerName, status: PrayerLogStatus) => void;
}

export function TrackerList({ days, onToggle }: TrackerListProps) {
  return (
    <FlatList
      contentContainerStyle={styles.content}
      data={days}
      keyExtractor={(item) => item.date}
      renderItem={({ item }) => <PrayerDayCard day={item} onToggle={onToggle} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

import { View } from 'react-native';

import { PrayerCardHeader } from './components/PrayerCardHeader';
import { PrayerTimes } from './components/PrayerTimes';
import { usePrayerCard } from './hooks/PrayerCard.hooks';
import { styles } from './PrayerCard.styles';
import type { PrayerCardProps } from './PrayerCard.types';

export function PrayerCard(props: PrayerCardProps) {
  const card = usePrayerCard(props);

  return (
    <View style={[styles.card, card.isActive && styles.cardActive, card.isNext && styles.cardNext]}>
      {card.isActive && <View style={styles.activeIndicator} />}
      <PrayerCardHeader {...card} />
      <PrayerTimes {...card} />
    </View>
  );
}

import { View } from 'react-native';

import { JummahCardHeader } from './components/JummahCardHeader';
import { JummahServiceList } from './components/JummahServiceList';
import { useJummahCard } from './hooks/JummahCard.hooks';
import { styles } from './JummahCard.styles';
import type { JummahCardProps } from './JummahCard.types';

export function JummahCard({ isNext, times }: JummahCardProps) {
  const card = useJummahCard(times);

  return (
    <View style={[styles.card, isNext && styles.cardNext]}>
      <JummahCardHeader fridayLabel={card.fridayLabel} title={card.title} />
      <JummahServiceList services={card.services} />
    </View>
  );
}

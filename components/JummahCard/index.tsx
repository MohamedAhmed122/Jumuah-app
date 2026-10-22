import { View } from 'react-native';

import { useThemedStyles } from '@src/hooks/useTheme';
import { JummahCardHeader } from './components/JummahCardHeader';
import { JummahServiceList } from './components/JummahServiceList';
import { useJummahCard } from './hooks/JummahCard.hooks';
import { themedStyles } from './JummahCard.styles';
import type { JummahCardProps } from './JummahCard.types';

export function JummahCard({ isNext, times }: JummahCardProps) {
  const styles = useThemedStyles(themedStyles);
  const card = useJummahCard(times);

  return (
    <View style={[styles.card, isNext && styles.cardNext]}>
      <JummahCardHeader fridayLabel={card.fridayLabel} title={card.title} />
      <JummahServiceList services={card.services} />
    </View>
  );
}

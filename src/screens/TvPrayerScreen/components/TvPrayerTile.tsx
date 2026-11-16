import { Text, View } from 'react-native';
import { useThemedStyles } from '@src/hooks/useTheme';
import type { TvCardView } from '../TvPrayerScreen.types';
import { themedStyles } from './TvPrayerTile.styles';

interface Props {
  card: TvCardView;
}

export function TvPrayerTile({ card }: Props) {
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={[styles.card, card.isNext && styles.cardNext, card.isPassed && styles.cardPassed]}>
      <Text style={[styles.name, card.isNext && styles.nameNext]} numberOfLines={1}>{card.name}</Text>
      <View style={styles.group}>
        <Text style={styles.label} numberOfLines={1}>{card.primaryLabel}</Text>
        <Text style={styles.primary} numberOfLines={1} adjustsFontSizeToFit>{card.primaryTime}</Text>
      </View>
      {card.secondaryLabel ? (
        <View style={styles.secondaryGroup}>
          <Text style={styles.label} numberOfLines={1}>{card.secondaryLabel}</Text>
          <Text style={styles.secondary} numberOfLines={1} adjustsFontSizeToFit>{card.secondaryTime}</Text>
        </View>
      ) : null}
    </View>
  );
}

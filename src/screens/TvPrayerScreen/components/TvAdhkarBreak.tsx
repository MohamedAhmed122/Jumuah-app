import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { TFunction } from 'i18next';
import { Text, View } from 'react-native';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import type { TvAdhkarBreakView } from '../TvPrayerScreen.adhkar.types';
import { themedStyles } from './TvAdhkarBreak.styles';
import { TvTimedFill } from './TvTimedFill';

interface Props {
  view: TvAdhkarBreakView;
  t: TFunction;
}

export function TvAdhkarBreak({ view, t }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();

  return (
    <View style={styles.screen}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name="check" size={112} color={colors.onAccent} />
      </View>
      <Text style={styles.title}>{t('tv.adhkar_complete')}</Text>
      <Text style={styles.round}>{view.roundLabel}</Text>
      <Text style={styles.again}>{t('tv.starting_again_in')}</Text>
      <Text style={styles.countdown}>{view.secondsLeft}</Text>
      <View style={styles.track}>
        <TvTimedFill remainingMs={view.remainingMs} style={styles.fill} />
      </View>
    </View>
  );
}

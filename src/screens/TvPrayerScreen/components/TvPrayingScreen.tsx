import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { TFunction } from 'i18next';
import { Text, View } from 'react-native';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import type { TvPrayingView } from '../TvPrayerScreen.adhkar.types';
import type { TvHeaderView } from '../TvPrayerScreen.types';
import { TvMosqueClockHeader } from './TvMosqueClockHeader';
import { themedStyles } from './TvPrayingScreen.styles';
import { percentWidth } from './TvProgress.styles';
import { TvSilenceBanner } from './TvSilenceBanner';

interface Props {
  praying: TvPrayingView;
  header: TvHeaderView;
  t: TFunction;
}

export function TvPrayingScreen({ praying, header, t }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();

  return (
    <View style={styles.screen}>
      <TvMosqueClockHeader header={header} />
      <View style={styles.center}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name="mosque" size={112} color={colors.accent} />
        </View>
        <Text style={styles.name}>{praying.prayerName}</Text>
        <Text style={styles.status}>{t('tv.prayer_in_progress')}</Text>
        <Text style={styles.begins}>{`${t('tv.adhkar_begins_in')} ${praying.countdown}`}</Text>
        <View style={styles.track}>
          <View style={[styles.bar, percentWidth(praying.percentElapsed)]} />
        </View>
      </View>
      <TvSilenceBanner t={t} />
    </View>
  );
}

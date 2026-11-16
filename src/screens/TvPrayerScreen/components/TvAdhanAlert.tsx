import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { TFunction } from 'i18next';
import { Text, View } from 'react-native';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import type { TvAlertView } from '../TvPrayerScreen.types';
import { themedStyles } from './TvAlert.styles';
import { TvPulseRing } from './TvPulseRing';
import { TvTimedFill } from './TvTimedFill';

interface Props {
  alert: TvAlertView;
  t: TFunction;
}

export function TvAdhanAlert({ alert, t }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();

  return (
    <View style={styles.adhanScreen} accessibilityRole="alert">
      <View style={styles.pulse}>
        <TvPulseRing durationMs={1600} style={styles.adhanRing} />
        <TvPulseRing durationMs={1600} delayMs={800} style={styles.adhanRing} />
        <View style={styles.adhanCircle}>
          <MaterialCommunityIcons name="volume-high" size={110} color={colors.accent} />
        </View>
      </View>
      <Text style={[styles.arabic, styles.adhanText]}>الأذان</Text>
      <Text style={[styles.headline, styles.adhanText]}>{t('tv.time_for_adhan')}</Text>
      <Text style={[styles.detail, styles.adhanText]}>{`${alert.name} · ${alert.adhanTime}`}</Text>
      <View style={styles.adhanTrack}>
        <TvTimedFill remainingMs={alert.remainingMs} style={styles.adhanFill} />
      </View>
    </View>
  );
}

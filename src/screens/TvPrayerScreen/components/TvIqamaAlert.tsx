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

export function TvIqamaAlert({ alert, t }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();

  return (
    <View style={styles.iqamaScreen} accessibilityRole="alert">
      <View style={styles.pulse}>
        <TvPulseRing durationMs={1200} style={styles.iqamaRing} />
        <View style={styles.iqamaCircle}>
          <MaterialCommunityIcons name="mosque" size={112} color={colors.inverseAlertBackground} />
        </View>
      </View>
      <Text style={[styles.arabic, styles.iqamaArabic]}>الإقامة</Text>
      <Text style={[styles.headline, styles.iqamaText]}>{t('tv.time_for_iqama')}</Text>
      <Text style={[styles.stand, styles.iqamaText]}>{t('tv.stand_for_prayer')}</Text>
      <View style={styles.silence}>
        <MaterialCommunityIcons name="cellphone-off" size={48} color={colors.inverseAlertText} />
        <Text style={[styles.silenceText, styles.iqamaText]}>{t('tv.silence_phones')}</Text>
      </View>
      <View style={styles.iqamaTrack}>
        <TvTimedFill remainingMs={alert.remainingMs} style={styles.iqamaFill} />
      </View>
    </View>
  );
}

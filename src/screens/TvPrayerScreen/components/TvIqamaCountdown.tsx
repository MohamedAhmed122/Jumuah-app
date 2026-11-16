import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { TFunction } from 'i18next';
import { Text, View } from 'react-native';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import type { TvAlertView, TvHeaderView } from '../TvPrayerScreen.types';
import { themedStyles } from './TvIqamaCountdown.styles';
import { percentWidth } from './TvProgress.styles';

interface Props {
  alert: TvAlertView;
  header: TvHeaderView;
  t: TFunction;
}

export function TvIqamaCountdown({ alert, header, t }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.mosque} numberOfLines={1}>{header.mosqueLine}</Text>
        <View style={styles.clockRow}>
          <Text style={styles.clock}>{header.clock}</Text>
          <Text style={styles.clockSeconds}>{header.seconds}</Text>
        </View>
      </View>
      <View style={styles.center}>
        <Text style={styles.prayerLine}>{`${alert.name} · ${t('tv.adhan')} ${alert.adhanTime}`}</Text>
        <Text style={styles.iqamaIn}>{t('tv.iqama_in')}</Text>
        <Text style={styles.countdown}>{alert.countdown}</Text>
        <View style={styles.track}>
          <View style={[styles.bar, percentWidth(alert.percentRemaining)]} />
        </View>
        <Text style={styles.iqamaTime}>{`${t('tv.iqama')} ${alert.iqamaTime}`}</Text>
      </View>
      <View style={styles.banner}>
        <MaterialCommunityIcons name="cellphone-off" size={52} color={colors.accent} />
        <Text style={styles.bannerText}>{t('tv.silence_phones')}</Text>
      </View>
    </View>
  );
}

import type { TFunction } from 'i18next';
import { Text, View } from 'react-native';
import { useThemedStyles } from '@src/hooks/useTheme';
import type { TvAlertView, TvHeaderView } from '../TvPrayerScreen.types';
import { themedStyles } from './TvIqamaCountdown.styles';
import { TvMosqueClockHeader } from './TvMosqueClockHeader';
import { percentWidth } from './TvProgress.styles';
import { TvSilenceBanner } from './TvSilenceBanner';

interface Props {
  alert: TvAlertView;
  header: TvHeaderView;
  t: TFunction;
}

export function TvIqamaCountdown({ alert, header, t }: Props) {
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={styles.screen}>
      <TvMosqueClockHeader header={header} />
      <View style={styles.center}>
        <Text style={styles.prayerLine}>{`${alert.name} · ${t('tv.adhan')} ${alert.adhanTime}`}</Text>
        <Text style={styles.iqamaIn}>{t('tv.iqama_in')}</Text>
        <Text style={styles.countdown}>{alert.countdown}</Text>
        <View style={styles.track}>
          <View style={[styles.bar, percentWidth(alert.percentRemaining)]} />
        </View>
        <Text style={styles.iqamaTime}>{`${t('tv.iqama')} ${alert.iqamaTime}`}</Text>
      </View>
      <TvSilenceBanner t={t} />
    </View>
  );
}

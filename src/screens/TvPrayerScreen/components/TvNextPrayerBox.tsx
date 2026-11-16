import type { TFunction } from 'i18next';
import { Text, View } from 'react-native';
import { useThemedStyles } from '@src/hooks/useTheme';
import type { TvNextView } from '../TvPrayerScreen.types';
import { themedStyles } from './TvNextPrayerBox.styles';

interface Props {
  next: TvNextView;
  t: TFunction;
}

export function TvNextPrayerBox({ next, t }: Props) {
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={styles.box}>
      <View style={styles.stack}>
        <Text style={styles.label}>{t('tv.next_prayer')}</Text>
        <View style={styles.row}>
          <Text style={styles.name}>{next.name}</Text>
          <Text style={styles.time}>{next.adhanTime}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.stack}>
        <Text style={styles.label}>{t('tv.in')}</Text>
        <Text style={styles.countdown}>{next.countdown}</Text>
      </View>
    </View>
  );
}

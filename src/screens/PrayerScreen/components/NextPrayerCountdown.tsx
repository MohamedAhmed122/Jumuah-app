import { Text, View } from 'react-native';
import type { TFunction } from 'i18next';
import type { ScheduledPrayer } from '../PrayerScreen.types';
import { styles } from './NextPrayerCountdown.styles';

interface Props { prayer: ScheduledPrayer | null; countdown: string; t: TFunction }

export function NextPrayerCountdown({ prayer, countdown, t }: Props) {
  if (!prayer) return null;
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{t('prayer.next_prayer')}</Text>
      <Text style={styles.prayer}>{t(`prayer.${prayer.name}`)}</Text>
      <Text style={styles.timer}>{countdown}</Text>
    </View>
  );
}

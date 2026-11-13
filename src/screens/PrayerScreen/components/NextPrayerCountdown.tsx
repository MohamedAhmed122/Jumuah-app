import { Text, View } from 'react-native';
import type { TFunction } from 'i18next';
import { useThemedStyles } from '@src/hooks/useTheme';
import type { ScheduledPrayer } from '../PrayerScreen.types';
import { themedStyles } from './NextPrayerCountdown.styles';

interface Props { prayer: ScheduledPrayer | null; countdown: string; t: TFunction }

export function NextPrayerCountdown({ prayer, countdown, t }: Props) {
  const styles = useThemedStyles(themedStyles);
  if (!prayer) return null;
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{t('prayer.next_prayer')}</Text>
      <Text style={styles.prayer}>{t(`prayer.${prayer.name}`)}</Text>
      <Text style={styles.timer}>{countdown}</Text>
    </View>
  );
}

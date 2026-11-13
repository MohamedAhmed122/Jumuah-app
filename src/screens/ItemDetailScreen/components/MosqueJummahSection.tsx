import { Text, View } from 'react-native';
import type { TFunction } from 'i18next';
import type { Mosque } from '@src/api/locations';
import { useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './MosqueJummahSection.styles';

interface Props { mosque: Mosque | null; t: TFunction }

export function MosqueJummahSection({ mosque, t }: Props) {
  const styles = useThemedStyles(themedStyles);
  if (!mosque || (!mosque.jumuahTimes?.first && !mosque.jumuahTimes?.second)) return null;
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{t('map.jumuah_first')}</Text>
      <View style={styles.row}>
        {!!mosque.jumuahTimes?.first && (
          <JummahTime label={t('map.jumuah_first')} time={mosque.jumuahTimes.first} />
        )}
        {!!mosque.jumuahTimes?.second && (
          <JummahTime label={t('map.jumuah_second')} time={mosque.jumuahTimes.second} />
        )}
      </View>
    </View>
  );
}

function JummahTime({ label, time }: { label: string; time: string }) {
  const styles = useThemedStyles(themedStyles);
  return (
    <View style={styles.pill}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
}

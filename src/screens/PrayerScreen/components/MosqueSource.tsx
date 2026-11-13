import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import type { TFunction } from 'i18next';
import type { Mosque } from '@src/api/locations';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import type { PrayerSource } from '../PrayerScreen.types';
import { themedStyles } from './MosqueSource.styles';

interface Props { mosque: Mosque | null; source: PrayerSource; t: TFunction }

export function MosqueSource({ mosque, source, t }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  if (!mosque) return null;
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="mosque" size={17} color={colors.accent} />
      <View style={styles.text}>
        <Text style={styles.name}>{mosque.name}</Text>
        <Text style={styles.detail}>{t(source === 'mosque' ? 'prayer.source_mosque' : 'prayer.source_calculated')}</Text>
      </View>
    </View>
  );
}

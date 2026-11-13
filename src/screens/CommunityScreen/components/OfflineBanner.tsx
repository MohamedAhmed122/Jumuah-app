import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import type { TFunction } from 'i18next';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './OfflineBanner.styles';

export function OfflineBanner({ visible, t }: { visible: boolean; t: TFunction }) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  if (!visible) return null;
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="wifi-off" size={14} color={colors.textSecondary} />
      <Text style={styles.text}>{t('community.cached_notice')}</Text>
    </View>
  );
}

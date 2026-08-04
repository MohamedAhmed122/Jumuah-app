import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import { styles } from './OfflineBanner.styles';

export function OfflineBanner({ visible, t }: { visible: boolean; t: TFunction }) {
  if (!visible) return null;
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="wifi-off" size={14} color={Colors.textSecondary} />
      <Text style={styles.text}>{t('community.cached_notice')}</Text>
    </View>
  );
}

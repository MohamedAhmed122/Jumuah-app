import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import type { DetailIconName } from '../ItemDetailScreen.types';
import { themedStyles } from './InfoGrid.styles';

interface Props { icon: DetailIconName; label: string }

export function InfoRow({ icon, label }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  return (
    <View style={styles.row}>
      <MaterialCommunityIcons name={icon} size={18} color={colors.accent} />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

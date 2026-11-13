import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import type { TFunction } from 'i18next';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './DirectionsButton.styles';

interface Props { onPress: () => void; t: TFunction }

export function DirectionsButton({ onPress, t }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <MaterialCommunityIcons name="navigation-variant" size={18} color={colors.onAccent} />
        <Text style={styles.text}>{t('map.directions')}</Text>
      </TouchableOpacity>
    </View>
  );
}

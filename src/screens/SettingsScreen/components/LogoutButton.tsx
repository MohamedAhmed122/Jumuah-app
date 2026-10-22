import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity } from 'react-native';
import type { TFunction } from 'i18next';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './LogoutButton.styles';

interface Props { onPress: () => void; t: TFunction }

export function LogoutButton({ onPress, t }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.85}>
      <MaterialCommunityIcons name="delete-outline" size={20} color={colors.error} />
      <Text style={styles.text}>{t('settings.reset_application')}</Text>
    </TouchableOpacity>
  );
}

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import { styles } from './LogoutButton.styles';

interface Props { onPress: () => void; t: TFunction }

export function LogoutButton({ onPress, t }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.85}>
      <MaterialCommunityIcons name="delete-outline" size={20} color={Colors.error} />
      <Text style={styles.text}>{t('settings.reset_application')}</Text>
    </TouchableOpacity>
  );
}

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import { styles } from './AnnouncementState.styles';

interface Props { type: 'loading' | 'error'; onBack: () => void; t: TFunction }

export function AnnouncementState({ type, onBack, t }: Props) {
  if (type === 'loading') {
    return <View style={styles.centered}><ActivityIndicator color={Colors.accent} size="large" /></View>;
  }
  return (
    <View style={styles.centered}>
      <MaterialCommunityIcons name="wifi-off" size={44} color={Colors.textSecondary} />
      <Text style={styles.error}>{t('errors.network')}</Text>
      <TouchableOpacity style={styles.button} onPress={onBack}>
        <Text style={styles.buttonText}>← {t('community.announcements')}</Text>
      </TouchableOpacity>
    </View>
  );
}

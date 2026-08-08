import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import { createInsetStyle, styles } from './DetailState.styles';

interface Props { type: 'loading' | 'error'; topInset: number; onBack: () => void; t: TFunction }

export function DetailState({ type, topInset, onBack, t }: Props) {
  if (type === 'loading') {
    return <View style={[styles.centered, createInsetStyle(topInset)]}><ActivityIndicator color={Colors.accent} size="large" /></View>;
  }
  return (
    <View style={[styles.centered, createInsetStyle(topInset)]}>
      <MaterialCommunityIcons name="map-marker-alert-outline" size={44} color={Colors.textSecondary} />
      <Text style={styles.error}>{t('errors.api_failed')}</Text>
      <TouchableOpacity style={styles.button} onPress={onBack}>
        <Text style={styles.buttonText}>{t('errors.retry')}</Text>
      </TouchableOpacity>
    </View>
  );
}

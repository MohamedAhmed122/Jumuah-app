import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import { styles } from './StatsHeader.styles';

interface Props { onBack: () => void; t: TFunction }

export function StatsHeader({ onBack, t }: Props) {
  return (
    <>
      <TouchableOpacity onPress={onBack} style={styles.back}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.title}>{t('tracker.history')}</Text>
    </>
  );
}

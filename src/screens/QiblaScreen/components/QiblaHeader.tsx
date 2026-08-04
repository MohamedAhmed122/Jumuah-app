import { Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '@constants/Colors';

import { styles } from './QiblaHeader.styles';

interface QiblaHeaderProps {
  onBack: () => void;
}

export function QiblaHeader({ onBack }: QiblaHeaderProps) {
  return (
    <>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.title}>Qibla</Text>
    </>
  );
}

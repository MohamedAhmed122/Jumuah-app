import { Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '@constants/Colors';

import { styles } from './QadaHeader.styles';

interface QadaHeaderProps {
  onBack: () => void;
  title: string;
}

export function QadaHeader({ onBack, title }: QadaHeaderProps) {
  return (
    <>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </>
  );
}

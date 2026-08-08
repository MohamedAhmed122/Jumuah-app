import { Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '@constants/Colors';

import { styles } from './TrackerHeader.styles';

interface TrackerHeaderProps {
  onBack: () => void;
  title: string;
}

export function TrackerHeader({ onBack, title }: TrackerHeaderProps) {
  return (
    <>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </>
  );
}

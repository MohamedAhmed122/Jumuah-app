import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '@constants/Colors';

import { styles } from './JummahCardHeader.styles';

interface JummahCardHeaderProps {
  fridayLabel: string;
  title: string;
}

export function JummahCardHeader({ fridayLabel, title }: JummahCardHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.titleRow}>
        <MaterialCommunityIcons name="mosque" size={20} color={Colors.accent} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.fridayLabel}>{fridayLabel}</Text>
    </View>
  );
}

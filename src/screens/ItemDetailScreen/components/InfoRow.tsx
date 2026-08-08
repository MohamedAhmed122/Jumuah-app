import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { Colors } from '@constants/Colors';
import type { DetailIconName } from '../ItemDetailScreen.types';
import { styles } from './InfoGrid.styles';

interface Props { icon: DetailIconName; label: string }

export function InfoRow({ icon, label }: Props) {
  return (
    <View style={styles.row}>
      <MaterialCommunityIcons name={icon} size={18} color={Colors.accent} />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

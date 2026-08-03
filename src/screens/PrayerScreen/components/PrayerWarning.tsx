import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '@constants/Colors';
import { styles } from './PrayerWarning.styles';

interface Props { title: string; body: string; visible: boolean; onDismiss: () => void }

export function PrayerWarning({ title, body, visible, onDismiss }: Props) {
  if (!visible) return null;
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
      <TouchableOpacity onPress={onDismiss} hitSlop={12}>
        <MaterialCommunityIcons name="close" size={18} color={Colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}

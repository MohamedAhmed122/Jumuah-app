import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '@constants/Colors';
import { styles } from './PrivacyHeader.styles';

interface Props { title: string; subtitle: string; onBack: () => void }

export function PrivacyHeader({ title, subtitle, onBack }: Props) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.textPrimary} />
      </TouchableOpacity>
      <MaterialCommunityIcons name="shield-check-outline" size={32} color={Colors.accent} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

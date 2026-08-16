import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { Colors } from '@constants/Colors';
import { styles } from './CommunityAgendaHeader.styles';

export function CommunityAgendaHeader({ onBack }: { onBack: () => void }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={onBack} hitSlop={8}>
        <MaterialCommunityIcons name="arrow-left" size={20} color={Colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
}

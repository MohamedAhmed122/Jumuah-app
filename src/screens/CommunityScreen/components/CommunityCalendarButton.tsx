import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Colors } from '@constants/Colors';
import { styles } from './CommunityCalendarButton.styles';

interface Props { label: string; onPress: () => void }

export function CommunityCalendarButton({ label, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.86} accessibilityLabel={label}>
      <MaterialCommunityIcons name="calendar-month" size={27} color={Colors.background} />
    </TouchableOpacity>
  );
}

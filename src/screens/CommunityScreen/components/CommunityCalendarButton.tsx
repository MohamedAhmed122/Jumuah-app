import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './CommunityCalendarButton.styles';

interface Props { label: string; onPress: () => void }

export function CommunityCalendarButton({ label, onPress }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.86} accessibilityLabel={label}>
      <MaterialCommunityIcons name="calendar-month" size={27} color={colors.onAccent} />
    </TouchableOpacity>
  );
}

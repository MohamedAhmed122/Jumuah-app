import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './CommunityAgendaHeader.styles';

export function CommunityAgendaHeader({ onBack }: { onBack: () => void }) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={onBack} hitSlop={8}>
        <MaterialCommunityIcons name="arrow-left" size={20} color={colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
}

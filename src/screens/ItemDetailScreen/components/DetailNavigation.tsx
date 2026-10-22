import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './DetailNavigation.styles';

interface Props { onBack: () => void; onShare: () => void }

export function DetailNavigation({ onBack, onShare }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onBack}>
        <MaterialCommunityIcons name="arrow-left" size={22} color={colors.textPrimary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onShare}>
        <MaterialCommunityIcons name="share-variant" size={20} color={colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
}

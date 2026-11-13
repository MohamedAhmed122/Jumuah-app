import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './PrayerWarning.styles';

interface Props { title: string; body: string; visible: boolean; onDismiss: () => void }

export function PrayerWarning({ title, body, visible, onDismiss }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  if (!visible) return null;
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
      <TouchableOpacity onPress={onDismiss} hitSlop={12}>
        <MaterialCommunityIcons name="close" size={18} color={colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}

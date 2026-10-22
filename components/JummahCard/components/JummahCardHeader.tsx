import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './JummahCardHeader.styles';

interface JummahCardHeaderProps {
  fridayLabel: string;
  title: string;
}

export function JummahCardHeader({ fridayLabel, title }: JummahCardHeaderProps) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  return (
    <View style={styles.header}>
      <View style={styles.titleRow}>
        <MaterialCommunityIcons name="mosque" size={20} color={colors.accent} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.fridayLabel}>{fridayLabel}</Text>
    </View>
  );
}

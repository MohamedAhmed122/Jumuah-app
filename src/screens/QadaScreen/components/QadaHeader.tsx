import { Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './QadaHeader.styles';

interface QadaHeaderProps {
  onBack: () => void;
  title: string;
}

export function QadaHeader({ onBack, title }: QadaHeaderProps) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  return (
    <>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </>
  );
}

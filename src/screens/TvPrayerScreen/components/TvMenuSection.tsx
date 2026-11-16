import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps, ReactNode } from 'react';
import { Text, View } from 'react-native';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './TvMenuSection.styles';

interface Props {
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  title: string;
  children: ReactNode;
  disabled?: boolean;
  half?: boolean;
}

export function TvMenuSection({ icon, title, children, disabled = false, half = false }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();

  return (
    <View style={[styles.section, half && styles.half, disabled && styles.disabled]}>
      <View style={styles.heading}>
        <MaterialCommunityIcons name={icon} size={28} color={colors.textSecondary} />
        <Text style={styles.headingText}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

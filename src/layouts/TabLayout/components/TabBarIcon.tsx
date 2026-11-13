import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';

import { useThemedStyles } from '@src/hooks/useTheme';

import type { TabIconName } from '../TabLayout.types';
import { themedStyles } from './TabBarIcon.styles';

interface TabBarIconProps {
  color: string;
  focused: boolean;
  icon: TabIconName;
  size: number;
}

export function TabBarIcon({ color, focused, icon, size }: TabBarIconProps) {
  const styles = useThemedStyles(themedStyles);
  return (
    <View style={[styles.pill, focused && styles.pillFocused]}>
      <MaterialCommunityIcons name={icon} color={color} size={size} />
    </View>
  );
}

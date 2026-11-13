import { Text } from 'react-native';

import { useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from '../TabLayout.styles';

interface TabBarLabelProps {
  focused: boolean;
  label: string;
}

export function TabBarLabel({ focused, label }: TabBarLabelProps) {
  const styles = useThemedStyles(themedStyles);
  return (
    <Text style={focused ? styles.activeLabel : styles.inactiveLabel}>
      {label}
    </Text>
  );
}

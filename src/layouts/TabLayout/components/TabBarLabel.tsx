import { Text } from 'react-native';

import { styles } from '../TabLayout.styles';

interface TabBarLabelProps {
  focused: boolean;
  label: string;
}

export function TabBarLabel({ focused, label }: TabBarLabelProps) {
  return (
    <Text style={focused ? styles.activeLabel : styles.inactiveLabel}>
      {label}
    </Text>
  );
}

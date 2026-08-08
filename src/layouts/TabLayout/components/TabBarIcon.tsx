import { MaterialCommunityIcons } from '@expo/vector-icons';

import type { TabIconName } from '../TabLayout.types';

interface TabBarIconProps {
  color: string;
  icon: TabIconName;
  size: number;
}

export function TabBarIcon({ color, icon, size }: TabBarIconProps) {
  return <MaterialCommunityIcons name={icon} color={color} size={size} />;
}

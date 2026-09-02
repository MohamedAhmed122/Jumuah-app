import type { TabViewModel } from '../TabLayout.types';
import { TabBarIcon } from './TabBarIcon';
import { TabBarLabel } from './TabBarLabel';

export function createTabScreenOptions(tab: TabViewModel) {
  return {
    href: tab.visible ? undefined : null,
    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
      <TabBarIcon color={color} icon={tab.icon} size={size} />
    ),
    tabBarLabel: ({ focused }: { focused: boolean }) => (
      <TabBarLabel focused={focused} label={tab.label} />
    ),
  };
}

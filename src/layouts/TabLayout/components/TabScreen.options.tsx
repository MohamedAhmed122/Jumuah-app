import type { TabViewModel } from '../TabLayout.types';
import { TabBarIcon } from './TabBarIcon';
import { TabBarLabel } from './TabBarLabel';

export function createTabScreenOptions(tab: TabViewModel) {
  return {
    href: tab.visible ? undefined : null,
    tabBarIcon: ({ color, focused, size }: { color: string; focused: boolean; size: number }) => (
      <TabBarIcon color={color} focused={focused} icon={tab.icon} size={size} />
    ),
    tabBarLabel: ({ focused }: { focused: boolean }) => (
      <TabBarLabel focused={focused} label={tab.label} />
    ),
  };
}

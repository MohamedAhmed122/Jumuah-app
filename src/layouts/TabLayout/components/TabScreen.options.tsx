import type { TabViewModel } from '../TabLayout.types';
import { TabBarIcon } from './TabBarIcon';

export function createTabScreenOptions(tab: TabViewModel) {
  return {
    href: tab.visible ? undefined : null,
    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
      <TabBarIcon color={color} icon={tab.icon} size={size} />
    ),
    tabBarLabel: tab.label,
  };
}

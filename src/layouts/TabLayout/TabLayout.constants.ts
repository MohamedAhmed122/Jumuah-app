import { Colors } from '@constants/Colors';

import type { TabDefinition } from './TabLayout.types';
import { styles } from './TabLayout.styles';

export const TAB_DEFINITIONS: TabDefinition[] = [
  { icon: 'mosque', labelKey: 'map.tab_prayer', route: 'index' },
  { icon: 'store', labelKey: 'map.tab_map', route: 'map/index' },
  { icon: 'account-group', labelKey: 'map.tab_community', route: 'community' },
  { icon: 'cog', labelKey: 'map.tab_settings', route: 'settings' },
];

export const HIDDEN_TAB_OPTIONS = { href: null };

export const TAB_SCREEN_OPTIONS = {
  headerShown: false,
  tabBarActiveTintColor: Colors.accent,
  tabBarInactiveTintColor: Colors.textSecondary,
  tabBarStyle: styles.tabBar,
};

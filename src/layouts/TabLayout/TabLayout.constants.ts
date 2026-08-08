import { Colors } from '@constants/Colors';

import type { TabDefinition } from './TabLayout.types';
import { styles } from './TabLayout.styles';

export const TAB_DEFINITIONS: TabDefinition[] = [
  { icon: 'mosque', labelKey: 'map.tab_prayer', route: 'index' },
  { icon: 'storefront-outline', labelKey: 'map.tab_map', route: 'map' },
  { icon: 'account-group', labelKey: 'map.tab_community', route: 'community' },
  { icon: 'help-circle', labelKey: 'map.tab_quiz', route: 'quiz' },
  { icon: 'cog', labelKey: 'map.tab_settings', route: 'settings' },
];

export const TAB_SCREEN_OPTIONS = {
  headerShown: false,
  tabBarActiveTintColor: Colors.accent,
  tabBarInactiveTintColor: Colors.textSecondary,
  tabBarLabelStyle: styles.label,
  tabBarStyle: styles.tabBar,
};

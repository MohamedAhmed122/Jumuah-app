import type { ComponentProps } from 'react';
import type { MaterialCommunityIcons } from '@expo/vector-icons';

export type TabIconName = ComponentProps<typeof MaterialCommunityIcons>['name'];
export type TabRouteName = 'index' | 'map/index' | 'community' | 'settings';

export interface TabDefinition {
  icon: TabIconName;
  labelKey: string;
  route: TabRouteName;
}

export interface TabViewModel {
  icon: TabIconName;
  label: string;
  route: TabRouteName;
  visible: boolean;
}

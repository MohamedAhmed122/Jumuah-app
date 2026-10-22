import { useTranslation } from 'react-i18next';

import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { useSettingsStore } from '@src/stores/settingsStore';

import { TAB_DEFINITIONS } from '../TabLayout.constants';
import { themedStyles } from '../TabLayout.styles';
import type { TabViewModel } from '../TabLayout.types';

export function useTabLayout() {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const styles = useThemedStyles(themedStyles);
  const visibility = useSettingsStore((state) => state.appVisibility);

  const tabs: TabViewModel[] = TAB_DEFINITIONS.map((tab) => ({
    icon: tab.icon,
    label: t(tab.labelKey),
    route: tab.route,
    visible: tab.route === 'map/index'
      ? visibility.halalPlaces
      : tab.route === 'community' ? visibility.community : true,
  }));

  const screenOptions = {
    headerShown: false,
    tabBarActiveTintColor: colors.accent,
    tabBarInactiveTintColor: colors.textSecondary,
    tabBarStyle: styles.tabBar,
  };

  return { screenOptions, tabs };
}

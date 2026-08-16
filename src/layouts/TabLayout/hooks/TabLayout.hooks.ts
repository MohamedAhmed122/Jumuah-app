import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '@src/stores/settingsStore';

import { TAB_DEFINITIONS } from '../TabLayout.constants';
import type { TabViewModel } from '../TabLayout.types';

export function useTabLayout(): TabViewModel[] {
  const { t } = useTranslation();
  const visibility = useSettingsStore((state) => state.appVisibility);

  return TAB_DEFINITIONS.map((tab) => ({
    icon: tab.icon,
    label: t(tab.labelKey),
    route: tab.route,
    visible: tab.route === 'map/index'
      ? visibility.halalPlaces
      : tab.route === 'community' ? visibility.community : true,
  }));
}

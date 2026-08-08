import { useTranslation } from 'react-i18next';

import { TAB_DEFINITIONS } from '../TabLayout.constants';
import type { TabViewModel } from '../TabLayout.types';

export function useTabLayout(): TabViewModel[] {
  const { t } = useTranslation();

  return TAB_DEFINITIONS.map((tab) => ({
    icon: tab.icon,
    label: t(tab.labelKey),
    route: tab.route,
  }));
}

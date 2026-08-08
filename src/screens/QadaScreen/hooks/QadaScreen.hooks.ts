import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PRAYER_NAMES } from '@constants/prayerMethods';

import { createSafeAreaStyle } from '../QadaScreen.styles';
import type { QadaScreenViewModel } from '../QadaScreen.types';
import { getQadaTotal } from '../QadaScreen.utils';
import { useQadaCounters } from './useQadaCounters';

export function useQadaScreen(): QadaScreenViewModel {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { adjust, counts } = useQadaCounters();
  const total = getQadaTotal(counts);

  return {
    onBack: () => router.back(),
    prayers: PRAYER_NAMES.map((prayer) => ({
      count: counts[prayer],
      decrementDisabled: counts[prayer] === 0,
      label: t(`prayer.${prayer}`),
      onDecrement: () => { void adjust(prayer, -1); },
      onIncrement: () => { void adjust(prayer, 1); },
      outstandingLabel: t('qada.outstanding', { count: counts[prayer] }),
      prayer,
    })),
    rootStyle: createSafeAreaStyle(insets.top),
    title: t('qada.title'),
    total,
    totalLabel: t('qada.total', { count: total }),
  };
}

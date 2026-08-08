import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useSettingsStore } from '@src/stores/settingsStore';

import { createSafeAreaStyle } from '../TrackerScreen.styles';
import type { TrackerScreenViewModel } from '../TrackerScreen.types';
import { createDayViewModel } from '../TrackerScreen.utils';
import { usePrayerHistory } from './usePrayerHistory';
import { usePrayerLogToggle } from './usePrayerLogToggle';

export function useTrackerScreen(): TrackerScreenViewModel {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const coordinates = useSettingsStore((state) => state.userCoordinates);
  const { history, refresh } = usePrayerHistory(coordinates);
  const togglePrayer = usePrayerLogToggle(coordinates, refresh);
  const now = new Date();

  return {
    days: history.map((day) => createDayViewModel(day, coordinates, now, t)),
    onBack: () => router.back(),
    onToggle: (date, prayer, status) => { void togglePrayer(date, prayer, status); },
    rootStyle: createSafeAreaStyle(insets.top),
    title: t('tracker.title'),
  };
}

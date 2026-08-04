import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePrayerStats } from './usePrayerStats';

export function useStatsScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const statistics = usePrayerStats();
  return { t, insets, statistics, goBack: router.back };
}

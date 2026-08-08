import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCommunityFeed } from './useCommunityFeed';
import { useCommunityNavigation } from './useCommunityNavigation';

export function useCommunityScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const feed = useCommunityFeed();
  const navigation = useCommunityNavigation();
  return { t, insets, feed, navigation };
}

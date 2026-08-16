import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCommunityFeed } from './useCommunityFeed';
import { useCommunityMosques } from './useCommunityMosques';
import { useCommunityNavigation } from './useCommunityNavigation';

export function useCommunityScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'announcements' | 'events'>('announcements');
  const [filterVisible, setFilterVisible] = useState(false);
  const mosques = useCommunityMosques();
  const feed = useCommunityFeed(mosques.selectedIds);
  const navigation = useCommunityNavigation();
  return {
    t, insets, feed, mosques, navigation, activeTab, setActiveTab,
    filterVisible, openFilter: () => setFilterVisible(true), closeFilter: () => setFilterVisible(false),
  };
}
import { useState } from 'react';

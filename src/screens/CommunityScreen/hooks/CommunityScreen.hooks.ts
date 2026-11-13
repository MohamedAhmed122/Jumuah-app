import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSettingsStore } from '@src/stores/settingsStore';
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
  const visibility = useSettingsStore((state) => state.appVisibility);
  useEffect(() => {
    if (activeTab === 'announcements' && !visibility.announcements && visibility.events) setActiveTab('events');
    if (activeTab === 'events' && !visibility.events && visibility.announcements) setActiveTab('announcements');
  }, [activeTab, visibility.announcements, visibility.events]);
  return {
    t, insets, feed, mosques, navigation, visibility, activeTab, setActiveTab,
    filterVisible, openFilter: () => setFilterVisible(true), closeFilter: () => setFilterVisible(false),
  };
}

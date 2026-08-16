import { View } from 'react-native';
import { AnnouncementList } from './components/AnnouncementList';
import { CommunityHeader } from './components/CommunityHeader';
import { CommunityState } from './components/CommunityState';
import { CommunityToolbar } from './components/CommunityToolbar';
import { EventList } from './components/EventList';
import { MosqueFilterModal } from './components/MosqueFilterModal';
import { OfflineBanner } from './components/OfflineBanner';
import { eventMosqueId } from './CommunityScreen.utils';
import { useCommunityScreen } from './hooks/CommunityScreen.hooks';
import { createTopInset, styles } from './CommunityScreen.styles';

export default function CommunityScreen() {
  const screen = useCommunityScreen();
  const { t, insets, feed, mosques, navigation } = screen;
  const names = Object.fromEntries(mosques.cityMosques.map((mosque) => [mosque.id, mosque.name]));
  return (
    <View style={[styles.container, createTopInset(insets.top)]}>
      <CommunityHeader city={mosques.city} t={t} />
      <CommunityToolbar activeTab={screen.activeTab} mosqueCount={mosques.selectedIds.length} onTabChange={screen.setActiveTab} onFilter={screen.openFilter} t={t} />
      <OfflineBanner visible={feed.fromCache} t={t} />
      {mosques.loading || feed.loading ? <CommunityState type="loading" t={t} /> : !mosques.cityMosques.length ? <CommunityState type="mosque" onAction={navigation.openSettings} t={t} /> : (screen.activeTab === 'announcements' ? feed.announcementError : feed.eventError) ? <CommunityState type="error" onAction={feed.retry} t={t} /> : screen.activeTab === 'announcements' ? (
        <AnnouncementList announcements={feed.announcements} mosqueNames={names} mosqueName="" refreshing={feed.refreshing} onRefresh={feed.refresh} onOpen={(item) => navigation.openAnnouncement(item.id, eventMosqueId(item, mosques.selectedIds), mosques.selectedIds)} t={t} />
      ) : (
        <EventList events={feed.events} mosqueNames={names} refreshing={feed.refreshing} onRefresh={feed.refresh} onOpen={(item) => navigation.openEvent(item.id, eventMosqueId(item, mosques.selectedIds))} t={t} />
      )}
      <MosqueFilterModal visible={screen.filterVisible} city={mosques.city} mosques={mosques.cityMosques} selectedIds={mosques.selectedIds} onToggle={mosques.toggleMosque} onClose={screen.closeFilter} t={t} />
    </View>
  );
}

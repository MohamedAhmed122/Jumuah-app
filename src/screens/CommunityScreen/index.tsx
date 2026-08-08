import { View } from 'react-native';
import { AnnouncementList } from './components/AnnouncementList';
import { CommunityHeader } from './components/CommunityHeader';
import { CommunityState } from './components/CommunityState';
import { OfflineBanner } from './components/OfflineBanner';
import { useCommunityScreen } from './hooks/CommunityScreen.hooks';
import { createTopInset, styles } from './CommunityScreen.styles';

export default function CommunityScreen() {
  const { t, insets, feed, navigation } = useCommunityScreen();
  return (
    <View style={[styles.container, createTopInset(insets.top)]}>
      <CommunityHeader mosqueName={feed.mosqueName} t={t} />
      <OfflineBanner visible={feed.fromCache} t={t} />
      {!feed.preferredMosqueId ? (
        <CommunityState type="mosque" onAction={navigation.openSettings} t={t} />
      ) : feed.loading ? (
        <CommunityState type="loading" t={t} />
      ) : feed.error ? (
        <CommunityState type="error" onAction={feed.retry} t={t} />
      ) : (
        <AnnouncementList
          announcements={feed.announcements}
          mosqueNames={feed.mosqueNames}
          mosqueName={feed.mosqueName}
          refreshing={feed.refreshing}
          onRefresh={feed.refresh}
          onOpen={navigation.openAnnouncement}
          t={t}
        />
      )}
    </View>
  );
}

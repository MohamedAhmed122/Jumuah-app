import { FlatList, RefreshControl } from 'react-native';
import type { TFunction } from 'i18next';
import type { Announcement } from '@src/api/announcements';
import { Colors } from '@constants/Colors';
import type { MosqueNames } from '../CommunityScreen.types';
import { resolveAnnouncementLocation } from '../CommunityScreen.utils';
import { AnnouncementCard } from './AnnouncementCard';
import { CommunityState } from './CommunityState';
import { styles } from './AnnouncementList.styles';

interface Props {
  announcements: Announcement[];
  mosqueNames: MosqueNames;
  mosqueName: string;
  refreshing: boolean;
  onRefresh: () => void;
  onOpen: (id: string) => void;
  t: TFunction;
}

export function AnnouncementList(props: Props) {
  const { announcements, mosqueNames, mosqueName, refreshing, onRefresh, onOpen, t } = props;
  return (
    <FlatList
      data={announcements}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={(
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={Colors.accent}
          colors={[Colors.accent]}
        />
      )}
      ListEmptyComponent={<CommunityState type="empty" t={t} />}
      renderItem={({ item }) => (
        <AnnouncementCard
          item={item}
          locationName={resolveAnnouncementLocation(item, mosqueNames, mosqueName)}
          onPress={() => onOpen(item.id)}
        />
      )}
    />
  );
}

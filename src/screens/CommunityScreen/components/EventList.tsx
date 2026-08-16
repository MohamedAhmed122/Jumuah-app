import { FlatList, RefreshControl, View } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import type { CommunityEvent } from '@src/api/events';
import type { MosqueNames } from '../CommunityScreen.types';
import { resolveEventLocation } from '../CommunityScreen.utils';
import { CommunityState } from './CommunityState';
import { EventCard } from './EventCard';
import { styles } from './AnnouncementList.styles';

interface Props { events: CommunityEvent[]; mosqueNames: MosqueNames; refreshing: boolean; onRefresh: () => void; onOpen: (item: CommunityEvent) => void; t: TFunction }

export function EventList({ events, mosqueNames, refreshing, onRefresh, onOpen, t }: Props) {
  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.accent} colors={[Colors.accent]} />}
      ListEmptyComponent={<CommunityState type="emptyEvents" t={t} />}
      renderItem={({ item }) => <View style={styles.item}><EventCard item={item} locationName={resolveEventLocation(item, mosqueNames)} onPress={() => onOpen(item)} /></View>}
    />
  );
}

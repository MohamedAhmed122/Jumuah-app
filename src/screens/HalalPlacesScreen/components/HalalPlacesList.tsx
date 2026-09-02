import { router } from 'expo-router';
import { FlatList, RefreshControl } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import type { HalalPlaceResult } from '../HalalPlacesScreen.types';
import { HalalPlaceCard } from './HalalPlaceCard';
import { HalalPlacesState } from './HalalPlacesState';
import { styles } from './HalalPlacesList.styles';

interface Props {
  places: HalalPlaceResult[];
  refreshing: boolean;
  onRefresh: () => void;
  t: TFunction;
}

export function HalalPlacesList({ places, refreshing, onRefresh, t }: Props) {
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      refreshControl={(
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={Colors.accent}
          colors={[Colors.accent]}
        />
      )}
      ListEmptyComponent={<HalalPlacesState type="empty" t={t} />}
      renderItem={({ item }) => (
        <HalalPlaceCard
          item={item}
          t={t}
          onPress={() => router.push({
            pathname: '/item/[type]/[id]',
            params: { type: 'halal', id: item.id },
          })}
        />
      )}
    />
  );
}

import { Linking, Share } from 'react-native';
import { router } from 'expo-router';
import type { DetailItem } from '../ItemDetailScreen.types';
import { buildDirectionsUrl } from '../ItemDetailScreen.utils';

export function useItemActions(item: DetailItem | null) {
  const share = async () => {
    if (!item) return;
    try {
      await Share.share({ title: item.name, message: `${item.name}\n${item.address}` });
    } catch {
      return;
    }
  };
  const openDirections = async () => {
    if (item) await Linking.openURL(buildDirectionsUrl(item));
  };
  return {
    goBack: router.back,
    share,
    openDirections,
  };
}

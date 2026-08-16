import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { CommunityAgendaItem } from '../CommunityAgendaScreen.types';
import { useCommunityAgendaData } from './useCommunityAgendaData';

export function useCommunityAgendaScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const data = useCommunityAgendaData();
  const openItem = (item: CommunityAgendaItem) => {
    if (item.type === 'event') {
      router.push({ pathname: '/event/[id]', params: { id: item.id, mosqueId: item.mosqueId } });
    } else {
      router.push({ pathname: '/announcement/[id]', params: { id: item.id, mosqueId: item.mosqueId, mosqueIds: data.mosqueIds.join(',') } });
    }
  };
  return { t, insets, data, goBack: router.back, openItem };
}

import { router } from 'expo-router';

export function useCommunityNavigation() {
  return {
    openSettings: () => router.push('/(tabs)/settings'),
    openAnnouncement: (id: string, mosqueId: string, mosqueIds: string[]) => router.push({ pathname: '/announcement/[id]', params: { id, mosqueId, mosqueIds: mosqueIds.join(',') } }),
    openEvent: (id: string, mosqueId: string) => router.push({ pathname: '/event/[id]', params: { id, mosqueId } }),
  };
}

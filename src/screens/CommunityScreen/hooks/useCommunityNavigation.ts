import { router } from 'expo-router';

export function useCommunityNavigation() {
  return {
    openSettings: () => router.push('/(tabs)/settings'),
    openAnnouncement: (id: string) => router.push(`/announcement/${id}`),
  };
}

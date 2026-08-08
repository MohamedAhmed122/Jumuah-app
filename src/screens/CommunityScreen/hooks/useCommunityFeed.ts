import { useCallback, useEffect, useState } from 'react';
import { fetchAnnouncementsCached, type Announcement } from '@src/api/announcements';
import { fetchLocationBundle } from '@src/api/locations';
import { useSettingsStore } from '@src/stores/settingsStore';
import type { MosqueNames } from '../CommunityScreen.types';

export function useCommunityFeed() {
  const { preferredMosqueId, appLanguage } = useSettingsStore();
  const [mosqueName, setMosqueName] = useState('');
  const [mosqueNames, setMosqueNames] = useState<MosqueNames>({});
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [fromCache, setFromCache] = useState(false);

  const loadData = useCallback(async (forceRefresh = false) => {
    if (!preferredMosqueId) {
      setAnnouncements([]);
      setMosqueName('');
      setError(false);
      setFromCache(false);
      return;
    }
    try {
      setError(false);
      const result = await fetchAnnouncementsCached(preferredMosqueId, appLanguage, forceRefresh);
      setAnnouncements(result.announcements);
      setFromCache(result.fromCache);
      await loadMosqueNames(preferredMosqueId, forceRefresh, setMosqueNames, setMosqueName);
    } catch {
      setError(true);
    }
  }, [preferredMosqueId, appLanguage]);

  useEffect(() => {
    setLoading(true);
    void loadData(false).finally(() => setLoading(false));
  }, [loadData]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await loadData(true);
    setRefreshing(false);
  }, [loadData]);

  return {
    preferredMosqueId, mosqueName, mosqueNames, announcements, loading,
    refreshing, error, fromCache, refresh, retry: () => loadData(true),
  };
}

async function loadMosqueNames(
  preferredId: string, force: boolean,
  setNames: (names: MosqueNames) => void, setName: (name: string) => void,
) {
  try {
    const locations = await fetchLocationBundle(force);
    setNames(Object.fromEntries(locations.mosques.map((mosque) => [mosque.id, mosque.name])));
    setName(locations.mosques.find((mosque) => mosque.id === preferredId)?.name ?? '');
  } catch {
    return;
  }
}

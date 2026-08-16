import { useCallback, useEffect, useState } from 'react';
import { fetchAnnouncementsCached, type Announcement } from '@src/api/announcements';
import { fetchEvents, type CommunityEvent } from '@src/api/events';
import { getDeviceId } from '@src/device/deviceIdentity';
import { useSettingsStore } from '@src/stores/settingsStore';

export function useCommunityFeed(mosqueIds: string[]) {
  const language = useSettingsStore((state) => state.appLanguage);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [announcementError, setAnnouncementError] = useState(false);
  const [eventError, setEventError] = useState(false);
  const [fromCache, setFromCache] = useState(false);
  const scope = [...mosqueIds].sort().join(',');

  const loadData = useCallback(async (forceRefresh = false) => {
    if (!mosqueIds.length) return;
    try {
      const deviceId = await getDeviceId();
      const [announcementResult, eventResponse] = await Promise.allSettled([
        fetchAnnouncementsCached(mosqueIds, language, forceRefresh),
        fetchEvents(mosqueIds, language, deviceId),
      ]);
      setAnnouncementError(announcementResult.status === 'rejected');
      setEventError(eventResponse.status === 'rejected');
      if (announcementResult.status === 'fulfilled') {
        setAnnouncements(announcementResult.value.announcements);
        setFromCache(announcementResult.value.fromCache);
      }
      if (eventResponse.status === 'fulfilled') setEvents(eventResponse.value.data);
    } catch {
      setAnnouncementError(true);
      setEventError(true);
    }
  }, [language, scope]);

  useEffect(() => {
    setLoading(true);
    void loadData().finally(() => setLoading(false));
  }, [loadData]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await loadData(true);
    setRefreshing(false);
  }, [loadData]);

  return { announcements, events, loading, refreshing, announcementError, eventError, fromCache, refresh, retry: () => loadData(true) };
}

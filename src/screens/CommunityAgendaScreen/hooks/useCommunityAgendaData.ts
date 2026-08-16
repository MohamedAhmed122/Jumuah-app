import { useEffect, useMemo, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { fetchAnnouncementsCached, type Announcement } from '@src/api/announcements';
import { fetchEvents, type CommunityEvent } from '@src/api/events';
import { getDeviceId } from '@src/device/deviceIdentity';
import { useSettingsStore } from '@src/stores/settingsStore';
import type { CommunityAgendaRouteParams } from '../CommunityAgendaScreen.types';
import { setAgendaLocale } from '../CommunityAgendaScreen.locale';
import { buildAgenda } from '../CommunityAgendaScreen.utils';

export function useCommunityAgendaData() {
  const { mosqueIds: mosqueIdsParam } = useLocalSearchParams<CommunityAgendaRouteParams>();
  const language = useSettingsStore((state) => state.appLanguage);
  const mosqueIds = useMemo(() => mosqueIdsParam?.split(',').filter(Boolean) ?? [], [mosqueIdsParam]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryNonce, setRetryNonce] = useState(0);

  useEffect(() => setAgendaLocale(language), [language]);

  useEffect(() => {
    if (!mosqueIds.length) {
      setError(true);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(false);
    void (async () => {
      try {
        const deviceId = await getDeviceId();
        const [announcementResult, eventResponse] = await Promise.allSettled([
          fetchAnnouncementsCached(mosqueIds, language), fetchEvents(mosqueIds, language, deviceId),
        ]);
        if (announcementResult.status === 'fulfilled') setAnnouncements(announcementResult.value.announcements);
        if (eventResponse.status === 'fulfilled') setEvents(eventResponse.value.data);
        setError(announcementResult.status === 'rejected' && eventResponse.status === 'rejected');
      } catch { setError(true); } finally { setLoading(false); }
    })();
  }, [language, mosqueIdsParam, retryNonce]);

  const agenda = useMemo(() => buildAgenda(announcements, events), [announcements, events]);
  return { ...agenda, loading, error, mosqueIds, retry: () => setRetryNonce((value) => value + 1) };
}

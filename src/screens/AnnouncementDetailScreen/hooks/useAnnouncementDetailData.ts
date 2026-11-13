import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
  fetchAnnouncementById,
  readCachedAnnouncements,
  type Announcement,
} from '@src/api/announcements';
import { fetchLocationBundle } from '@src/api/locations';
import type { AppLanguage } from '@src/i18n/languages';
import { useSettingsStore } from '@src/stores/settingsStore';
import type { AnnouncementRouteParams } from '../AnnouncementDetailScreen.types';

export function useAnnouncementDetailData() {
  const { id, mosqueId, mosqueIds } = useLocalSearchParams<AnnouncementRouteParams>();
  const { preferredMosqueId, appLanguage } = useSettingsStore();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const scopedMosqueId = mosqueId ?? preferredMosqueId;
    if (!id || !scopedMosqueId) {
      setLoading(false);
      setError(true);
      return;
    }
    void (async () => {
      const resolved = await resolveAnnouncement(id, scopedMosqueId, mosqueIds, appLanguage);
      if (!resolved) setError(true);
      setAnnouncement(resolved);
      if (resolved?.locationType === 'mosque') {
        setLocationName(await resolveMosqueName(resolved, scopedMosqueId));
      }
      setLoading(false);
    })();
  }, [id, mosqueId, mosqueIds, preferredMosqueId, appLanguage]);

  return { announcement, locationName, loading, error };
}

async function resolveAnnouncement(id: string, mosqueId: string, scope: string | undefined, language: AppLanguage) {
  try {
    return (await fetchAnnouncementById(id, mosqueId, language)).data;
  } catch {
    const cacheScope = scope?.split(',').sort().join(',') ?? mosqueId;
    return (await readCachedAnnouncements(cacheScope, language))?.find((item) => item.id === id) ?? null;
  }
}

async function resolveMosqueName(announcement: Announcement, fallbackMosqueId: string) {
  try {
    const locations = await fetchLocationBundle();
    const locationId = announcement.locationMosqueId ?? fallbackMosqueId;
    return locations.mosques.find((mosque) => mosque.id === locationId)?.name ?? '';
  } catch {
    return '';
  }
}

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
  const { id } = useLocalSearchParams<AnnouncementRouteParams>();
  const { preferredMosqueId, appLanguage } = useSettingsStore();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id || !preferredMosqueId) {
      setLoading(false);
      setError(true);
      return;
    }
    void (async () => {
      const resolved = await resolveAnnouncement(id, preferredMosqueId, appLanguage);
      if (!resolved) setError(true);
      setAnnouncement(resolved);
      if (resolved?.locationType === 'mosque') {
        setLocationName(await resolveMosqueName(resolved, preferredMosqueId));
      }
      setLoading(false);
    })();
  }, [id, preferredMosqueId, appLanguage]);

  return { announcement, locationName, loading, error };
}

async function resolveAnnouncement(id: string, mosqueId: string, language: AppLanguage) {
  try {
    return (await fetchAnnouncementById(id, mosqueId, language)).data;
  } catch {
    return (await readCachedAnnouncements(mosqueId, language))?.find((item) => item.id === id) ?? null;
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

import { useCallback, useMemo, useState } from 'react';
import type { TFunction } from 'i18next';
import { fetchAnnouncementsCached, type Announcement } from '@src/api/announcements';
import type { Mosque } from '@src/api/locations';
import type { AppLanguage } from '@src/i18n/languages';
import { toAnnouncementSlide } from '../TvPrayerScreen.announcements';
import { useRefreshLoop } from './useRefreshLoop';

interface FeedState {
  scope: string;
  items: Announcement[];
  online: boolean;
}

export function useTvAnnouncements(mosqueId: string | null, language: AppLanguage, mosques: Mosque[], t: TFunction) {
  const scope = `${mosqueId}:${language}`;
  const [feed, setFeed] = useState<FeedState>({ scope: '', items: [], online: true });

  const load = useCallback(async (isActive: () => boolean) => {
    if (!mosqueId) return false;
    try {
      const result = await fetchAnnouncementsCached(mosqueId, language, true);
      if (isActive()) setFeed({ scope, items: result.announcements, online: !result.fromCache });
      return !result.fromCache;
    } catch {
      if (isActive()) setFeed((current) => ({ ...current, online: false }));
      return false;
    }
  }, [mosqueId, language, scope]);

  useRefreshLoop(load, !!mosqueId);

  const items = feed.scope === scope ? feed.items : [];
  const slides = useMemo(() => {
    const mosqueNames = Object.fromEntries(mosques.map((mosque) => [mosque.id, mosque.name]));
    return items.map((item) => toAnnouncementSlide(item, { language, mosqueNames, t }));
  }, [items, mosques, language, t]);

  return { slides, online: feed.online };
}

import type { AppLanguage } from '@src/i18n/languages';

import { writeAnnouncementsCache } from '../cache';
import { apiClient } from '../client';
import { getAnnouncementCacheScope, readScopedAnnouncementCache } from './announcements.cache';
import { ANNOUNCEMENT_ENDPOINTS, ANNOUNCEMENT_NETWORK_ERROR } from './announcements.constants';
import type {
  Announcement,
  AnnouncementFeedResult,
  CachedAnnouncementFeed,
} from './announcements.types';

export async function fetchAnnouncementsCached(
  mosqueId: string,
  language: AppLanguage,
  forceRefresh = false,
): Promise<AnnouncementFeedResult> {
  if (!forceRefresh) {
    const fresh = await readScopedAnnouncementCache(mosqueId, language);
    if (fresh) return { announcements: fresh, fromCache: false };
  }

  try {
    const response = await apiClient.get<Announcement[]>(ANNOUNCEMENT_ENDPOINTS.feed, {
      params: { mosqueId, lang: language },
    });
    await writeAnnouncementsCache<CachedAnnouncementFeed>({
      scope: getAnnouncementCacheScope(mosqueId, language),
      announcements: response.data,
    });
    return { announcements: response.data, fromCache: false };
  } catch {
    const stale = await readScopedAnnouncementCache(mosqueId, language, true);
    if (stale) return { announcements: stale, fromCache: true };
    throw new Error(ANNOUNCEMENT_NETWORK_ERROR);
  }
}

export function readCachedAnnouncements(mosqueId: string, language: AppLanguage) {
  return readScopedAnnouncementCache(mosqueId, language, true);
}

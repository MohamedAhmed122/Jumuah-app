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
  mosqueIds: string | string[],
  language: AppLanguage,
  forceRefresh = false,
): Promise<AnnouncementFeedResult> {
  const ids = Array.isArray(mosqueIds) ? mosqueIds : [mosqueIds];
  const scopeId = [...ids].sort().join(',');
  if (!forceRefresh) {
    const fresh = await readScopedAnnouncementCache(scopeId, language);
    if (fresh) return { announcements: fresh, fromCache: false };
  }

  try {
    const response = await apiClient.get<Announcement[]>(ANNOUNCEMENT_ENDPOINTS.feed, {
      params: ids.length === 1
        ? { mosqueId: ids[0], lang: language }
        : { mosqueIds: ids.join(','), lang: language },
    });
    await writeAnnouncementsCache<CachedAnnouncementFeed>({
      scope: getAnnouncementCacheScope(scopeId, language),
      announcements: response.data,
    });
    return { announcements: response.data, fromCache: false };
  } catch {
    const stale = await readScopedAnnouncementCache(scopeId, language, true);
    if (stale) return { announcements: stale, fromCache: true };
    throw new Error(ANNOUNCEMENT_NETWORK_ERROR);
  }
}

export function readCachedAnnouncements(mosqueId: string, language: AppLanguage) {
  return readScopedAnnouncementCache(mosqueId, language, true);
}

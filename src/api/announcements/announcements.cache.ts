import { readAnnouncementsCache } from '../cache';
import type { AppLanguage } from '@src/i18n/languages';

import type { Announcement, CachedAnnouncementFeed } from './announcements.types';

export function getAnnouncementCacheScope(mosqueId: string, language: AppLanguage) {
  return `${mosqueId}:${language}`;
}

export async function readScopedAnnouncementCache(
  mosqueId: string,
  language: AppLanguage,
  ignoreExpiry = false,
): Promise<Announcement[] | null> {
  const cached = await readAnnouncementsCache<CachedAnnouncementFeed>(ignoreExpiry);
  const scope = getAnnouncementCacheScope(mosqueId, language);
  if (!cached || Array.isArray(cached) || cached.scope !== scope) return null;
  return cached.announcements;
}

import { apiClient } from './client';
import { readAnnouncementsCache, writeAnnouncementsCache } from './cache';

export interface Announcement {
  id: string;
  title: string;
  image: string;
  descriptionHtml: string;
  mosqueIds: string[];
  date: string;
  eventDate?: string;
  endDate?: string;
  locationType: 'mosque' | 'outside';
  locationMosqueId?: string;
  outsideLocation?: { address: string; lat: number; lng: number };
  isPinned: boolean;
  lang: 'en' | 'ru';
  createdAt?: string;
  updatedAt?: string;
}

interface CachedAnnouncementFeed {
  scope: string;
  announcements: Announcement[];
}

export interface AnnouncementFeedResult {
  announcements: Announcement[];
  fromCache: boolean;
}

const cacheScope = (mosqueId: string, lang: 'en' | 'ru') => `${mosqueId}:${lang}`;

async function readScopedCache(mosqueId: string, lang: 'en' | 'ru', ignoreExpiry = false) {
  const cached = await readAnnouncementsCache<CachedAnnouncementFeed>(ignoreExpiry);
  if (!cached || Array.isArray(cached) || cached.scope !== cacheScope(mosqueId, lang)) return null;
  return cached.announcements;
}

export async function fetchAnnouncementsCached(
  mosqueId: string,
  lang: 'en' | 'ru',
  forceRefresh = false,
): Promise<AnnouncementFeedResult> {
  if (!forceRefresh) {
    const fresh = await readScopedCache(mosqueId, lang);
    if (fresh) return { announcements: fresh, fromCache: false };
  }

  try {
    const res = await apiClient.get<Announcement[]>('/community/announcements', { params: { mosqueId, lang } });
    await writeAnnouncementsCache<CachedAnnouncementFeed>({
      scope: cacheScope(mosqueId, lang),
      announcements: res.data,
    });
    return { announcements: res.data, fromCache: false };
  } catch {
    const stale = await readScopedCache(mosqueId, lang, true);
    if (stale) return { announcements: stale, fromCache: true };
    throw new Error('network');
  }
}

export function readCachedAnnouncements(mosqueId: string, lang: 'en' | 'ru') {
  return readScopedCache(mosqueId, lang, true);
}

export const fetchAnnouncementById = (id: string, mosqueId: string, lang: 'en' | 'ru') =>
  apiClient.get<Announcement>(`/community/announcements/${id}`, { params: { mosqueId, lang } });

export function announcementPlainText(html: string): string {
  return html
    .replace(/<\/p>\s*<p>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

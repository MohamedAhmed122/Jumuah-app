import { apiClient } from './client';
import { readAnnouncementsCache, writeAnnouncementsCache } from './cache';

export interface Announcement {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  descriptionHtml: string;
  date: string;
  eventDate?: string;
  locationId?: string;
  lang: 'en' | 'ru';
}

export interface AnnouncementFeedResult {
  announcements: Announcement[];
  fromCache: boolean;
}

export async function fetchAnnouncementsCached(forceRefresh = false): Promise<AnnouncementFeedResult> {
  if (!forceRefresh) {
    const fresh = await readAnnouncementsCache<Announcement[]>();
    if (fresh) return { announcements: fresh, fromCache: false };
  }

  try {
    const res = await apiClient.get<Announcement[]>('/community/announcements');
    await writeAnnouncementsCache(res.data);
    return { announcements: res.data, fromCache: false };
  } catch {
    const stale = await readAnnouncementsCache<Announcement[]>(true);
    if (stale) return { announcements: stale, fromCache: true };
    throw new Error('network');
  }
}

export const fetchAnnouncementById = (id: string) =>
  apiClient.get<Announcement>(`/community/announcements/${id}`);

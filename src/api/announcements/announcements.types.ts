import type { AppLanguage } from '@src/i18n/languages';

export interface Announcement {
  createdAt?: string;
  date: string;
  descriptionHtml: string;
  endDate?: string;
  eventDate?: string;
  id: string;
  image: string;
  isPinned: boolean;
  lang: AppLanguage;
  locationMosqueId?: string;
  locationType: 'mosque' | 'outside';
  mosqueIds: string[];
  outsideLocation?: { address: string; lat: number; lng: number };
  title: string;
  updatedAt?: string;
}

export interface CachedAnnouncementFeed {
  announcements: Announcement[];
  scope: string;
}

export interface AnnouncementFeedResult {
  announcements: Announcement[];
  fromCache: boolean;
}

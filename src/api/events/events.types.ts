import type { AppLanguage } from '@src/i18n/languages';

export interface CommunityEvent {
  attendeeCount: number;
  capacity?: number;
  descriptionHtml: string;
  endDate?: string;
  eventDate: string;
  id: string;
  image: string;
  isFull: boolean;
  isPinned: boolean;
  joined?: boolean;
  lang: AppLanguage;
  locationMosqueId?: string;
  locationType: 'mosque' | 'outside';
  mosqueIds: string[];
  outsideLocation?: { address: string; lat: number; lng: number };
  registrationEnabled: boolean;
  status: 'draft' | 'published' | 'cancelled';
  title: string;
}

export interface EventAttendanceResult {
  attendeeCount: number;
  joined: boolean;
}

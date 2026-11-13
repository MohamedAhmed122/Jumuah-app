import type { Announcement } from '@src/api/announcements';
import type { CommunityEvent } from '@src/api/events';
import type { Mosque } from '@src/api/locations';

export type MosqueNames = Record<string, string>;
export type CommunityTab = 'announcements' | 'events';

export interface AnnouncementCardProps {
  item: Announcement;
  locationName?: string;
  onPress: () => void;
}

export interface EventCardProps {
  item: CommunityEvent;
  locationName?: string;
  onPress: () => void;
}

export interface CommunityMosqueOption extends Pick<Mosque, 'city' | 'id' | 'name'> {
  selected: boolean;
}

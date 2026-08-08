import type { Announcement } from '@src/api/announcements';

export type MosqueNames = Record<string, string>;

export interface AnnouncementCardProps {
  item: Announcement;
  locationName?: string;
  onPress: () => void;
}

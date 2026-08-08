import { format } from 'date-fns';
import type { Announcement } from '@src/api/announcements';
import type { MosqueNames } from './CommunityScreen.types';

export function displayAnnouncementDate(value: string): string {
  try {
    return format(new Date(value), 'd MMM yyyy');
  } catch {
    return value;
  }
}

export function resolveAnnouncementLocation(
  announcement: Announcement,
  mosqueNames: MosqueNames,
  preferredMosqueName: string,
): string | undefined {
  if (announcement.locationType === 'outside') return announcement.outsideLocation?.address;
  if (announcement.locationMosqueId) return mosqueNames[announcement.locationMosqueId];
  return preferredMosqueName;
}

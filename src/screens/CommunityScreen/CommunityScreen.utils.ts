import { format } from 'date-fns';
import type { Announcement } from '@src/api/announcements';
import type { CommunityEvent } from '@src/api/events';
import type { MosqueNames } from './CommunityScreen.types';

export function displayAnnouncementDate(value: string): string {
  try {
    return format(new Date(value), 'd MMM yyyy');
  } catch {
    return value;
  }
}

export function displayEventDate(value: string): string {
  try {
    return format(new Date(value), 'd MMM · HH:mm');
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

export function resolveEventLocation(event: CommunityEvent, mosqueNames: MosqueNames): string | undefined {
  if (event.locationType === 'outside') return event.outsideLocation?.address;
  const mosqueId = event.locationMosqueId ?? event.mosqueIds[0];
  return mosqueId ? mosqueNames[mosqueId] : undefined;
}

export function eventMosqueId(event: Pick<CommunityEvent, 'mosqueIds'>, selectedIds: string[]): string {
  return event.mosqueIds.find((id) => selectedIds.includes(id)) ?? event.mosqueIds[0];
}

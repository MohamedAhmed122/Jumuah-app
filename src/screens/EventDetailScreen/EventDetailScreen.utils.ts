import { format } from 'date-fns';
import { announcementPlainText } from '@src/api/announcements';
import type { CommunityEvent } from '@src/api/events';
import type { AttendanceState } from './EventDetailScreen.types';

export function eventParagraphs(html?: string): string[] {
  return html ? announcementPlainText(html).split(/\n\n+/).map((value) => value.trim()).filter(Boolean) : [];
}

export function formatEventDate(value: string): string {
  try {
    return format(new Date(value), 'd MMMM yyyy · HH:mm');
  } catch {
    return value;
  }
}

export function attendanceState(event: CommunityEvent): AttendanceState {
  if (event.joined) return 'joined';
  if (!event.registrationEnabled) return 'disabled';
  if (event.status !== 'published' || new Date(event.endDate ?? event.eventDate) <= new Date()) return 'closed';
  return event.isFull ? 'full' : 'available';
}

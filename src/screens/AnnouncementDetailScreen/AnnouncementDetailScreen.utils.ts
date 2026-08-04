import { format } from 'date-fns';
import { announcementPlainText } from '@src/api/announcements';

export function formatAnnouncementDate(date: string): string {
  try {
    return format(new Date(date), 'd MMMM yyyy');
  } catch {
    return date;
  }
}

export function getAnnouncementParagraphs(html?: string): string[] {
  if (!html) return [];
  return announcementPlainText(html)
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

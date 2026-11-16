import type { TFunction } from 'i18next';
import { announcementPlainText, type Announcement } from '@src/api/announcements';
import type { AppLanguage } from '@src/i18n/languages';
import { formatShortDate, formatTime } from './TvPrayerScreen.format';
import type { TvAnnouncementSlide } from './TvPrayerScreen.types';

interface SlideContext {
  language: AppLanguage;
  mosqueNames: Record<string, string>;
  t: TFunction;
}

function eventDetails(announcement: Announcement, context: SlideContext): string[] {
  if (!announcement.eventDate) return [];
  const start = new Date(announcement.eventDate);
  const end = announcement.endDate ? new Date(announcement.endDate) : null;
  const time = end ? `${formatTime(start)} – ${formatTime(end)}` : formatTime(start);
  return [formatShortDate(start, context.language), time];
}

function locationDetail(announcement: Announcement, context: SlideContext): string[] {
  if (announcement.locationType === 'outside') {
    return announcement.outsideLocation?.address ? [announcement.outsideLocation.address] : [];
  }
  const name = announcement.locationMosqueId ? context.mosqueNames[announcement.locationMosqueId] : undefined;
  return name ? [name] : [];
}

export function toAnnouncementSlide(announcement: Announcement, context: SlideContext): TvAnnouncementSlide {
  return {
    key: announcement.id,
    tag: context.t(announcement.eventDate ? 'community.event' : 'community.announcement'),
    title: announcement.title,
    body: announcementPlainText(announcement.descriptionHtml),
    details: [...eventDetails(announcement, context), ...locationDetail(announcement, context)],
  };
}

import type { DetailItem, ItemType } from './ItemDetailScreen.types';
import type { HalalPlace, Mosque } from '@src/api/locations';

export function htmlToPlainText(html: string): string {
  return html
    .replace(/<\/p>\s*<p>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

export function isOpenNow(hours?: string): boolean | null {
  if (!hours) return null;
  const match = hours.match(/^(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const [, openHour, openMinute, closeHour, closeMinute] = match.map(Number);
  const now = new Date();
  const current = now.getHours() * 60 + now.getMinutes();
  return current >= openHour * 60 + openMinute && current < closeHour * 60 + closeMinute;
}

export function buildDirectionsUrl(item: DetailItem): string {
  const encodedName = encodeURIComponent(item.name);
  return `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}&travelmode=driving&dir_action=navigate&query=${encodedName}`;
}

export function findItem(
  type: ItemType,
  id: string,
  mosques: Mosque[],
  halalPlaces: HalalPlace[],
): DetailItem | null {
  const items = type === 'mosque' ? mosques : halalPlaces;
  return items.find((item) => item.id === id) ?? null;
}

export function narrowItem(item: DetailItem | null, type?: ItemType) {
  return {
    mosque: type === 'mosque' ? item as Mosque : null,
    halalPlace: type === 'halal' ? item as HalalPlace : null,
  };
}

export type AnnouncementRouteParams = { id: string; mosqueId?: string; mosqueIds?: string };

export interface AnnouncementLocationProps {
  locationType: 'mosque' | 'outside';
  outsideAddress?: string;
  mosqueName: string;
}

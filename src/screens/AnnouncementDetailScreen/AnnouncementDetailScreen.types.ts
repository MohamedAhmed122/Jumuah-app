export type AnnouncementRouteParams = { id: string };

export interface AnnouncementLocationProps {
  locationType: 'mosque' | 'outside';
  outsideAddress?: string;
  mosqueName: string;
}

export const ANNOUNCEMENT_ENDPOINTS = {
  detail: (id: string) => `/community/announcements/${id}`,
  feed: '/community/announcements',
} as const;

export const ANNOUNCEMENT_NETWORK_ERROR = 'network';

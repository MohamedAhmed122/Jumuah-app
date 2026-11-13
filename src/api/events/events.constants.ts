export const EVENT_ENDPOINTS = {
  detail: (id: string) => `/community/events/${id}`,
  feed: '/community/events',
  join: (id: string) => `/community/events/${id}/join`,
  leave: (id: string) => `/community/events/${id}/leave`,
} as const;

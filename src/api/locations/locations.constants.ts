export const LOCATION_CACHE_VERSION = 3;

export const LOCATION_ENDPOINTS = {
  halal: '/locations/halal',
  halalCategories: '/locations/halal/categories',
  mosquePrayerTimes: (mosqueId: string) => `/locations/mosques/${mosqueId}/prayer-times`,
  mosques: '/locations/mosques',
} as const;

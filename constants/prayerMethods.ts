export const PRAYER_NAMES = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const;
export type PrayerName = typeof PRAYER_NAMES[number];

export const DEFAULT_COORDS = { lat: 54.6872, lng: 25.2797 }; // Vilnius

import type { AppLanguage } from '@src/i18n/languages';

export const STAGE_WIDTH = 1920;
export const STAGE_HEIGHT = 1080;
export const ANNOUNCEMENT_CARD_WIDTH = 1776;

export const ALERT_DURATION_MS = 5000;
export const PRAYER_SCREEN_DURATION_MS = 5 * 60 * 1000;
export const SLIDE_TRANSITION_MS = 900;
export const DATA_REFRESH_MS = 60 * 60 * 1000;
export const DATA_RETRY_MS = 60 * 1000;
export const MAX_TICK_DELTA_MS = 5000;
export const SCHEDULE_ANCHOR_HOUR = 12;

export const KEEP_AWAKE_TAG = 'tv-prayer-display';

export const DATE_LOCALES: Record<AppLanguage, string> = {
  en: 'en-GB',
  lt: 'lt-LT',
  ru: 'ru-RU',
};

export const TV_LANGUAGES: { language: AppLanguage; label: string }[] = [
  { language: 'en', label: 'English' },
  { language: 'lt', label: 'Lietuvių' },
  { language: 'ru', label: 'Русский' },
];

export const PRAYER_LABEL_KEYS = {
  fajr: 'prayer.fajr',
  sunrise: 'tv.sunrise',
  dhuhr: 'prayer.dhuhr',
  jummah: 'prayer.jummah',
  asr: 'prayer.asr',
  maghrib: 'prayer.maghrib',
  isha: 'prayer.isha',
} as const;

export const ARABIC_LINE_LIMITS = {
  text: 4,
  tasbih: 2,
  ayah: 8,
} as const;

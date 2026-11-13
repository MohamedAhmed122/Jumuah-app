export const IOS_PENDING_NOTIFICATION_LIMIT = 64;
export const SCHEDULE_DAY_COUNT = 14;
export const SCHEDULE_DAY_ANCHOR_HOUR = 12;
export const REMINDER_LEAD_MS = 10 * 60 * 1000;
export const ADHAN_SOUND = 'adhan.mp3';

export const KAHF_REMINDER_TRIGGER = {
  weekday: 6,
  hour: 8,
  minute: 0,
} as const;

export const NOTIFICATION_REFRESH_TASK = 'prayer-notification-refresh';
export const NOTIFICATION_REFRESH_INTERVAL_MINUTES = 6 * 60;

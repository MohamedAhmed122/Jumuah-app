import { format } from 'date-fns';
import type { AppLanguage } from '@src/i18n/languages';
import { DATE_LOCALES } from './TvPrayerScreen.constants';

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

export function formatTime(date: Date): string {
  return format(date, 'HH:mm');
}

export function formatClockSeconds(date: Date): string {
  return format(date, ':ss');
}

export function formatHms(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000));
  return `${pad(Math.floor(total / 3600))}:${pad(Math.floor(total / 60) % 60)}:${pad(total % 60)}`;
}

export function formatMs(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000));
  if (total >= 3600) return formatHms(ms);
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
}

export function formatLongDate(date: Date, language: AppLanguage): string {
  return date.toLocaleDateString(DATE_LOCALES[language], {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

export function formatShortDate(date: Date, language: AppLanguage): string {
  return date.toLocaleDateString(DATE_LOCALES[language], { weekday: 'long', day: 'numeric', month: 'long' });
}

export function toPercent(part: number, whole: number): number {
  if (whole <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((part / whole) * 100)));
}

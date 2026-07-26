export type AppLanguage = 'en' | 'ru' | 'lt';

export const APP_LANGUAGES: AppLanguage[] = ['en', 'ru', 'lt'];

export const LANGUAGE_LABELS: Record<AppLanguage, string> = {
  en: '🇬🇧 English',
  ru: '🇷🇺 Русский',
  lt: '🇱🇹 Lietuvių',
};

export function isAppLanguage(value: string | null): value is AppLanguage {
  return value === 'en' || value === 'ru' || value === 'lt';
}

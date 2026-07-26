import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './locales/en.json';
import ru from './locales/ru.json';
import lt from './locales/lt.json';
import { isAppLanguage } from './languages';

const deviceLocale = Localization.getLocales()[0]?.languageCode ?? 'en';
const fallbackLanguage = isAppLanguage(deviceLocale) ? deviceLocale : 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    lt: { translation: lt },
  },
  lng: fallbackLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v4',
});

export default i18n;

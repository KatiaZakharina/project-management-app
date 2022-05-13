import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import EN from './en/en.json';
import RU from './ru/ru.json';

const resources = {
  en: {
    translation: EN,
  },
  ru: {
    translation: RU,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  detection: {
    order: ['cookie', 'localStorage'],
    caches: ['cookie'],
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

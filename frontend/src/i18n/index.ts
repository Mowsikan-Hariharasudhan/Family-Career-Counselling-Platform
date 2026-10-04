import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './en.json';
import ta from './ta.json';
import hi from './hi.json';

// ============================================================
// i18n Configuration — Family Career Counselling
// Supports: English (en), Tamil (ta), Hindi (hi)
// Architecture supports additional languages via new JSON files.
// ============================================================

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ta: { translation: ta },
      hi: { translation: hi },
      // Future languages added here:
      // te: { translation: te },  // Telugu
      // kn: { translation: kn },  // Kannada
      // ml: { translation: ml },  // Malayalam
      // mr: { translation: mr },  // Marathi
      // bn: { translation: bn },  // Bengali
    },
    lng: localStorage.getItem('fcc-language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'fcc-language',
    },
  });

export default i18n;

// Helper: update <html lang> attribute when language changes
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  localStorage.setItem('fcc-language', lng);
});

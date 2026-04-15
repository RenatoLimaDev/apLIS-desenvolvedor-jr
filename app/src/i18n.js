import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptBR from './locales/pt-BR.json';
import en from './locales/en.json';

const STORAGE_KEY = 'aplis-lang';

const savedLang =
  (typeof window !== 'undefined' && window.localStorage?.getItem(STORAGE_KEY)) || 'pt-BR';

i18n.use(initReactI18next).init({
  resources: {
    'pt-BR': { translation: ptBR },
    en: { translation: en },
  },
  lng: savedLang,
  fallbackLng: 'pt-BR',
  interpolation: { escapeValue: false },
});

export function changeLanguage(lang) {
  i18n.changeLanguage(lang);
  if (typeof window !== 'undefined') {
    window.localStorage?.setItem(STORAGE_KEY, lang);
  }
}

export default i18n;

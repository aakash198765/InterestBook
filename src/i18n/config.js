import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translations: require("./locales/en/translation.json")
    },
    hi: {
        translations: require("./locales/hi/translation.json")
    }
}

i18n.use(initReactI18next).init({
  fallbackLng: 'hi',
  lng: 'hi',
  resources,
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['en', 'hi'];

export default i18n;
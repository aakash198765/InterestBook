import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './resources';
import Utils from '../libs/Utils';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng:  Utils.getFromLocalStorage("lng") || 'en',
  resources: resources("resources"),
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['en', 'hi'];

export default i18n;
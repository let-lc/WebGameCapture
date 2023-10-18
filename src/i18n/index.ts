import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend, { HttpBackendOptions } from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';


const isDev = process.env.NODE_ENV === 'development';

i18n
  // load translation from public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(HttpBackend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init<HttpBackendOptions>({
    fallbackLng: 'en',
    supportedLngs: ['en', 'zh'],
    load: 'currentOnly',
    debug: isDev,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: isDev ? 'http://localhost:3000/locales/{{lng}}/{{ns}}.json' : '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;

import { Translations } from '@/i18n/schema';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: Translations;
    };
  }
}

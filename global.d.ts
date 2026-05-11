// next-intl type-safe message keys
import type { routing } from './src/i18n/routing';
import type messages from './messages/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}

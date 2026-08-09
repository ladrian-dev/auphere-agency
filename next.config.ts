import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { isProduction } from './src/lib/deployment';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/**
 * Fuera de producción, ninguna respuesta es indexable. `robots.txt` pide que no
 * se rastree; esta cabecera impide que se indexe una URL descubierta por enlace,
 * que es como se filtran los stagings en la práctica.
 */
const noIndexHeaders = isProduction()
  ? []
  : [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          ...noIndexHeaders,
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);

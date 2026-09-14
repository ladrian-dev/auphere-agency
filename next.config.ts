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
  // Rutas legales antiguas y slugs en el idioma equivocado → slug correcto.
  async redirects() {
    return [
      { source: '/es/privacy', destination: '/es/privacidad', permanent: true },
      { source: '/es/terms', destination: '/es/terminos', permanent: true },
      { source: '/es/security', destination: '/es/seguridad', permanent: true },
      { source: '/es/trust', destination: '/es/seguridad', permanent: true },
      { source: '/en/privacidad', destination: '/en/privacy', permanent: true },
      { source: '/en/terminos', destination: '/en/terms', permanent: true },
      { source: '/en/seguridad', destination: '/en/security', permanent: true },
      { source: '/en/trust', destination: '/en/security', permanent: true },
    ];
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

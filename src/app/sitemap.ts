import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { VERTICAL_SLUGS } from '@/lib/use-cases/verticals';

const STATIC_ROUTES = ['', '/about', '/privacy', '/terms', '/trust', '/use-cases'] as const;

const VERTICAL_ROUTES = VERTICAL_SLUGS.map((slug) => `/use-cases/${slug}` as const);

export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';
  const now = new Date();

  const routes = [...STATIC_ROUTES, ...VERTICAL_ROUTES];

  return routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${url}/${locale}${route}`,
      lastModified: now,
      changeFrequency: (route === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: route === '' ? 1 : route.startsWith('/use-cases') ? 0.8 : 0.6,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${url}/${l}${route}`]),
        ),
      },
    })),
  );
}

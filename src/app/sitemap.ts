import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const ROUTES = ['', '/about', '/privacy', '/terms', '/trust'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';
  const now = new Date();

  return routing.locales.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${url}/${locale}${route}`,
      lastModified: now,
      changeFrequency: (route === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: route === '' ? 1 : 0.6,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${url}/${l}${route}`]),
        ),
      },
    })),
  );
}

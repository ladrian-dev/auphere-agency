import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';
  const now = new Date();

  return routing.locales.map((locale) => ({
    url: `${url}/${locale}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${url}/${l}`]),
      ),
    },
  }));
}

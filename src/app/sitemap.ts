import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { VERTICAL_SLUGS } from '@/lib/use-cases/verticals';

const STATIC_ROUTES = [
  '',
  '/whatsapp-ai-agent',
  '/use-cases',
  '/about',
  '/trust',
  '/privacy',
  '/terms',
] as const;

const VERTICAL_ROUTES = VERTICAL_SLUGS.map((slug) => `/use-cases/${slug}` as const);

function priorityFor(route: string): number {
  if (route === '') return 1;
  if (route === '/whatsapp-ai-agent') return 0.9;
  if (route.startsWith('/use-cases')) return 0.8;
  return 0.6;
}

function changeFrequencyFor(route: string): 'weekly' | 'monthly' {
  if (route === '' || route === '/whatsapp-ai-agent') return 'weekly';
  return 'monthly';
}

export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';
  const now = new Date();

  const routes = [...STATIC_ROUTES, ...VERTICAL_ROUTES];

  return routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${url}/${locale}${route}`,
      lastModified: now,
      changeFrequency: changeFrequencyFor(route),
      priority: priorityFor(route),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${url}/${l}${route}`]),
        ),
      },
    })),
  );
}

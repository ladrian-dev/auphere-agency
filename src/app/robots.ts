import type { MetadataRoute } from 'next';
import { isProduction } from '@/lib/deployment';

export default function robots(): MetadataRoute.Robots {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';

  // Staging (`landing-staging.auphere.com`, rama develop) se cierra a todo
  // rastreador y no publica sitemap. Es la mitad de la protección: robots.txt
  // pide que no se rastree, pero Google puede indexar igual una URL que
  // encuentre enlazada. La otra mitad es la cabecera `X-Robots-Tag: noindex`
  // que pone next.config.ts en el mismo entorno.
  if (!isProduction()) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  // AI bot policy (decided 2026-05-19):
  //   Allow citation crawlers (we want to appear in ChatGPT Search, Perplexity, Claude answers).
  //   Block pure training crawlers (our sales copy should not feed foundation models).
  const citationBots = [
    'OAI-SearchBot',
    'PerplexityBot',
    'Perplexity-User',
    'ClaudeBot',
    'Claude-Web',
    'Claude-SearchBot',
    'Google-Extended',
    'Applebot',
    'DuckAssistBot',
    'Meta-ExternalAgent',
  ];

  const trainingBots = [
    'GPTBot',
    'CCBot',
    'anthropic-ai',
    'Bytespider',
    'Amazonbot',
    'Applebot-Extended',
    'Diffbot',
    'FacebookBot',
    'Meta-ExternalFetcher',
    'cohere-ai',
    'cohere-training-data-crawler',
    'AI2Bot',
    'omgili',
    'YouBot',
    'PanguBot',
    'ImagesiftBot',
    'DataForSeoBot',
    'ICC-Crawler',
    'iaskspider/2.0',
    'PetalBot',
    'Scrapy',
    'SemrushBot',
    'magpie-crawler',
    'Timpibot',
    'VelenPublicWebCrawler',
    'Webzio-Extended',
  ];

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      { userAgent: citationBots, allow: '/' },
      { userAgent: trainingBots, disallow: '/' },
    ],
    sitemap: `${url}/sitemap.xml`,
  };
}

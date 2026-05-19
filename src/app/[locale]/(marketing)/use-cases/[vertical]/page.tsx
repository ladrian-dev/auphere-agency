import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale, type Locale, useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import {
  VERTICAL_SLUGS,
  VERTICAL_CONFIG,
  isVerticalSlug,
  type VerticalSlug,
} from '@/lib/use-cases/verticals';
import { VerticalHero } from '@/components/sections/use-case/VerticalHero';
import { PainGrid } from '@/components/sections/use-case/PainGrid';
import { AgentRoles } from '@/components/sections/use-case/AgentRoles';
import { ConversationDemo } from '@/components/sections/use-case/ConversationDemo';
import { IntegrationsStrip } from '@/components/sections/use-case/IntegrationsStrip';
import { OutcomeMetrics } from '@/components/sections/use-case/OutcomeMetrics';
import { VerticalFaq } from '@/components/sections/use-case/VerticalFaq';
import { VerticalFinalCta } from '@/components/sections/use-case/VerticalFinalCta';
import { getVerticalFaqItems } from '@/components/sections/use-case/verticalFaqUtils';

interface Props {
  params: Promise<{ locale: string; vertical: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    VERTICAL_SLUGS.map((vertical) => ({ locale, vertical })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, vertical } = await params;
  if (!hasLocale(routing.locales, locale) || !isVerticalSlug(vertical)) return {};

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: `useCases.${vertical}.meta`,
  });
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';
  const path = `/use-cases/${vertical}`;

  return {
    title: t('title' as Parameters<typeof t>[0]),
    description: t('description' as Parameters<typeof t>[0]),
    alternates: {
      canonical: `${url}/${locale}${path}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${url}/${l}${path}`]),
      ),
    },
    openGraph: {
      title: t('title' as Parameters<typeof t>[0]),
      description: t('description' as Parameters<typeof t>[0]),
      url: `${url}/${locale}${path}`,
      siteName: 'Auphere',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title' as Parameters<typeof t>[0]),
      description: t('description' as Parameters<typeof t>[0]),
    },
  };
}

export default async function VerticalUseCasePage({ params }: Props) {
  const { locale, vertical } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  if (!isVerticalSlug(vertical)) notFound();

  setRequestLocale(locale);

  const config = VERTICAL_CONFIG[vertical];

  const tFaq = await getTranslations({
    locale: locale as Locale,
    namespace: `useCases.${vertical}.faq`,
  });
  const tMeta = await getTranslations({
    locale: locale as Locale,
    namespace: `useCases.${vertical}.meta`,
  });
  const tHero = await getTranslations({
    locale: locale as Locale,
    namespace: `useCases.${vertical}.hero`,
  });
  const tRoles = await getTranslations({
    locale: locale as Locale,
    namespace: `useCases.${vertical}.roles`,
  });
  const tHub = await getTranslations({
    locale: locale as Locale,
    namespace: 'useCases.hub.header',
  });

  const faqItems = getVerticalFaqItems(config.faqKeys, (key) =>
    tFaq(key as Parameters<typeof tFaq>[0]),
  );

  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';
  const pageUrl = `${url}/${locale}/use-cases/${vertical}`;

  const offers = config.roleKeys.map((key) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: tRoles(`items.${key}.title` as Parameters<typeof tRoles>[0]),
      description: tRoles(`items.${key}.body` as Parameters<typeof tRoles>[0]),
    },
  }));

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: tMeta('title' as Parameters<typeof tMeta>[0]),
    description: tMeta('description' as Parameters<typeof tMeta>[0]),
    provider: {
      '@type': 'Organization',
      name: 'Auphere',
      url,
    },
    areaServed: ['Europe', 'United States', 'Latin America'],
    serviceType: tHero('eyebrow' as Parameters<typeof tHero>[0]),
    url: pageUrl,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: tHero('headline' as Parameters<typeof tHero>[0]),
      itemListElement: offers,
    },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Auphere',
        item: `${url}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: tHub('eyebrow' as Parameters<typeof tHub>[0]),
        item: `${url}/${locale}/use-cases`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tHero('eyebrow' as Parameters<typeof tHero>[0]),
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <VerticalPageBody vertical={vertical} />
    </>
  );
}

/**
 * Page body — split off so the JSON-LD scripts above render purely from the
 * server data we already resolved, while the visual sections rehydrate via
 * the client `useTranslations` hook for cheap interactivity (accordion,
 * stagger reveals, scroll-triggered motion).
 */
function VerticalPageBody({ vertical }: { vertical: VerticalSlug }) {
  const config = VERTICAL_CONFIG[vertical];
  const t = useTranslations(`useCases.${vertical}.faq`);
  const faqItems = config.faqKeys.map((key) => ({
    q: t(`items.${key}.q` as Parameters<typeof t>[0]),
    a: t(`items.${key}.a` as Parameters<typeof t>[0]),
  }));

  return (
    <>
      <VerticalHero vertical={vertical} />
      <PainGrid vertical={vertical} painKeys={config.painKeys} number="01" />
      <AgentRoles vertical={vertical} roleKeys={config.roleKeys} number="02" />
      <ConversationDemo config={config} number="03" />
      <IntegrationsStrip
        vertical={vertical}
        integrations={config.integrations}
        number="04"
      />
      <OutcomeMetrics
        vertical={vertical}
        outcomeKeys={config.outcomeKeys}
        number="05"
      />
      <VerticalFaq vertical={vertical} items={faqItems} number="06" />
      <VerticalFinalCta vertical={vertical} />
    </>
  );
}

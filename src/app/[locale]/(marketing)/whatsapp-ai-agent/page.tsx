import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale, type Locale, useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { MarketingHero } from '@/components/sections/MarketingHero';
import { PlatformVsAgencyTable } from '@/components/sections/whatsapp/PlatformVsAgencyTable';
import { WhatsappUseCasesList } from '@/components/sections/whatsapp/WhatsappUseCasesList';
import { MetaComplianceBlock } from '@/components/sections/whatsapp/MetaComplianceBlock';
import { WhatsappBenchmarks } from '@/components/sections/whatsapp/WhatsappBenchmarks';
import { WhatsappConversations } from '@/components/sections/whatsapp/WhatsappConversations';
import { Pricing } from '@/components/sections/Pricing';
import { Faq } from '@/components/sections/Faq';
import { FaqJsonLd } from '@/components/sections/FaqJsonLd';
import { CalEmbed } from '@/components/sections/CalEmbed';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { Eyebrow } from '@/components/primitives/Eyebrow';

interface Props {
  params: Promise<{ locale: string }>;
}

const WHATSAPP_FAQ_KEYS = [
  'metaCompliance',
  'setup',
  'number',
  'languages',
  'handoff',
  'platforms',
  'data',
  'pricing',
] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: 'whatsapp.meta' });
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';
  const pageUrl = `${url}/${locale}/whatsapp-ai-agent`;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: pageUrl,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${url}/${l}/whatsapp-ai-agent`]),
      ),
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: pageUrl,
      siteName: 'Auphere',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function WhatsappAiAgentPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const localeTyped = locale as 'en' | 'es';

  // FAQ items resolved server-side for the FAQPage JSON-LD schema
  const tFaq = await getTranslations({
    locale: locale as Locale,
    namespace: 'whatsapp.faq',
  });
  const faqItems = WHATSAPP_FAQ_KEYS.map((key) => ({
    q: tFaq(`items.${key}.q` as Parameters<typeof tFaq>[0]),
    a: tFaq(`items.${key}.a` as Parameters<typeof tFaq>[0]),
  }));

  const tMeta = await getTranslations({
    locale: locale as Locale,
    namespace: 'whatsapp.meta',
  });
  const tHero = await getTranslations({
    locale: locale as Locale,
    namespace: 'whatsapp.hero',
  });
  const tUseCases = await getTranslations({
    locale: locale as Locale,
    namespace: 'whatsapp.useCases',
  });

  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';
  const pageUrl = `${url}/${locale}/whatsapp-ai-agent`;

  const offers = (['booking', 'leadQualification', 'tracking', 'followUp', 'reminders'] as const).map((key) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: tUseCases(`items.${key}.title` as Parameters<typeof tUseCases>[0]),
      description: tUseCases(`items.${key}.body` as Parameters<typeof tUseCases>[0]),
    },
  }));

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: tMeta('title'),
    description: tMeta('description'),
    category: 'WhatsApp AI agent',
    serviceType: 'WhatsApp Business AI agent design, deployment and operations',
    provider: { '@id': `${url}/#organization` },
    url: pageUrl,
    areaServed: ['Europe', 'United States', 'Latin America'],
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'SMB and mid-market service businesses',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: tHero('headlineLine1') + ' ' + tHero('headlineLine2'),
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
      { '@type': 'ListItem', position: 1, name: 'Auphere', item: `${url}/${locale}` },
      { '@type': 'ListItem', position: 2, name: tHero('eyebrow'), item: pageUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <FaqJsonLd items={faqItems} />

      <WhatsappHero />
      <PlatformVsAgencyTable number="01" locale={localeTyped} />
      <CategoryDefinitions locale={localeTyped} />
      <WhatsappUseCasesList number="03" locale={localeTyped} />
      <MetaComplianceBlock number="04" locale={localeTyped} />
      <WhatsappConversations number="05" />
      <WhatsappBenchmarks number="06" locale={localeTyped} />
      <Pricing />
      <WhatsappQualifier locale={localeTyped} />
      <Faq items={faqItems} namespace="whatsapp.faq" sectionNumber="09" />
      <WhatsappFinalCta locale={localeTyped} />
    </>
  );
}

function WhatsappHero() {
  const t = useTranslations('whatsapp.hero');
  return (
    <MarketingHero
      eyebrow={t('eyebrow')}
      meta={t('meta')}
      kicker={t('kicker')}
      headline={[t('headlineLine1'), t('headlineLine2')]}
      subheadline={t('subheadline')}
      ctaPrimary={{ label: t('ctaPrimary'), href: '#book' }}
      ctaSecondary={{ label: t('ctaSecondary'), href: '#conversation' }}
      ctaMicrocopy={t('ctaMicrocopy')}
    />
  );
}

async function CategoryDefinitions({ locale }: { locale: 'en' | 'es' }) {
  const t = await getTranslations({ locale, namespace: 'whatsapp.category' });
  const keys = ['chatbot', 'assistant', 'agent'] as const;
  return (
    <section className="py-24 md:py-32 border-t border-[var(--color-ink-subtle)]">
      <SectionMarker number="02" label={t('marker.label')} meta={t('marker.meta')} />
      <Container width="wide">
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.03em]">
            {t('headline')}
          </h2>
          <p className="font-display font-medium text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.5] text-[var(--color-ink-muted)] mt-6">
            {t('intro')}
          </p>
        </div>
        <dl className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-ink-subtle)] rounded-2xl overflow-hidden border border-[var(--color-ink-subtle)]">
          {keys.map((k) => (
            <div
              key={k}
              className={`p-6 md:p-8 flex flex-col gap-3 ${
                k === 'agent' ? 'bg-[var(--color-bangladesh-green)] text-[var(--color-bone)]' : 'bg-[var(--color-bone)]'
              }`}
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-70">
                {locale === 'es' ? 'Categoría' : 'Category'}
              </dt>
              <dd className="font-display font-bold text-[24px] md:text-[28px] leading-[1.1] tracking-[-0.02em]">
                {t(`definitions.${k}.term`)}
              </dd>
              <p className="text-[14.5px] leading-[1.55] opacity-85">
                {t(`definitions.${k}.body`)}
              </p>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

async function WhatsappQualifier({ locale }: { locale: 'en' | 'es' }) {
  const t = await getTranslations({ locale, namespace: 'whatsapp.qualifier' });
  const yesKeys = ['yes1', 'yes2', 'yes3'] as const;
  const noKeys = ['no1', 'no2'] as const;

  return (
    <section className="py-20 md:py-28 dot-grid border-t border-[var(--color-ink-subtle)]">
      <SectionMarker number="08" label={t('marker.label')} meta={t('marker.meta')} />
      <Container width="default">
        <div className="max-w-3xl mb-10 md:mb-14">
          <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.03em]">
            {t('headline')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-mountain-meadow)] mb-6">
              {t('yesTitle')}
            </p>
            <ul className="flex flex-col gap-5">
              {yesKeys.map((k) => (
                <li key={k} className="flex items-start gap-4">
                  <svg aria-hidden className="shrink-0 mt-1.5 w-5 h-5 text-[var(--color-mountain-meadow)]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 10.5l4.5 4.5L17 5" />
                  </svg>
                  <span className="text-[17px] leading-relaxed text-[var(--color-ink)]">
                    {t(`yes.${k}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-status-danger)] mb-6">
              {t('noTitle')}
            </p>
            <ul className="flex flex-col gap-5">
              {noKeys.map((k) => (
                <li key={k} className="flex items-start gap-4">
                  <svg aria-hidden className="shrink-0 mt-1.5 w-5 h-5 text-[var(--color-status-danger)]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 5l10 10M15 5L5 15" />
                  </svg>
                  <span className="text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                    {t(`no.${k}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

async function WhatsappFinalCta({ locale }: { locale: 'en' | 'es' }) {
  const t = await getTranslations({ locale, namespace: 'whatsapp.finalCta' });
  const tHero = await getTranslations({ locale, namespace: 'whatsapp.hero' });
  return (
    <section id="book" className="relative py-20 md:py-28 surface-dark overflow-hidden border-t border-[var(--color-bone)]/10">
      <Container width="default" className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <Eyebrow variant="dark">{tHero('eyebrow')}</Eyebrow>
          <h2 className="font-display font-bold text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-[-0.03em] text-[var(--color-bone)] mt-6">
            {t('headline')}
          </h2>
          <p className="font-display font-medium text-[clamp(1.05rem,1.8vw,1.375rem)] leading-[1.4] text-[var(--color-bone)]/70 mt-5">
            {t('subheadline')}
          </p>
        </div>
        <CalEmbed />
        <p className="text-center mt-8 text-[13px] text-[var(--color-bone)]/60">
          {tHero('ctaMicrocopy')}
        </p>
      </Container>
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-bone) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
    </section>
  );
}

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Faq } from '@/components/sections/Faq';
import type { Localized } from '@/content/enterprise';
import { art50Meta, art50Hero, art50Blocks, art50Faq, art50Cta } from '@/content/regulation';
import { buttonClasses } from '@/components/primitives/Button';

interface Props {
  params: Promise<{ locale: string }>;
}

const LAST_UPDATED = '2026-08-09';
const COMMISSION_URL = 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai';
const EURLEX_URL = 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const l = locale as 'en' | 'es';
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';
  const pageUrl = `${url}/${locale}/eu-ai-act-article-50`;
  return {
    title: art50Meta.title[l],
    description: art50Meta.description[l],
    alternates: {
      canonical: pageUrl,
      languages: Object.fromEntries(routing.locales.map((loc) => [loc, `${url}/${loc}/eu-ai-act-article-50`])),
    },
    openGraph: {
      title: art50Meta.title[l],
      description: art50Meta.description[l],
      url: pageUrl,
      siteName: 'Auphere',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'article',
    },
    twitter: { card: 'summary_large_image', title: art50Meta.title[l], description: art50Meta.description[l] },
  };
}

/**
 * §6.10 — gemela EN/ES orientada a AEO: answer-first, fuentes primarias,
 * dateModified visible. El imán de enterprise EN.
 */
export default async function Article50Page({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const l = locale as 'en' | 'es';
  const pick = (text: Localized) => text[l];

  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';
  const pageUrl = `${url}/${locale}/eu-ai-act-article-50`;
  const faqItems = art50Faq.map((item) => ({ q: pick(item.q), a: pick(item.a) }));

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: art50Meta.title[l],
    description: art50Meta.description[l],
    inLanguage: l,
    dateModified: LAST_UPDATED,
    author: { '@id': `${url}/#organization` },
    publisher: { '@id': `${url}/#organization` },
    citation: [EURLEX_URL, COMMISSION_URL],
    mainEntityOfPage: pageUrl,
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden hero-y border-b border-[var(--color-ink-subtle)] dot-grid">
        <Container width="wide">
          <div className="max-w-3xl">
            <Eyebrow>{pick(art50Hero.eyebrow)}</Eyebrow>
            <h1 className="type-h1 mt-7">
              {pick(art50Hero.headline)}
            </h1>
            <p className="type-lead text-[var(--color-ink-muted)] mt-6">
              {pick(art50Hero.sub)}
            </p>
            <p className="type-meta text-[var(--color-ink-muted)] mt-7">
              {l === 'es' ? 'Actualizado el' : 'Updated'} {LAST_UPDATED} ·{' '}
              <a href={EURLEX_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[var(--color-ink)]">
                EUR-Lex 2024/1689
              </a>{' '}
              ·{' '}
              <a href={COMMISSION_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[var(--color-ink)]">
                {l === 'es' ? 'Comisión Europea' : 'European Commission'}
              </a>
            </p>
          </div>
        </Container>
      </section>

      {/* ── Answer-first blocks ── */}
      <section className="section-y">
        <SectionMarker
          number="01"
          label={l === 'es' ? 'Las respuestas' : 'The answers'}
          meta={l === 'es' ? 'Citables fuera de contexto' : 'Quotable out of context'}
        />
        <Container width="wide">
          <div className="flex flex-col gap-12 max-w-3xl">
            {art50Blocks.map((block, i) => (
              <article key={i} className="border-t border-[var(--color-ink-subtle)] pt-6">
                <h2 className="type-h3">
                  {pick(block.title)}
                </h2>
                <p className="text-[16px] leading-relaxed mt-4">{pick(block.answer)}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <Faq
        items={faqItems}
        sectionNumber="02"
        header={{
          label: 'FAQ',
          meta: l === 'es' ? 'Art. 50 · casos concretos' : 'Article 50 · concrete cases',
          headline: l === 'es' ? 'Los casos que de verdad preguntan.' : 'The cases people actually ask about.',
          intro:
            l === 'es'
              ? 'Marca blanca, voz, extraterritorialidad. Si el tuyo falta: contacto@auphere.com.'
              : 'White label, voice, extraterritoriality. If yours is missing: contacto@auphere.com.',
        }}
      />

      {/* ── CTA ── */}
      <section className="relative section-y surface-dark overflow-hidden section-edge">
        <Container width="default" className="relative z-10 text-center">
          <h2 className="type-h2 text-[var(--color-bone)] max-w-3xl mx-auto">
            {pick(art50Cta.headline)}
          </h2>
          <p className="type-intro text-[var(--color-bone)]/75 mt-5 max-w-2xl mx-auto">
            {pick(art50Cta.body)}
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`mailto:contacto@auphere.com?subject=${encodeURIComponent(l === 'es' ? 'Revisión art. 50 · 45 min' : 'Article 50 review · 45 min')}`}
              className={buttonClasses({ variant: 'inverse', size: 'lg' })}
            >
              {pick(art50Cta.cta)}
            </a>
            <Link
              href="/trust"
              className={buttonClasses({ variant: 'outline-inverse', size: 'lg' })}
            >
              {l === 'es' ? 'Nuestra postura en /trust' : 'Our posture at /trust'}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

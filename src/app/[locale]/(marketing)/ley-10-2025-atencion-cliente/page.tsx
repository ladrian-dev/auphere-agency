import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Faq } from '@/components/sections/Faq';
import { ApplicabilityTest } from '@/components/sections/regulation/ApplicabilityTest';
import {
  LEY_DEADLINE_ISO,
  BOE_URL,
  leyMeta,
  leyHero,
  applicabilityTest,
  leyObligations,
  leyMistakes,
  leyCompliance,
  leyChecklist,
  leyFaq,
  leyCta,
} from '@/content/regulation';

interface Props {
  params: Promise<{ locale: string }>;
}

/**
 * §6.9 — la página con más intención comercial del sitio. ES-only (D-11):
 * la Ley 10/2025 es española; no existe gemela EN.
 *
 * ISR diario: el contador de días se server-renderiza sin JS crítico y se
 * regenera cada 24 h.
 */
export const revalidate = 86400;

const LAST_UPDATED = '2026-08-09';

export function generateStaticParams() {
  return [{ locale: 'es' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'es') return {};
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';
  const pageUrl = `${url}/es/ley-10-2025-atencion-cliente`;
  return {
    title: leyMeta.title,
    description: leyMeta.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: leyMeta.title,
      description: leyMeta.description,
      url: pageUrl,
      siteName: 'Auphere',
      locale: 'es_ES',
      type: 'article',
    },
    twitter: { card: 'summary_large_image', title: leyMeta.title, description: leyMeta.description },
  };
}

function daysUntilDeadline(): number {
  const deadline = new Date(LEY_DEADLINE_ISO).getTime();
  return Math.max(0, Math.ceil((deadline - Date.now()) / 86_400_000));
}

export default async function Ley102025Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'es') notFound();
  setRequestLocale(locale);

  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';
  const pageUrl = `${url}/es/ley-10-2025-atencion-cliente`;
  const days = daysUntilDeadline();
  const faqItems = leyFaq.map((item) => ({ q: item.q, a: item.a }));

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: leyMeta.title,
    description: leyMeta.description,
    inLanguage: 'es',
    dateModified: LAST_UPDATED,
    author: { '@id': `${url}/#organization` },
    publisher: { '@id': `${url}/#organization` },
    citation: BOE_URL,
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
  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `${leyChecklist.headline} — Ley 10/2025`,
    inLanguage: 'es',
    step: leyChecklist.items.map((item, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: item,
    })),
  };

  const mailtoChecklist = `mailto:contacto@auphere.com?subject=${encodeURIComponent('Checklist Ley 10/2025 en PDF')}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />

      {/* ── 01 · HERO + contador ── */}
      <section className="relative overflow-hidden pt-36 md:pt-44 pb-16 md:pb-20 border-b border-[var(--color-ink-subtle)] dot-grid">
        <Container width="wide">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-start">
            <div className="max-w-3xl">
              <Eyebrow>{leyHero.eyebrow}</Eyebrow>
              <h1 className="font-display font-bold leading-[1.05] tracking-[-0.03em] text-[clamp(2.1rem,4.6vw,3.6rem)] mt-7">
                {leyHero.headline}
              </h1>
              <p className="font-display font-medium text-[clamp(1.02rem,1.7vw,1.3rem)] leading-[1.5] text-[var(--color-ink-muted)] mt-5">
                {leyHero.sub}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#revision"
                  className="inline-flex items-center justify-center h-[52px] px-[28px] rounded-full font-medium text-[15px] tracking-tight bg-[var(--color-ink)] text-[var(--color-bone)] hover:bg-[var(--color-bangladesh-green)] transition-colors duration-200 ease-out active:scale-[0.98]"
                >
                  {leyHero.cta}
                </a>
                <a
                  href={BOE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-[52px] px-[24px] rounded-full font-medium text-[15px] tracking-tight border border-[var(--color-ink-subtle)] text-[var(--color-ink-muted)] hover:border-[var(--color-ink-dim)] hover:text-[var(--color-ink)] transition-colors"
                >
                  {leyHero.ctaSecondary}
                </a>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)] mt-6">
                Actualizado el {LAST_UPDATED} · Fuente primaria: BOE-A-2025-26698
              </p>
            </div>

            {/* Contador — server-rendered, sin JS */}
            <div className="rounded-2xl border border-[var(--color-ink-subtle)] bg-[var(--color-bone)] px-10 py-8 text-center shadow-[var(--shadow-2)] shrink-0">
              <p className="font-display font-bold text-[72px] leading-none tracking-[-0.04em] text-[var(--color-bangladesh-green)]">
                {days}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)] mt-3">
                {leyHero.daysLabel}
              </p>
              <p className="font-mono text-[11px] text-[var(--color-ink-dim)] mt-1">28 · 12 · 2026</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 02 · ¿Te aplica? ── */}
      <section className="py-16 md:py-24">
        <Container width="default">
          <ApplicabilityTest
            headline={applicabilityTest.headline}
            intro={applicabilityTest.intro}
            questions={applicabilityTest.questions}
            verdictApplies={applicabilityTest.verdictApplies}
            verdictMaybe={applicabilityTest.verdictMaybe}
            note={applicabilityTest.note}
            yesLabel="Sí"
            noLabel="No"
          />
        </Container>
      </section>

      {/* ── 03 · Qué obliga ── */}
      <section className="py-16 md:py-24 border-t border-[var(--color-ink-subtle)]">
        <SectionMarker number="03" label="Qué obliga" meta="Art. 8.2 · answer-first" />
        <Container width="default">
          <h2 className="font-display font-bold text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.08] tracking-[-0.025em] max-w-3xl">
            {leyObligations.headline}
          </h2>
          <p className="text-[16.5px] leading-relaxed mt-5 max-w-3xl">{leyObligations.answer}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {leyObligations.items.map((item, i) => (
              <div key={i} className="border-t border-[var(--color-ink-subtle)] pt-5">
                <h3 className="font-display font-semibold text-[17px] tracking-[-0.01em]">{item.title}</h3>
                <p className="text-[14px] leading-relaxed text-[var(--color-ink-muted)] mt-2.5">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 04 · Qué NO es suficiente ── */}
      <section className="py-16 md:py-24 border-t border-[var(--color-ink-subtle)]">
        <SectionMarker number="04" label="Los tres errores" meta="Lo que no cuenta como humano" />
        <Container width="default">
          <h2 className="font-display font-bold text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.08] tracking-[-0.025em] max-w-3xl">
            {leyMistakes.headline}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {leyMistakes.items.map((item, i) => (
              <div key={i} className="rounded-2xl border border-[var(--color-status-danger)]/25 bg-[var(--color-status-danger)]/[0.04] p-6">
                <h3 className="font-display font-semibold text-[16.5px] tracking-[-0.01em]">{item.title}</h3>
                <p className="text-[14px] leading-relaxed text-[var(--color-ink-muted)] mt-2.5">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 05 · Cómo lo cumple Auphere ── */}
      <section className="py-16 md:py-24 border-t border-[var(--color-ink-subtle)] surface-dark">
        <SectionMarker number="05" label="Cómo se cumple" meta="Construido, no prometido" variant="dark" />
        <Container width="default">
          <h2 className="font-display font-bold text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.08] tracking-[-0.025em] max-w-3xl text-[var(--color-bone)]">
            {leyCompliance.headline}
          </h2>
          <p className="text-[16.5px] leading-relaxed mt-5 max-w-3xl text-[var(--color-bone)]/80">{leyCompliance.answer}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {leyCompliance.items.map((item, i) => (
              <div key={i} className="border-t border-[var(--color-bone)]/20 pt-5">
                <h3 className="font-display font-semibold text-[17px] tracking-[-0.01em] text-[var(--color-bone)]">{item.title}</h3>
                <p className="text-[14px] leading-relaxed text-[var(--color-bone)]/65 mt-2.5">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 07 · Checklist inline (sin muros) ── */}
      <section className="py-16 md:py-24 border-t border-[var(--color-ink-subtle)]">
        <SectionMarker number="06" label="Checklist" meta="Publicada entera · PDF opcional" />
        <Container width="default">
          <div className="max-w-3xl">
            <h2 className="font-display font-bold text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.08] tracking-[-0.025em]">
              {leyChecklist.headline}
            </h2>
            <p className="text-[var(--color-ink-muted)] mt-4">{leyChecklist.intro}</p>
            <ol className="mt-8 flex flex-col gap-4">
              {leyChecklist.items.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span aria-hidden className="font-mono text-[12px] tracking-[0.14em] text-[var(--color-bangladesh-green)] mt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[15.5px] leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8">
              <a href={mailtoChecklist} className="font-medium text-[14.5px] text-[var(--color-bangladesh-green)] hover:underline underline-offset-4">
                {leyChecklist.requestPdf} →
              </a>
            </p>
          </div>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <Faq
        items={faqItems}
        sectionNumber="07"
        header={{
          label: 'FAQ',
          meta: 'Ley 10/2025 · respuestas planas',
          headline: 'Lo que preguntan antes de mover ficha.',
          intro: 'Si tu caso es raro, escríbenos: contacto@auphere.com.',
        }}
      />

      {/* ── CTA ── */}
      <section id="revision" className="relative py-20 md:py-24 surface-dark overflow-hidden border-t border-[var(--color-bone)]/10">
        <Container width="default" className="relative z-10 text-center">
          <h2 className="font-display font-bold text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05] tracking-[-0.03em] text-[var(--color-bone)] max-w-3xl mx-auto">
            {leyCta.headline}
          </h2>
          <p className="font-display font-medium text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.45] text-[var(--color-bone)]/70 mt-5 max-w-2xl mx-auto">
            {leyCta.body}
          </p>
          <div className="mt-9">
            <a
              href={`mailto:contacto@auphere.com?subject=${encodeURIComponent('Revisión de cumplimiento Ley 10/2025 · 45 min')}`}
              className="inline-flex items-center justify-center h-[52px] px-[32px] rounded-full font-medium text-[15px] tracking-tight bg-[var(--color-bone)] text-[var(--color-ink)] hover:bg-[var(--color-caribbean-green)] transition-colors duration-200 ease-out active:scale-[0.98]"
            >
              {leyHero.cta}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}

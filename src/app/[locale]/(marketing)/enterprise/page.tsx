import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { ControlList } from '@/components/sections/ControlList';
import { GuaranteeTable, type GuaranteeRowResolved } from '@/components/sections/enterprise/GuaranteeTable';
import { Faq } from '@/components/sections/Faq';
import { CalEmbed } from '@/components/sections/CalEmbed';
import { getClaim } from '@/content/claims';
import {
  enterpriseMeta,
  enterpriseHero,
  guaranteeRows,
  guaranteeFootnote,
  complianceItems,
  isolationControls,
  measurement,
  pricingGated,
  launchProgram,
  processWeeks,
  enterpriseFaq,
  enterpriseFaqHeader,
  enterpriseFinalCta,
  type Localized,
} from '@/content/enterprise';

interface Props {
  params: Promise<{ locale: string }>;
}

const CAL_LINK_ENTERPRISE =
  process.env.NEXT_PUBLIC_CAL_LINK_ENTERPRISE ||
  process.env.NEXT_PUBLIC_CAL_LINK ||
  'auphere-team/diagnostico-auphere-30-min-sin-coste';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const l = locale as 'en' | 'es';
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';
  const pageUrl = `${url}/${locale}/enterprise`;
  return {
    title: enterpriseMeta.title[l],
    description: enterpriseMeta.description[l],
    alternates: {
      canonical: pageUrl,
      languages: Object.fromEntries(routing.locales.map((loc) => [loc, `${url}/${loc}/enterprise`])),
    },
    openGraph: {
      title: enterpriseMeta.title[l],
      description: enterpriseMeta.description[l],
      url: pageUrl,
      siteName: 'Auphere',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: enterpriseMeta.title[l], description: enterpriseMeta.description[l] },
  };
}

export default async function EnterprisePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const l = locale as 'en' | 'es';
  const pick = (text: Localized) => text[l];

  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';
  const pageUrl = `${url}/${locale}/enterprise`;

  // 02 — guarantee rows resolved against claims.ts (the CI-enforced law).
  const resolvedRows: GuaranteeRowResolved[] = guaranteeRows.map((row) => {
    const claim = getClaim(row.claimId);
    if (claim.status === 'blocked') {
      throw new Error(`/enterprise: claim "${claim.id}" is blocked and cannot appear in the guarantee table`);
    }
    return {
      label: pick(row.label),
      note: row.note ? pick(row.note) : undefined,
      status: claim.status as 'live' | 'dated',
      dateText: claim.publishAs ? pick(claim.publishAs) : undefined,
    };
  });

  const faqItems = enterpriseFaq.map((item) => ({ q: pick(item.q), a: pick(item.a) }));

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: enterpriseMeta.title[l],
    description: enterpriseMeta.description[l],
    serviceType: 'Managed AI agents for enterprise — operated AI infrastructure',
    provider: { '@id': `${url}/#organization` },
    url: pageUrl,
    areaServed: ['Europe', 'United States', 'Latin America'],
    audience: { '@type': 'BusinessAudience', audienceType: 'Enterprise CX, Operations and IT' },
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

  const mailtoSecurity = `mailto:${enterpriseFinalCta.contactEmail}?subject=${encodeURIComponent(
    l === 'es' ? 'Cuestionario de seguridad — Auphere' : 'Security questionnaire — Auphere',
  )}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* ── 01 · HERO — tono de reducción de riesgo, sobre surface-deep ── */}
      <section className="surface-deep relative overflow-hidden pt-36 md:pt-44 pb-20 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(241,247,246,0.35) 1px, transparent 0)',
            backgroundSize: '22px 22px',
          }}
        />
        <Container width="wide" className="relative z-10">
          <div className="max-w-3xl">
            <Eyebrow variant="dark">{pick(enterpriseHero.eyebrow)}</Eyebrow>
            <h1 className="font-display font-bold leading-[1.04] tracking-[-0.035em] text-[clamp(2.25rem,4.6vw,3.9rem)] mt-7">
              {pick(enterpriseHero.headline)}
            </h1>
            <p className="font-display font-medium text-[clamp(1.05rem,1.7vw,1.3rem)] leading-[1.45] opacity-75 mt-6 max-w-2xl">
              {pick(enterpriseHero.subheadline)}
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <a
                href="#book"
                className="inline-flex items-center justify-center gap-2 h-[52px] px-[28px] rounded-full font-medium text-[15px] tracking-tight whitespace-nowrap bg-[var(--color-bone)] text-[var(--color-ink)] hover:bg-[var(--color-caribbean-green)] active:scale-[0.98] transition-[background-color,transform] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-caribbean-green)]"
              >
                {pick(enterpriseHero.ctaPrimary)}
              </a>
              <a
                href={mailtoSecurity}
                className="inline-flex items-center justify-center gap-2 h-[52px] px-[24px] rounded-full font-medium text-[15px] tracking-tight whitespace-nowrap border border-[var(--color-bone)]/30 hover:border-[var(--color-bone)]/60 transition-colors"
              >
                {pick(enterpriseHero.ctaSecondary)}
              </a>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-50 mt-6">
              {pick(enterpriseHero.microcopy)}
            </p>
          </div>
        </Container>
      </section>

      {/* ── 02 · QUÉ TE GARANTIZAMOS POR ESCRITO ── */}
      <section className="surface-deep py-20 md:py-28 border-t border-[var(--color-bone)]/10">
        <SectionMarker
          number="02"
          label={l === 'es' ? 'Garantías' : 'Guarantees'}
          meta={l === 'es' ? 'Qué se cumple hoy · qué llega y cuándo' : 'What holds today · what lands and when'}
        />
        <Container width="wide">
          <div className="max-w-3xl mb-10 md:mb-14">
            <h2 className="font-display font-bold text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
              {l === 'es' ? 'Qué te garantizamos por escrito.' : 'What we guarantee in writing.'}
            </h2>
            <p className="opacity-70 mt-5 leading-relaxed max-w-2xl">
              {l === 'es'
                ? 'Lo contraintuitivo convierte: publicamos también lo que aún no existe, con su fecha. El silencio es lo que mata estos proyectos.'
                : 'The counterintuitive thing is what closes: we also publish what does not exist yet, with its date. Silence is what kills these projects.'}
            </p>
          </div>
          <GuaranteeTable
            rows={resolvedRows}
            footnote={pick(guaranteeFootnote)}
            todayLabel={l === 'es' ? 'Hoy' : 'Today'}
            columnGuarantee={l === 'es' ? 'Garantía' : 'Guarantee'}
            columnStatus={l === 'es' ? 'Estado · fecha' : 'Status · date'}
          />
        </Container>
      </section>

      {/* ── 03 · CUMPLIMIENTO ── */}
      <section className="surface-deep py-20 md:py-28 border-t border-[var(--color-bone)]/10">
        <SectionMarker
          number="03"
          label={l === 'es' ? 'Cumplimiento' : 'Compliance'}
          meta={l === 'es' ? 'Art. 50 · Ley 10/2025 · por diseño' : 'Art. 50 · Ley 10/2025 · by design'}
        />
        <Container width="wide">
          <div className="max-w-3xl mb-10 md:mb-14">
            <h2 className="font-display font-bold text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
              {l === 'es' ? 'Cumple por diseño. Y lo dice de frente.' : 'Compliant by design. And upfront about it.'}
            </h2>
          </div>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-5xl">
            {complianceItems.map((item, i) => (
              <div key={i} className={i === 0 ? 'md:col-span-2 max-w-3xl' : undefined}>
                <dt className="font-display font-semibold text-[17px] leading-snug tracking-[-0.01em]">
                  {pick(item.title)}
                </dt>
                <dd className="text-[14.5px] leading-relaxed opacity-70 mt-2.5">{pick(item.body)}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ── 04 · AISLAMIENTO — el detalle que nadie enseña ── */}
      <section className="surface-deep py-20 md:py-28 border-t border-[var(--color-bone)]/10">
        <SectionMarker
          number="04"
          label={l === 'es' ? 'Aislamiento' : 'Isolation'}
          meta={l === 'es' ? '9 controles, con el mecanismo' : '9 controls, with the mechanism'}
        />
        <Container width="wide">
          <div className="max-w-3xl mb-10 md:mb-14">
            <h2 className="font-display font-bold text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
              {l === 'es' ? 'El detalle que tu equipo de seguridad sabe valorar.' : 'The detail your security team knows how to value.'}
            </h2>
            <p className="opacity-70 mt-5 leading-relaxed max-w-2xl">
              {l === 'es'
                ? 'No un badge: cada control con su mecanismo. La versión técnica completa vive en /trust y en el cuestionario de seguridad.'
                : 'Not a badge: every control with its mechanism. The full technical version lives at /trust and in the security questionnaire.'}
            </p>
          </div>
          <div style={{ ['--control-cell-bg' as string]: 'color-mix(in srgb, var(--color-bone) 4%, transparent)' }}>
            <ControlList controls={isolationControls.map((c) => ({ name: pick(c.name), mechanism: pick(c.mechanism) }))} />
          </div>
        </Container>
      </section>

      {/* ── 05 · CÓMO SE MIDE + 06 · PRECIO gated ── */}
      <section className="surface-deep py-20 md:py-28 border-t border-[var(--color-bone)]/10">
        <SectionMarker number="05" label={l === 'es' ? 'Medición · Precio' : 'Measurement · Pricing'} meta="Evals · blueprint" />
        <Container width="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-5xl">
            <div>
              <h2 className="font-display font-bold text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.1] tracking-[-0.02em]">
                {pick(measurement.headline)}
              </h2>
              <p className="text-[14.5px] leading-relaxed opacity-70 mt-4">{pick(measurement.body)}</p>
            </div>
            <div>
              <h2 className="font-display font-bold text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.1] tracking-[-0.02em]">
                {pick(pricingGated.headline)}
              </h2>
              <p className="text-[14.5px] leading-relaxed opacity-70 mt-4">{pick(pricingGated.body)}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 07 · PROGRAMA DE LANZAMIENTO ── */}
      <section className="surface-deep py-20 md:py-28 border-t border-[var(--color-bone)]/10">
        <SectionMarker number="07" label={l === 'es' ? 'Programa de lanzamiento' : 'Launch program'} meta="3-5 cuentas" />
        <Container width="wide">
          <div className="max-w-3xl mb-10">
            <h2 className="font-display font-bold text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
              {pick(launchProgram.headline)}
            </h2>
            <p className="opacity-70 mt-5 leading-relaxed">{pick(launchProgram.intro)}</p>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
            {launchProgram.items.map((item, i) => (
              <li key={i} className="flex items-start gap-4 rounded-xl border border-[var(--color-bone)]/12 p-5">
                <span aria-hidden className="font-mono text-[11px] tracking-[0.18em] opacity-45 mt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[15px] leading-relaxed opacity-85">{pick(item)}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── 08 · PROCESO ── */}
      <section className="surface-deep py-20 md:py-28 border-t border-[var(--color-bone)]/10">
        <SectionMarker number="08" label={l === 'es' ? 'Proceso' : 'Process'} meta={l === 'es' ? 'Semana a semana' : 'Week by week'} />
        <Container width="wide">
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl">
            {processWeeks.map((step, i) => (
              <li key={i} className="flex flex-col gap-3 border-t border-[var(--color-bone)]/20 pt-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-caribbean-green)]">
                  {pick(step.period)}
                </span>
                <h3 className="font-display font-semibold text-[17px] leading-snug">{pick(step.title)}</h3>
                <p className="text-[13.5px] leading-relaxed opacity-65">{pick(step.body)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── 09 · FAQ — cambio a superficie clara para lectura larga ── */}
      <div className="surface-light">
        <Faq
          items={faqItems}
          sectionNumber="09"
          header={{
            label: pick(enterpriseFaqHeader.label),
            meta: pick(enterpriseFaqHeader.meta),
            headline: pick(enterpriseFaqHeader.headline),
            intro: pick(enterpriseFaqHeader.intro),
          }}
        />
      </div>

      {/* ── 10 · CTA FINAL + contacto con nombre y cargo ── */}
      <section id="book" className="relative py-20 md:py-28 surface-dark overflow-hidden border-t border-[var(--color-bone)]/10">
        <Container width="default" className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <Eyebrow variant="dark">{pick(enterpriseHero.eyebrow)}</Eyebrow>
            <h2 className="font-display font-bold text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-[-0.03em] text-[var(--color-bone)] mt-6">
              {pick(enterpriseFinalCta.headline)}
            </h2>
            <p className="font-display font-medium text-[clamp(1.05rem,1.8vw,1.375rem)] leading-[1.4] text-[var(--color-bone)]/70 mt-5">
              {pick(enterpriseFinalCta.body)}
            </p>
          </div>
          <CalEmbed calLink={CAL_LINK_ENTERPRISE} />
          <p className="text-center mt-8 text-[13px] text-[var(--color-bone)]/60">
            {enterpriseFinalCta.contactName} · {pick(enterpriseFinalCta.contactRole)} ·{' '}
            <a className="underline hover:text-[var(--color-bone)]" href={`mailto:${enterpriseFinalCta.contactEmail}`}>
              {enterpriseFinalCta.contactEmail}
            </a>
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
    </>
  );
}

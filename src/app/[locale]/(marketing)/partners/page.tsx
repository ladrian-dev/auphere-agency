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
import { PartnerApplicationForm } from '@/components/sections/partners/PartnerApplicationForm';
import type { Localized } from '@/content/enterprise';
import {
  partnersMeta,
  partnersHero,
  partnerTracks,
  economicsGated,
  deliverables,
  cobranding,
  supportSplit,
  tiers,
  partnerProcess,
  partnersFaq,
  partnersFaqHeader,
  applyForm,
  partnersFinalCta,
} from '@/content/partners';

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const l = locale as 'en' | 'es';
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';
  const pageUrl = `${url}/${locale}/partners`;
  return {
    title: partnersMeta.title[l],
    description: partnersMeta.description[l],
    alternates: {
      canonical: pageUrl,
      languages: Object.fromEntries(routing.locales.map((loc) => [loc, `${url}/${loc}/partners`])),
    },
    openGraph: {
      title: partnersMeta.title[l],
      description: partnersMeta.description[l],
      url: pageUrl,
      siteName: 'Auphere',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: partnersMeta.title[l], description: partnersMeta.description[l] },
  };
}

export default async function PartnersPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const l = locale as 'en' | 'es';
  const pick = (text: Localized) => text[l];

  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';
  const pageUrl = `${url}/${locale}/partners`;
  const faqItems = partnersFaq.map((item) => ({ q: pick(item.q), a: pick(item.a) }));

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: partnersMeta.title[l],
    description: partnersMeta.description[l],
    serviceType: 'AI agent partner program — white label and embedded AI as a Service',
    provider: { '@id': `${url}/#organization` },
    url: pageUrl,
    audience: { '@type': 'BusinessAudience', audienceType: 'Agencies, integrators, MSPs and SaaS products' },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* ── 01 · HERO — tres CTAs (patrón Cognigy) ── */}
      <section
        className="relative overflow-hidden pt-36 md:pt-44 pb-20 md:pb-28"
        style={{
          background:
            'radial-gradient(120% 90% at 100% 50%, var(--color-bangladesh-green) 0%, var(--color-pine) 55%, var(--color-ink) 100%)',
        }}
      >
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
            <Eyebrow variant="dark">{pick(partnersHero.eyebrow)}</Eyebrow>
            <h1 className="font-display font-bold leading-[1.04] tracking-[-0.035em] text-[var(--color-bone)] text-[clamp(2.25rem,4.8vw,4rem)] mt-7">
              {pick(partnersHero.headline)}
            </h1>
            <p className="font-display font-medium text-[clamp(1.05rem,1.7vw,1.3rem)] leading-[1.45] text-[var(--color-bone)]/70 mt-6 max-w-2xl">
              {pick(partnersHero.subheadline)}
            </p>
            <div className="mt-9 flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href="#apply"
                className="inline-flex items-center justify-center gap-2 h-[52px] px-[28px] rounded-full font-medium text-[15px] tracking-tight whitespace-nowrap bg-[var(--color-bone)] text-[var(--color-ink)] hover:bg-[var(--color-caribbean-green)] active:scale-[0.98] transition-[background-color,transform] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-caribbean-green)]"
              >
                {pick(partnersHero.ctaPrimary)}
              </a>
              <a
                href="#tracks"
                className="inline-flex items-center justify-center gap-2 h-[52px] px-[24px] rounded-full font-medium text-[15px] tracking-tight whitespace-nowrap border border-[var(--color-bone)]/30 text-[var(--color-bone)] hover:border-[var(--color-bone)]/60 transition-colors"
              >
                {pick(partnersHero.ctaSecondary)}
              </a>
              <Link
                href="/docs"
                className="inline-flex items-center justify-center gap-2 h-[52px] px-[24px] rounded-full font-medium text-[15px] tracking-tight whitespace-nowrap border border-[var(--color-bone)]/30 text-[var(--color-bone)] hover:border-[var(--color-bone)]/60 transition-colors"
              >
                {pick(partnersHero.ctaTertiary)}
              </Link>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-bone)]/50 mt-6">
              {pick(partnersHero.microcopy)}
            </p>
          </div>
        </Container>
      </section>

      {/* ── 02 · TRES VÍAS CON VERBOS ── */}
      <section id="tracks" className="py-24 md:py-32">
        <SectionMarker number="02" label={l === 'es' ? 'Tres vías' : 'Three tracks'} meta={l === 'es' ? 'Elige con un verbo' : 'Pick by verb'} />
        <Container width="wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-ink-subtle)] rounded-2xl overflow-hidden border border-[var(--color-ink-subtle)]">
            {partnerTracks.map((track) => (
              <div key={track.id} className="bg-[var(--color-bone)] p-7 md:p-8 flex flex-col gap-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-bangladesh-green)]">
                  {pick(track.name)}
                </p>
                <h2 className="font-display font-bold text-[28px] md:text-[32px] leading-[1.05] tracking-[-0.02em]">
                  {pick(track.verb)}
                </h2>
                <p className="font-accent italic text-[14px] text-[var(--color-ink-muted)]">{pick(track.forWho)}</p>
                <p className="text-[14.5px] leading-relaxed text-[var(--color-ink-muted)] flex-1">{pick(track.body)}</p>
                {track.href.startsWith('/') ? (
                  <Link href={track.href} className="font-medium text-[14.5px] text-[var(--color-bangladesh-green)] hover:underline underline-offset-4">
                    {pick(track.cta)}
                  </Link>
                ) : (
                  <a href={track.href} className="font-medium text-[14.5px] text-[var(--color-bangladesh-green)] hover:underline underline-offset-4">
                    {pick(track.cta)}
                  </a>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 03 · ECONOMÍA ⏸ gated ── */}
      <section className="py-20 md:py-28 border-t border-[var(--color-ink-subtle)] dot-grid">
        <SectionMarker number="03" label={l === 'es' ? 'Economía' : 'Economics'} meta="⏸ tramos en la llamada" />
        <Container width="default">
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-start max-w-4xl">
            <div className="rounded-2xl border border-[var(--color-ink-subtle)] bg-[var(--color-bone)] px-8 py-7 text-center shadow-[var(--shadow-2)]">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                {pick(economicsGated.entryFee.label)}
              </p>
              <p className="font-display font-bold text-[56px] leading-none tracking-[-0.04em] text-[var(--color-bangladesh-green)] mt-3">
                {economicsGated.entryFee.value}
              </p>
              <p className="text-[12.5px] text-[var(--color-ink-muted)] mt-3">{pick(economicsGated.entryFee.note)}</p>
            </div>
            <div>
              <h2 className="font-display font-bold text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.08] tracking-[-0.025em]">
                {pick(economicsGated.headline)}
              </h2>
              <p className="text-[15.5px] leading-relaxed text-[var(--color-ink-muted)] mt-5">{pick(economicsGated.gatedBody)}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 05 · QUÉ RECIBES Y CUÁNDO ── */}
      <section className="py-20 md:py-28 border-t border-[var(--color-ink-subtle)]">
        <SectionMarker number="04" label={l === 'es' ? 'Qué recibes' : 'What you get'} meta={l === 'es' ? 'Cada entregable con su fecha' : 'Every deliverable with its date'} />
        <Container width="default">
          <div className="max-w-3xl mb-10">
            <h2 className="font-display font-bold text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
              {l === 'es' ? 'Qué recibes, y cuándo.' : 'What you get, and when.'}
            </h2>
            <p className="text-[var(--color-ink-muted)] mt-5 leading-relaxed">
              {l === 'es'
                ? 'Un partner fundador tolera que la consola llegue en el mes 5 si se lo dices. No tolera descubrirlo.'
                : 'A founding partner tolerates the console landing in month 5 if you tell them. They do not tolerate discovering it.'}
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--color-ink-subtle)] overflow-hidden">
            {deliverables.map((row, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 sm:gap-6 px-5 md:px-7 py-4 border-b border-[var(--color-ink-subtle)] last:border-b-0 bg-[var(--color-bone)]">
                <p className="text-[15px] leading-snug">{pick(row.label)}</p>
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.14em] sm:text-right"
                  style={{ color: row.status === 'today' ? 'var(--color-data-positive)' : 'var(--color-data-pending)' }}
                >
                  {row.status === 'today' ? (l === 'es' ? 'Hoy' : 'Today') : pick(row.dateText!)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 06 · CO-BRANDED + 07 · SOPORTE ── */}
      <section className="py-20 md:py-28 border-t border-[var(--color-ink-subtle)]">
        <SectionMarker number="05" label={l === 'es' ? 'Marca y soporte' : 'Brand & support'} meta={l === 'es' ? 'Superficie por superficie' : 'Surface by surface'} />
        <Container width="wide">
          <div className="max-w-3xl mb-12">
            <h2 className="font-display font-bold text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
              {pick(cobranding.headline)}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mb-16">
            {[cobranding.yours, cobranding.ours].map((side, idx) => (
              <div key={idx} className={idx === 0 ? 'rounded-2xl border border-[var(--color-ink-subtle)] p-7' : 'rounded-2xl bg-[var(--color-bangladesh-green)] text-[var(--color-bone)] p-7'}>
                <h3 className="font-display font-semibold text-[18px] tracking-[-0.01em]">{pick(side.title)}</h3>
                <ul className="mt-5 flex flex-col gap-3.5">
                  {side.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14.5px] leading-relaxed opacity-90">
                      <span aria-hidden className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: idx === 0 ? 'var(--color-bangladesh-green)' : 'var(--color-caribbean-green)' }} />
                      {pick(item)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-5xl">
            {[supportSplit.you, supportSplit.us].map((side, idx) => (
              <div key={idx}>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)] border-b border-[var(--color-ink-subtle)] pb-3">
                  {pick(side.title)}
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {side.items.map((item, i) => (
                    <li key={i} className="text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                      {pick(item)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 08 · TIERS (solo Node) + 09 · PROCESO ── */}
      <section className="py-20 md:py-28 border-t border-[var(--color-ink-subtle)] dot-grid">
        <SectionMarker number="06" label={l === 'es' ? 'Tiers · Proceso' : 'Tiers · Process'} meta={l === 'es' ? 'Tiempos honestos' : 'Honest timelines'} />
        <Container width="wide">
          <div className="max-w-3xl mb-14">
            <h2 className="font-display font-bold text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
              {pick(tiers.headline)}
            </h2>
            <p className="text-[var(--color-ink-muted)] mt-5 leading-relaxed">{pick(tiers.body)}</p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnerProcess.map((step, i) => (
              <li key={i} className="flex flex-col gap-3 border-t border-[var(--color-ink)]/15 pt-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-bangladesh-green)]">
                  {pick(step.period)}
                </span>
                <h3 className="font-display font-semibold text-[17px] leading-snug">{pick(step.title)}</h3>
                <p className="text-[13.5px] leading-relaxed text-[var(--color-ink-muted)]">{pick(step.body)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── 10 · FAQ contractual ── */}
      <Faq
        items={faqItems}
        sectionNumber="07"
        header={{
          label: pick(partnersFaqHeader.label),
          meta: pick(partnersFaqHeader.meta),
          headline: pick(partnersFaqHeader.headline),
          intro: pick(partnersFaqHeader.intro),
        }}
      />

      {/* ── 11 · FORMULARIO ── */}
      <section id="apply" className="py-20 md:py-28 border-t border-[var(--color-ink-subtle)]">
        <SectionMarker number="08" label={l === 'es' ? 'Aplicar' : 'Apply'} meta={l === 'es' ? '8 campos · 48 h' : '8 fields · 48 h'} />
        <Container width="default">
          <div className="max-w-3xl mb-10">
            <h2 className="font-display font-bold text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
              {pick(applyForm.headline)}
            </h2>
            <p className="text-[var(--color-ink-muted)] mt-5 leading-relaxed">{pick(applyForm.intro)}</p>
          </div>
          <div className="max-w-3xl">
            <PartnerApplicationForm
              locale={l}
              copy={{
                fields: {
                  name: pick(applyForm.fields.name),
                  email: pick(applyForm.fields.email),
                  company: pick(applyForm.fields.company),
                  website: pick(applyForm.fields.website),
                  clients: pick(applyForm.fields.clients),
                  vertical: pick(applyForm.fields.vertical),
                  country: pick(applyForm.fields.country),
                  notes: pick(applyForm.fields.notes),
                },
                clientOptions: applyForm.clientOptions.map((o) => ({ value: o.value, label: pick(o.label) })),
                verticalOptions: applyForm.verticalOptions.map((o) => ({ value: o.value, label: pick(o.label) })),
                submit: pick(applyForm.submit),
                sending: pick(applyForm.sending),
                success: pick(applyForm.success),
                error: pick(applyForm.error),
                requiredMsg: pick(applyForm.validation.required),
                emailMsg: pick(applyForm.validation.email),
              }}
            />
          </div>
        </Container>
      </section>

      {/* ── CTA final ── */}
      <section className="relative py-20 md:py-28 surface-dark overflow-hidden border-t border-[var(--color-bone)]/10">
        <Container width="default" className="relative z-10 text-center">
          <Eyebrow variant="dark">{pick(partnersHero.eyebrow)}</Eyebrow>
          <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.03em] text-[var(--color-bone)] mt-6 max-w-3xl mx-auto">
            {pick(partnersFinalCta.headline)}
          </h2>
          <p className="font-display font-medium text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.45] text-[var(--color-bone)]/85 mt-5 max-w-2xl mx-auto">
            {pick(partnersFinalCta.body)}
          </p>
          <div className="mt-9">
            <a
              href="#apply"
              className="inline-flex items-center justify-center h-[52px] px-[32px] rounded-full font-medium text-[15px] tracking-tight bg-[var(--color-bone)] text-[var(--color-ink)] hover:bg-[var(--color-caribbean-green)] transition-colors duration-200 ease-out active:scale-[0.98]"
            >
              {pick(partnersHero.ctaPrimary)}
            </a>
          </div>
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

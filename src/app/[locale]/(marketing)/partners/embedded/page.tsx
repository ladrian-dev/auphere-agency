import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import type { Localized } from '@/content/enterprise';
import {
  embeddedMeta,
  embeddedHero,
  apiPieces,
  apiPiecesDate,
  embeddedHonesty,
  embeddedExtras,
  embeddedCta,
} from '@/content/embedded';

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
  const pageUrl = `${url}/${locale}/partners/embedded`;
  return {
    title: embeddedMeta.title[l],
    description: embeddedMeta.description[l],
    alternates: {
      canonical: pageUrl,
      languages: Object.fromEntries(routing.locales.map((loc) => [loc, `${url}/${loc}/partners/embedded`])),
    },
    openGraph: {
      title: embeddedMeta.title[l],
      description: embeddedMeta.description[l],
      url: pageUrl,
      siteName: 'Auphere',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: embeddedMeta.title[l], description: embeddedMeta.description[l] },
  };
}

export default async function EmbeddedPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const l = locale as 'en' | 'es';
  const pick = (text: Localized) => text[l];

  const mailtoEngineering = `mailto:contacto@auphere.com?subject=${encodeURIComponent(
    l === 'es' ? 'Embedded · integración en producto' : 'Embedded · product integration',
  )}`;

  return (
    <>
      {/* ── HERO ── */}
      <section className="surface-deep relative overflow-hidden pt-36 md:pt-44 pb-16 md:pb-24">
        <Container width="wide" className="relative z-10">
          <div className="max-w-3xl">
            <Eyebrow variant="dark">{pick(embeddedHero.eyebrow)}</Eyebrow>
            <h1 className="font-display font-bold leading-[1.04] tracking-[-0.035em] text-[clamp(2.1rem,4.6vw,3.7rem)] mt-7">
              {pick(embeddedHero.headline)}
            </h1>
            <p className="font-display font-medium text-[clamp(1.02rem,1.7vw,1.28rem)] leading-[1.5] opacity-75 mt-6 max-w-2xl">
              {pick(embeddedHero.subheadline)}
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <a
                href={mailtoEngineering}
                className="inline-flex items-center justify-center h-[52px] px-[28px] rounded-full font-medium text-[15px] tracking-tight bg-[var(--color-bone)] text-[var(--color-ink)] hover:bg-[var(--color-caribbean-green)] active:scale-[0.98] transition-[background-color,transform] duration-200 ease-out"
              >
                {pick(embeddedHero.ctaPrimary)}
              </a>
              <Link
                href="/partners"
                className="inline-flex items-center justify-center h-[52px] px-[24px] rounded-full font-medium text-[15px] tracking-tight border border-[var(--color-bone)]/30 hover:border-[var(--color-bone)]/60 transition-colors"
              >
                {pick(embeddedHero.ctaSecondary)}
              </Link>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-50 mt-6">{pick(embeddedHero.microcopy)}</p>
          </div>
        </Container>
      </section>

      {/* ── 01 · La verdad primero ── */}
      <section className="surface-deep py-14 md:py-20 border-t border-[var(--color-bone)]/10">
        <Container width="default">
          <div className="rounded-2xl border border-[var(--color-data-pending)]/35 bg-[var(--color-bone)]/[0.03] p-7 md:p-9 max-w-3xl">
            <h2 className="font-display font-bold text-[clamp(1.4rem,2.4vw,1.8rem)] tracking-[-0.02em]" style={{ color: 'var(--color-data-pending)' }}>
              {pick(embeddedHonesty.headline)}
            </h2>
            <p className="text-[15px] leading-relaxed opacity-80 mt-4">{pick(embeddedHonesty.body)}</p>
          </div>
        </Container>
      </section>

      {/* ── 02 · El contrato técnico, con fecha ── */}
      <section className="surface-deep py-16 md:py-24 border-t border-[var(--color-bone)]/10">
        <SectionMarker
          number="02"
          label={l === 'es' ? 'El contrato técnico' : 'The technical contract'}
          meta={l === 'es' ? 'Seis piezas · una fecha' : 'Six pieces · one date'}
        />
        <Container width="wide">
          <div className="rounded-2xl border border-[var(--color-bone)]/15 overflow-hidden max-w-4xl">
            {apiPieces.map((piece, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 md:gap-8 px-5 md:px-7 py-5 border-b border-[var(--color-bone)]/10 last:border-b-0 items-start">
                <div>
                  <p className="font-display font-semibold text-[16px] leading-snug">{pick(piece.name)}</p>
                  <p className="text-[13.5px] leading-relaxed opacity-60 mt-1.5 max-w-xl">{pick(piece.detail)}</p>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] md:text-right md:pt-1" style={{ color: 'var(--color-data-pending)' }}>
                  {pick(apiPiecesDate)}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[12px] opacity-55 mt-4 max-w-2xl">
            {l === 'es'
              ? 'Igual que en /enterprise: lo fechado va al contrato con fecha, y con derecho de terminación sin penalización si no se cumple.'
              : 'Same as /enterprise: dated items go into the contract with their date, and a no-penalty termination right if missed.'}
          </p>
        </Container>
      </section>

      {/* ── 03 · Precio, sandbox, versionado ── */}
      <section className="surface-deep py-16 md:py-24 border-t border-[var(--color-bone)]/10">
        <SectionMarker number="03" label={l === 'es' ? 'Lo que preguntarás después' : 'What you will ask next'} meta={l === 'es' ? 'Precio · sandbox · cambios' : 'Pricing · sandbox · change'} />
        <Container width="wide">
          <dl className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
            {embeddedExtras.map((extra, i) => (
              <div key={i} className="border-t border-[var(--color-bone)]/20 pt-5">
                <dt className="font-display font-semibold text-[16.5px] tracking-[-0.01em]">{pick(extra.title)}</dt>
                <dd className="text-[14px] leading-relaxed opacity-65 mt-2.5">{pick(extra.body)}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 md:py-24 surface-dark overflow-hidden border-t border-[var(--color-bone)]/10">
        <Container width="default" className="relative z-10 text-center">
          <h2 className="font-display font-bold text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05] tracking-[-0.03em] text-[var(--color-bone)] max-w-3xl mx-auto">
            {pick(embeddedCta.headline)}
          </h2>
          <p className="font-display font-medium text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.45] text-[var(--color-bone)]/85 mt-5 max-w-2xl mx-auto">
            {pick(embeddedCta.body)}
          </p>
          <div className="mt-9">
            <a
              href={mailtoEngineering}
              className="inline-flex items-center justify-center h-[52px] px-[32px] rounded-full font-medium text-[15px] tracking-tight bg-[var(--color-bone)] text-[var(--color-ink)] hover:bg-[var(--color-caribbean-green)] transition-colors duration-200 ease-out active:scale-[0.98]"
            >
              {pick(embeddedHero.ctaPrimary)}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}

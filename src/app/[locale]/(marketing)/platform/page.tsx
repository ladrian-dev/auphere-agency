import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale, type Locale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { LifecycleNarrative } from '@/components/sections/platform/LifecycleNarrative';
import { getClaim } from '@/content/claims';
import type { Localized } from '@/content/enterprise';
import {
  platformMeta,
  platformHero,
  lifecycleStops,
  platformCapabilities,
  platformChannels,
  platformIntegrations,
} from '@/content/platform';

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
  const pageUrl = `${url}/${locale}/platform`;
  return {
    title: platformMeta.title[l],
    description: platformMeta.description[l],
    alternates: {
      canonical: pageUrl,
      languages: Object.fromEntries(routing.locales.map((loc) => [loc, `${url}/${loc}/platform`])),
    },
    openGraph: {
      title: platformMeta.title[l],
      description: platformMeta.description[l],
      url: pageUrl,
      siteName: 'Auphere',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: platformMeta.title[l], description: platformMeta.description[l] },
  };
}

export default async function PlatformPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const l = locale as 'en' | 'es';
  const pick = (text: Localized) => text[l];

  const tOrch = await getTranslations({ locale: locale as Locale, namespace: 'hero.orchestrator' });
  const orchestratorLabels = {
    channels: [tOrch('whatsapp'), tOrch('instagram'), tOrch('tiktok'), tOrch('voice')] as [string, string, string, string],
    classifier: tOrch('classifier'),
    tools: [tOrch('calendar'), tOrch('crm'), tOrch('payments'), tOrch('browser')] as [string, string, string, string],
    response: tOrch('response'),
    human: tOrch('human'),
  };

  // Cada capacidad se valida contra claims.ts en build — un claim blocked aquí revienta.
  const capabilities = platformCapabilities.map((cap) => {
    const claim = getClaim(cap.claimId);
    if (claim.status !== 'live') {
      throw new Error(`/platform: capability "${cap.claimId}" is ${claim.status} — only live claims belong on this page`);
    }
    return { name: pick(cap.name), meaning: pick(cap.meaning) };
  });

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden pt-36 md:pt-44 pb-16 md:pb-24"
        style={{
          background:
            'radial-gradient(120% 90% at 100% 50%, var(--color-bangladesh-green) 0%, var(--color-pine) 55%, var(--color-ink) 100%)',
        }}
      >
        <Container width="wide" className="relative z-10">
          <div className="max-w-3xl">
            <Eyebrow variant="dark">{pick(platformHero.eyebrow)}</Eyebrow>
            <h1 className="font-display font-bold leading-[1.04] tracking-[-0.035em] text-[var(--color-bone)] text-[clamp(2.25rem,4.8vw,4rem)] mt-7">
              {pick(platformHero.headline)}
            </h1>
            <p className="font-display font-medium text-[clamp(1.05rem,1.7vw,1.3rem)] leading-[1.45] text-[var(--color-bone)]/70 mt-6 max-w-2xl">
              {pick(platformHero.subheadline)}
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link
                href="/#book"
                className="inline-flex items-center justify-center h-[52px] px-[28px] rounded-full font-medium text-[15px] tracking-tight bg-[var(--color-bone)] text-[var(--color-ink)] hover:bg-[var(--color-caribbean-green)] active:scale-[0.98] transition-[background-color,transform] duration-200 ease-out"
              >
                {pick(platformHero.ctaPrimary)}
              </Link>
              <Link
                href="/platform/security"
                className="inline-flex items-center justify-center h-[52px] px-[24px] rounded-full font-medium text-[15px] tracking-tight border border-[var(--color-bone)]/30 text-[var(--color-bone)] hover:border-[var(--color-bone)]/60 transition-colors"
              >
                {pick(platformHero.ctaSecondary)}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 01 · A-05 ciclo de vida ── */}
      <LifecycleNarrative
        labels={orchestratorLabels}
        stops={lifecycleStops.map((stop) => ({ title: pick(stop.title), body: pick(stop.body) }))}
        marker={{
          label: l === 'es' ? 'El ciclo de vida' : 'The lifecycle',
          meta: l === 'es' ? 'Una conversación, de punta a punta' : 'One conversation, end to end',
        }}
      />

      {/* ── 02 · Las 10 capacidades (todas live por construcción) ── */}
      <section className="py-20 md:py-28 border-t border-[var(--color-ink-subtle)]">
        <SectionMarker
          number="02"
          label={l === 'es' ? 'Capacidades' : 'Capabilities'}
          meta={l === 'es' ? '10 · todas en producción' : '10 · all in production'}
        />
        <Container width="wide">
          <div className="max-w-3xl mb-12">
            <h2 className="font-display font-bold text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
              {l === 'es' ? 'Diez capacidades. Cero roadmap disfrazado.' : 'Ten capabilities. Zero roadmap in disguise.'}
            </h2>
          </div>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl">
            {capabilities.map((cap, i) => (
              <div key={i} className="border-t border-[var(--color-ink-subtle)] pt-4">
                <dt className="font-display font-semibold text-[16.5px] tracking-[-0.01em]">{cap.name}</dt>
                <dd className="text-[14px] leading-relaxed text-[var(--color-ink-muted)] mt-1.5">{cap.meaning}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ── 03 · Canales + Integraciones ── */}
      <section className="py-20 md:py-28 border-t border-[var(--color-ink-subtle)] dot-grid">
        <SectionMarker number="03" label={l === 'es' ? 'Canales · Integraciones' : 'Channels · Integrations'} meta={l === 'es' ? 'Con fechas donde toca' : 'Dated where due'} />
        <Container width="wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 max-w-5xl">
            <div>
              <h2 className="font-display font-bold text-[clamp(1.6rem,2.8vw,2.25rem)] leading-[1.08] tracking-[-0.02em] mb-7">
                {pick(platformChannels.headline)}
              </h2>
              <ul className="flex flex-col gap-4">
                {platformChannels.live.map((channel) => (
                  <li key={channel.name} className="flex items-start gap-3">
                    <span aria-hidden className="mt-[7px] w-2 h-2 rounded-full bg-[var(--color-data-positive)] shrink-0" />
                    <div>
                      <p className="font-display font-semibold text-[15.5px]">{channel.name}</p>
                      <p className="text-[13px] text-[var(--color-ink-muted)]">{pick(channel.note)}</p>
                    </div>
                  </li>
                ))}
                {platformChannels.dated.map((channel, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span aria-hidden className="mt-[7px] w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: 'var(--color-data-pending)' }} />
                    <div>
                      <p className="font-display font-semibold text-[15.5px] text-[var(--color-ink-muted)]">{pick(channel.name)}</p>
                      <p className="text-[13px] text-[var(--color-ink-muted)]">{pick(channel.note)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display font-bold text-[clamp(1.6rem,2.8vw,2.25rem)] leading-[1.08] tracking-[-0.02em] mb-7">
                {pick(platformIntegrations.headline)}
              </h2>
              <p className="text-[15px] leading-relaxed text-[var(--color-ink-muted)]">{pick(platformIntegrations.body)}</p>
              <p className="mt-8">
                <Link href="/trust" className="font-medium text-[14.5px] text-[var(--color-bangladesh-green)] hover:underline underline-offset-4">
                  {l === 'es' ? 'Confianza y seguridad →' : 'Trust & security →'}
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 md:py-24 surface-dark overflow-hidden border-t border-[var(--color-bone)]/10">
        <Container width="default" className="relative z-10 text-center">
          <h2 className="font-display font-bold text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05] tracking-[-0.03em] text-[var(--color-bone)] max-w-3xl mx-auto">
            {l === 'es' ? '¿Quieres verlo con tu operación dentro?' : 'Want to see it with your operation inside?'}
          </h2>
          <div className="mt-8">
            <Link
              href="/#book"
              className="inline-flex items-center justify-center h-[52px] px-[32px] rounded-full font-medium text-[15px] tracking-tight bg-[var(--color-bone)] text-[var(--color-ink)] hover:bg-[var(--color-caribbean-green)] transition-colors duration-200 ease-out active:scale-[0.98]"
            >
              {pick(platformHero.ctaPrimary)}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

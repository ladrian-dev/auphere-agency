import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { ControlList } from '@/components/sections/ControlList';
import { isolationControls, type Localized } from '@/content/enterprise';
import { securityMeta, securityHero, securitySections } from '@/content/platform';

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
  const pageUrl = `${url}/${locale}/platform/security`;
  return {
    title: securityMeta.title[l],
    description: securityMeta.description[l],
    alternates: {
      canonical: pageUrl,
      languages: Object.fromEntries(routing.locales.map((loc) => [loc, `${url}/${loc}/platform/security`])),
    },
    openGraph: {
      title: securityMeta.title[l],
      description: securityMeta.description[l],
      url: pageUrl,
      siteName: 'Auphere',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: securityMeta.title[l], description: securityMeta.description[l] },
  };
}

const SECTION_KEYS = ['dataModel', 'credentials', 'noTraining', 'questionnaire'] as const;

export default async function PlatformSecurityPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const l = locale as 'en' | 'es';
  const pick = (text: Localized) => text[l];

  const mailtoQuestionnaire = `mailto:contacto@auphere.com?subject=${encodeURIComponent(
    l === 'es' ? 'Cuestionario de seguridad — Auphere' : 'Security questionnaire — Auphere',
  )}`;

  return (
    <>
      {/* ── HERO (surface-deep — página técnica) ── */}
      <section className="surface-deep hero-dots relative overflow-hidden hero-y">
        <Container width="wide" className="relative z-10">
          <div className="max-w-3xl">
            <Eyebrow variant="dark">{pick(securityHero.eyebrow)}</Eyebrow>
            <h1 className="type-h1 mt-7">
              {pick(securityHero.headline)}
            </h1>
            <p className="type-lead opacity-75 mt-6 max-w-2xl" style={{ maxWidth: 'var(--measure-technical)' }}>
              {pick(securityHero.subheadline)}
            </p>
          </div>
        </Container>
      </section>

      {/* ── 01 · Los 9 controles ── */}
      <section className="surface-deep section-y section-edge">
        <SectionMarker number="01" label={l === 'es' ? 'Aislamiento' : 'Isolation'} meta={l === 'es' ? '9 controles · el mecanismo' : '9 controls · the mechanism'} />
        <Container width="wide">
          <div style={{ ['--control-cell-bg' as string]: 'color-mix(in srgb, var(--color-bone) 4%, transparent)' }}>
            <ControlList controls={isolationControls.map((c) => ({ name: pick(c.name), mechanism: pick(c.mechanism) }))} />
          </div>
        </Container>
      </section>

      {/* ── 02 · Datos, credenciales, no-training, cuestionario ── */}
      <section className="surface-deep section-y section-edge">
        <SectionMarker number="02" label={l === 'es' ? 'Datos y acceso' : 'Data & access'} meta={l === 'es' ? 'Para tu equipo de seguridad' : 'For your security team'} />
        <Container width="wide">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-5xl">
            {SECTION_KEYS.map((key) => (
              <div key={key}>
                <dt className="font-display font-semibold text-[17px] leading-snug tracking-[-0.01em]">
                  {pick(securitySections[key].title)}
                </dt>
                <dd className="text-[14px] leading-relaxed opacity-70 mt-2.5" style={{ maxWidth: 'var(--measure-technical)' }}>
                  {pick(securitySections[key].body)}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-14 flex flex-col sm:flex-row gap-3">
            <a
              href={mailtoQuestionnaire}
              className="inline-flex items-center justify-center h-[50px] px-[26px] rounded-full font-medium text-[14px] tracking-tight bg-[var(--color-bone)] text-[var(--color-ink)] hover:bg-[var(--color-caribbean-green)] transition-colors duration-200 ease-out"
            >
              {l === 'es' ? 'Pedir el cuestionario de seguridad' : 'Request the security questionnaire'}
            </a>
            <Link
              href="/trust"
              className="inline-flex items-center justify-center h-[50px] px-[24px] rounded-full font-medium text-[14px] tracking-tight border border-[var(--color-bone)]/30 hover:border-[var(--color-bone)]/60 transition-colors"
            >
              {l === 'es' ? 'Ver /trust — postura completa' : 'See /trust — full posture'}
            </Link>
            <Link
              href="/enterprise"
              className="inline-flex items-center justify-center h-[50px] px-[24px] rounded-full font-medium text-[14px] tracking-tight border border-[var(--color-bone)]/30 hover:border-[var(--color-bone)]/60 transition-colors"
            >
              {l === 'es' ? 'Enterprise: garantías con fecha →' : 'Enterprise: dated guarantees →'}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

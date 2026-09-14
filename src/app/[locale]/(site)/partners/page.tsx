import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { CineHero } from '@/components/sections/CineHero';
import { CtaLink } from '@/components/primitives/CtaLink';
import { Apply, ThreeWays, WhatYouGet, WhoDoesWhat } from '@/components/sections/partners/PartnersSections';

interface Props {
  params: Promise<{ locale: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'partners.meta' });
  const pageUrl = `${SITE_URL}/${locale}/partners`;
  return {
    title: { absolute: t('title') },
    description: t('description'),
    alternates: {
      canonical: pageUrl,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${SITE_URL}/${l}/partners`])),
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: pageUrl,
      siteName: 'Auphere',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
  };
}

/**
 * /partners (README §Partners): hero cinematográfico, tres vías, qué recibes,
 * quién hace qué y el formulario de 8 campos con el panel de reserva. Sin FAQ.
 */
export default async function PartnersPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'partners.hero' });

  return (
    <>
      <CineHero
        image={{ src: '/img/hero-partners.webp' }}
        eyebrow={t('eyebrow')}
        line1={t('line1')}
        line2={t('line2')}
        lead={t('lead')}
        primary={
          <CtaLink
            href="#apply"
            section="partners-hero"
            className="btn btn-primary h-[clamp(44px,4.4vh,52px)] px-[26px] text-[16px] shadow-[0_1px_5px_rgba(0,0,0,.38)] max-tab:h-[52px] max-tab:w-full"
          >
            {t('cta')}
          </CtaLink>
        }
        secondary={
          <a
            href="#vias"
            className="text-[15px] font-medium text-[rgba(241,247,246,.8)] [text-shadow:0_1px_3px_rgba(0,0,0,.5)] transition-colors hover:text-[var(--color-primary)] max-tab:py-2"
          >
            {t('secondary')}
          </a>
        }
      />
      <ThreeWays />
      <WhatYouGet />
      <WhoDoesWhat />
      <Apply />
    </>
  );
}

import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { HomeHero } from '@/components/sections/home/HomeHero';
import { Problem } from '@/components/sections/home/Problem';
import { Solution } from '@/components/sections/home/Solution';
import { HowItWorks } from '@/components/sections/home/HowItWorks';
import { Skills } from '@/components/sections/home/Skills';
import { Pricing } from '@/components/sections/home/Pricing';
import { HomeFaq } from '@/components/sections/home/HomeFaq';
import { FAQ_KEYS } from '@/components/sections/home/faq-keys';
import { Agenda } from '@/components/sections/home/Agenda';
import { FaqJsonLd } from '@/components/sections/FaqJsonLd';

interface Props {
  params: Promise<{ locale: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'home.meta' });
  return {
    title: { absolute: t('title') },
    description: t('description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${SITE_URL}/${l}`])),
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}`,
      siteName: 'Auphere',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
  };
}

/**
 * Home del rediseño (README §Home): hero con chat animado y marquesina,
 * problema, solución que se revela al scroll, cómo funciona con contador,
 * habilidades, cómo se cobra con slider, FAQ y agenda.
 */
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const tFaq = await getTranslations({ locale, namespace: 'home.faq.items' });
  const faqItems = FAQ_KEYS.map((key) => ({ q: tFaq(`${key}.q`), a: tFaq(`${key}.a`) }));

  return (
    <>
      <HomeHero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Skills />
      <Pricing />
      <FaqJsonLd items={faqItems} />
      <HomeFaq />
      <Agenda />
    </>
  );
}

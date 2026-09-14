import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { CineHero } from '@/components/sections/CineHero';
import { CtaLink } from '@/components/primitives/CtaLink';
import { Controls, Deployment, Guarantees, TalkToSales } from '@/components/sections/enterprise/EnterpriseSections';
import { enterpriseHero, enterpriseMeta } from '@/content/enterprise';

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
  const lang = locale === 'es' ? 'es' : 'en';
  const pageUrl = `${SITE_URL}/${locale}/enterprise`;
  return {
    title: { absolute: enterpriseMeta.title[lang] },
    description: enterpriseMeta.description[lang],
    alternates: {
      canonical: pageUrl,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${SITE_URL}/${l}/enterprise`])),
    },
    openGraph: {
      title: enterpriseMeta.title[lang],
      description: enterpriseMeta.description[lang],
      url: pageUrl,
      siteName: 'Auphere',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
  };
}

/**
 * /enterprise (README §Enterprise): hero cinematográfico con un solo CTA
 * «Habla con ventas» → #agenda, garantías y SLAs, nueve controles, despliegue
 * en cuatro pasos y el panel de reserva. Sin FAQ.
 */
export default async function EnterprisePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const lang = locale === 'es' ? 'es' : 'en';

  return (
    <>
      <CineHero
        image={{ src: '/img/hero-enterprise.webp' }}
        eyebrow={enterpriseHero.eyebrow[lang]}
        line1={enterpriseHero.line1[lang]}
        line2={enterpriseHero.line2[lang]}
        lead={enterpriseHero.lead[lang]}
        primary={
          <CtaLink
            href="#agenda"
            section="enterprise-hero"
            className="btn btn-primary h-[clamp(44px,4.4vh,52px)] px-[26px] text-[16px] shadow-[0_1px_5px_rgba(0,0,0,.38)] max-tab:h-[52px] max-tab:w-full"
          >
            {enterpriseHero.cta[lang]}
          </CtaLink>
        }
      />
      <Guarantees lang={lang} />
      <Controls lang={lang} />
      <Deployment lang={lang} />
      <TalkToSales lang={lang} />
    </>
  );
}

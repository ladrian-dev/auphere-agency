import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { LegalArticle } from '@/components/sections/LegalArticle';
import { LEGAL_SLUGS, type LegalKey } from '@/lib/site';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';

interface Props {
  params: Promise<{ locale: string }>;
}

/**
 * Fábrica de páginas legales. Cada slug existe en un solo idioma
 * (`/es/privacidad`, `/en/privacy`): el otro idioma devuelve 404 y los
 * `alternates` apuntan al slug correcto de cada locale.
 */
export function createLegalPage(page: LegalKey, lang: 'es' | 'en') {
  async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    if (locale !== lang) return {};
    const t = await getTranslations({ locale, namespace: `legal.${page}.meta` });
    const pageUrl = `${SITE_URL}/${lang}/${LEGAL_SLUGS[page][lang]}`;
    return {
      title: t('title'),
      description: t('description'),
      alternates: {
        canonical: pageUrl,
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}/${LEGAL_SLUGS[page][l]}`]),
        ),
      },
      openGraph: {
        title: t('title'),
        description: t('description'),
        url: pageUrl,
        siteName: 'Auphere',
        locale: lang === 'es' ? 'es_ES' : 'en_US',
        type: 'article',
      },
    };
  }

  async function Page({ params }: Props) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale) || locale !== lang) notFound();
    setRequestLocale(locale);
    return <LegalArticle page={page} />;
  }

  return {
    generateMetadata,
    Page,
    generateStaticParams: () => [{ locale: lang }],
  };
}

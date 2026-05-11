import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { helvena, behindTheNineties, jetbrainsMono } from '../fonts';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import '../globals.css';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: 'meta' });
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';

  return {
    title: { default: t('title'), template: `%s · Auphere` },
    description: t('description'),
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
    },
    alternates: {
      canonical: `${url}/${locale}`,
      languages: {
        en: `${url}/en`,
        es: `${url}/es`,
        'x-default': `${url}/en`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${url}/${locale}`,
      siteName: 'Auphere',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${helvena.variable} ${behindTheNineties.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <NextIntlClientProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

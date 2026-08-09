import type { Metadata, Viewport } from 'next';
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F1F7F6' },
    { media: '(prefers-color-scheme: dark)', color: '#03624C' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: { default: t('title'), template: `%s · Auphere` },
    description: t('description'),
    applicationName: 'Auphere',
    authors: [{ name: 'Auphere', url: SITE_URL }],
    creator: 'Auphere',
    publisher: 'Auphere',
    category: 'technology',
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        'en-US': `${SITE_URL}/en`,
        'en-GB': `${SITE_URL}/en`,
        'es-ES': `${SITE_URL}/es`,
        'es-MX': `${SITE_URL}/es`,
        'es-419': `${SITE_URL}/es`,
        'x-default': `${SITE_URL}/en`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}`,
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

function buildOrganizationSchema(locale: string, metaDescription: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: 'Auphere',
    legalName: 'Auphere',
    alternateName: 'Auphere Agency',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/brand/auphere-logo.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/opengraph-image`,
    description: metaDescription,
    inLanguage: locale === 'es' ? 'es' : 'en',
    knowsLanguage: ['en', 'es'],
    priceRange: '$$$',
    foundingDate: '2026',
    founder: {
      '@type': 'Person',
      name: 'Luis Matos',
      url: 'https://ladrian.dev',
    },
    areaServed: [
      { '@type': 'Country', name: 'Spain' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Netherlands' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Mexico' },
      { '@type': 'Country', name: 'Chile' },
      { '@type': 'Country', name: 'Colombia' },
      { '@type': 'Country', name: 'Argentina' },
      { '@type': 'Country', name: 'Venezuela' },
    ],
    serviceType: 'Bespoke AI agent design, deployment and operations',
    slogan:
      locale === 'es'
        ? 'Agentes de IA que construimos, operamos y mejoramos por ti.'
        : 'AI agents we build, run and improve for your team.',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: 'contacto@auphere.com',
        contactType: 'sales',
        availableLanguage: ['English', 'Spanish'],
        areaServed: ['EU', 'US', 'LATAM'],
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/auphere',
      'https://github.com/auphere',
      'https://x.com/auphere',
    ],
  };
}

function buildWebsiteSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Auphere',
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale === 'es' ? 'es' : 'en',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'meta' });
  const ta11y = await getTranslations({ locale, namespace: 'a11y' });

  const organizationSchema = buildOrganizationSchema(locale, t('description'));
  const websiteSchema = buildWebsiteSchema(locale);

  return (
    <html
      lang={locale}
      dir="ltr"
      className={`${helvena.variable} ${behindTheNineties.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://app.cal.com" crossOrigin="" />
        <script
          type="application/ld+json"
           
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
           
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          {ta11y('skipToContent')}
        </a>
        <NextIntlClientProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

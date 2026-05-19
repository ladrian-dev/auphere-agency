import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale, useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { PageHeader } from '@/components/sections/PageHeader';
import { VerticalsHub } from '@/components/sections/use-case/VerticalsHub';

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'useCases.hub.meta' });
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${url}/${locale}/use-cases`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${url}/${l}/use-cases`]),
      ),
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${url}/${locale}/use-cases`,
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

export default async function UseCasesHubPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <HubContent />;
}

function HubContent() {
  const t = useTranslations('useCases.hub');

  return (
    <>
      <PageHeader
        eyebrow={t('header.eyebrow')}
        meta={t('header.meta')}
        title={t('header.title')}
        intro={t('header.intro')}
      />
      <VerticalsHub />
    </>
  );
}

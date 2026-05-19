import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale, useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { PageHeader } from '@/components/sections/PageHeader';
import { LegalProse, LegalSection } from '@/components/sections/LegalProse';

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'terms.meta' });
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';
  const pageUrl = `${url}/${locale}/terms`;
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: pageUrl,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${url}/${l}/terms`])),
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: pageUrl,
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

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <TermsContent />;
}

function TermsContent() {
  const t = useTranslations('terms');

  return (
    <>
      <PageHeader
        eyebrow={t('header.eyebrow')}
        meta={t('header.meta')}
        title={t('header.title')}
        intro={t('header.intro')}
      />

      <LegalProse>
        <LegalSection number="01" title={t('sections.service.title')}>
          <p>{t('sections.service.p1')}</p>
          <p>{t('sections.service.p2')}</p>
        </LegalSection>

        <LegalSection number="02" title={t('sections.diagnostic.title')}>
          <p>{t('sections.diagnostic.p1')}</p>
          <p>{t('sections.diagnostic.p2')}</p>
        </LegalSection>

        <LegalSection number="03" title={t('sections.bespoke.title')}>
          <p>{t('sections.bespoke.p1')}</p>
          <p>{t('sections.bespoke.p2')}</p>
        </LegalSection>

        <LegalSection number="04" title={t('sections.code.title')}>
          <p>{t('sections.code.p1')}</p>
          <p>{t('sections.code.p2')}</p>
        </LegalSection>

        <LegalSection number="05" title={t('sections.clientData.title')}>
          <p>{t('sections.clientData.p1')}</p>
          <p>{t('sections.clientData.p2')}</p>
        </LegalSection>

        <LegalSection number="06" title={t('sections.fees.title')}>
          <p>{t('sections.fees.p1')}</p>
          <p>{t('sections.fees.p2')}</p>
        </LegalSection>

        <LegalSection number="07" title={t('sections.cancellation.title')}>
          <p>{t('sections.cancellation.p1')}</p>
          <p>{t('sections.cancellation.p2')}</p>
        </LegalSection>

        <LegalSection number="08" title={t('sections.confidentiality.title')}>
          <p>{t('sections.confidentiality.p1')}</p>
        </LegalSection>

        <LegalSection number="09" title={t('sections.sla.title')}>
          <p>{t('sections.sla.p1')}</p>
          <p>{t('sections.sla.p2')}</p>
        </LegalSection>

        <LegalSection number="10" title={t('sections.liability.title')}>
          <p>{t('sections.liability.p1')}</p>
          <p>{t('sections.liability.p2')}</p>
        </LegalSection>

        <LegalSection number="11" title={t('sections.law.title')}>
          <p>{t('sections.law.p1')}</p>
        </LegalSection>
      </LegalProse>
    </>
  );
}

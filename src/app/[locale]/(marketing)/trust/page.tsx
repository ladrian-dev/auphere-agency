import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale, useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { PageHeader } from '@/components/sections/PageHeader';
import {
  LegalProse,
  LegalSection,
  LegalDefinitionList,
} from '@/components/sections/LegalProse';

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'trust.meta' });
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';
  const pageUrl = `${url}/${locale}/trust`;
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: pageUrl,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${url}/${l}/trust`])),
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

export default async function TrustPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <TrustContent />;
}

function TrustContent() {
  const t = useTranslations('trust');

  const isolationKeys = ['rls', 'tools', 'models'] as const;
  const complianceKeys = ['gdpr', 'ccpa', 'lgpd', 'soc2'] as const;

  const isolation = isolationKeys.map((k) => ({
    term: t(`sections.isolation.items.${k}.term`),
    description: t(`sections.isolation.items.${k}.description`),
  }));
  const compliance = complianceKeys.map((k) => ({
    term: t(`sections.compliance.items.${k}.term`),
    description: t(`sections.compliance.items.${k}.description`),
  }));

  return (
    <>
      <PageHeader
        eyebrow={t('header.eyebrow')}
        meta={t('header.meta')}
        title={t('header.title')}
        intro={t('header.intro')}
      />

      <LegalProse>
        <LegalSection number="01" title={t('sections.hosting.title')}>
          <p>{t('sections.hosting.p1')}</p>
          <p>{t('sections.hosting.p2')}</p>
        </LegalSection>

        <LegalSection number="02" title={t('sections.isolation.title')}>
          <LegalDefinitionList items={isolation} topBorder={false} />
        </LegalSection>

        <LegalSection number="03" title={t('sections.encryption.title')}>
          <p>{t('sections.encryption.p1')}</p>
          <p>{t('sections.encryption.p2')}</p>
        </LegalSection>

        <LegalSection number="04" title={t('sections.access.title')}>
          <p>{t('sections.access.p1')}</p>
          <p>{t('sections.access.p2')}</p>
        </LegalSection>

        <LegalSection number="05" title={t('sections.compliance.title')}>
          <LegalDefinitionList items={compliance} topBorder={false} />
        </LegalSection>

        <LegalSection number="06" title={t('sections.aitransparency.title')}>
          <p>{t('sections.aitransparency.p1')}</p>
          <p>{t('sections.aitransparency.p2')}</p>
        </LegalSection>

        <LegalSection number="07" title={t('sections.subprocessors.title')}>
          <p>{t('sections.subprocessors.p1')}</p>
        </LegalSection>

        <LegalSection number="08" title={t('sections.incident.title')}>
          <p>{t('sections.incident.p1')}</p>
          <p>{t('sections.incident.p2')}</p>
        </LegalSection>

        <LegalSection number="09" title={t('sections.vuln.title')}>
          <p>{t('sections.vuln.p1')}</p>
        </LegalSection>
      </LegalProse>
    </>
  );
}

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
  const t = await getTranslations({ locale, namespace: 'privacy.meta' });
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${url}/${locale}/privacy`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${url}/${l}/privacy`])),
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <PrivacyContent />;
}

function PrivacyContent() {
  const t = useTranslations('privacy');

  const dataGroupKeys = ['visitors', 'leads', 'clients'] as const;
  const legalBasisKeys = ['consent', 'contract', 'legitimate', 'legal'] as const;
  const rightsKeys = ['access', 'rectify', 'erase', 'portability', 'object', 'ccpa'] as const;

  const dataGroups = dataGroupKeys.map((k) => ({
    term: t(`sections.dataCollected.groups.${k}.term`),
    description: t(`sections.dataCollected.groups.${k}.description`),
  }));
  const legalBasis = legalBasisKeys.map((k) => ({
    term: t(`sections.legalBasis.items.${k}.term`),
    description: t(`sections.legalBasis.items.${k}.description`),
  }));
  const rights = rightsKeys.map((k) => ({
    term: t(`sections.rights.items.${k}.term`),
    description: t(`sections.rights.items.${k}.description`),
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
        <LegalSection number="01" title={t('sections.controller.title')}>
          <p>{t('sections.controller.p1')}</p>
          <p>{t('sections.controller.p2')}</p>
        </LegalSection>

        <LegalSection number="02" title={t('sections.dataCollected.title')}>
          <p>{t('sections.dataCollected.intro')}</p>
          <LegalDefinitionList items={dataGroups} />
        </LegalSection>

        <LegalSection number="03" title={t('sections.legalBasis.title')}>
          <LegalDefinitionList items={legalBasis} topBorder={false} />
        </LegalSection>

        <LegalSection number="04" title={t('sections.retention.title')}>
          <p>{t('sections.retention.p1')}</p>
          <p>{t('sections.retention.p2')}</p>
          <p>{t('sections.retention.p3')}</p>
        </LegalSection>

        <LegalSection number="05" title={t('sections.rights.title')}>
          <p>{t('sections.rights.intro')}</p>
          <LegalDefinitionList items={rights} />
        </LegalSection>

        <LegalSection number="06" title={t('sections.transfers.title')}>
          <p>{t('sections.transfers.p1')}</p>
        </LegalSection>

        <LegalSection number="07" title={t('sections.cookies.title')}>
          <p>{t('sections.cookies.p1')}</p>
        </LegalSection>

        <LegalSection number="08" title={t('sections.contact.title')}>
          <p>{t('sections.contact.p1')}</p>
        </LegalSection>
      </LegalProse>
    </>
  );
}

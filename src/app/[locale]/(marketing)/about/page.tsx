import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale, useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/primitives/Container';
import { PageHeader } from '@/components/sections/PageHeader';
import { LegalDefinitionList } from '@/components/sections/LegalProse';
import { buttonClasses } from '@/components/primitives/Button';

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'about.meta' });
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';
  const pageUrl = `${url}/${locale}/about`;
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: pageUrl,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${url}/${l}/about`])),
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

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations('about');

  const promiseKeys = ['bespoke', 'glassbox', 'compliance', 'diagnostic', 'oneteam'] as const;
  const notKeys = ['notSaas', 'notOneShot', 'notHype'] as const;

  const promises = promiseKeys.map((k) => ({
    term: t(`promises.items.${k}.term`),
    description: t(`promises.items.${k}.description`),
  }));
  const notList = notKeys.map((k) => ({
    term: t(`notWho.items.${k}.term`),
    description: t(`notWho.items.${k}.description`),
  }));

  return (
    <>
      <PageHeader
        eyebrow={t('header.eyebrow')}
        meta={t('header.meta')}
        title={t('header.title')}
        intro={t('header.intro')}
      />

      <Container width="wide" className="pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <h2 className="md:col-span-4 type-h3 text-[var(--color-ink)]">
            {t('mission.title')}
          </h2>
          <div className="md:col-span-8 space-y-5 text-[17px] md:text-[18px] leading-[1.6] text-[var(--color-ink)]">
            <p>{t('mission.p1')}</p>
            <p>{t('mission.p2')}</p>
            <p>{t('mission.p3')}</p>
          </div>
        </div>
      </Container>

      <div className="border-t border-[var(--color-ink-subtle)]">
        <Container width="wide" className="section-y">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            <h2 className="md:col-span-4 type-h3 text-[var(--color-ink)]">
              {t('promises.title')}
            </h2>
            <div className="md:col-span-8">
              <LegalDefinitionList items={promises} />
            </div>
          </div>
        </Container>
      </div>

      <div className="border-t border-[var(--color-ink-subtle)]">
        <Container width="wide" className="section-y">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-4">
              <h2 className="type-h3 text-[var(--color-ink)]">
                {t('notWho.title')}
              </h2>
              <p className="mt-5 text-[16px] leading-[1.6] text-[var(--color-ink-muted)]">
                {t('notWho.intro')}
              </p>
            </div>
            <div className="md:col-span-8">
              <LegalDefinitionList items={notList} />
            </div>
          </div>
        </Container>
      </div>

      <div className="border-t border-[var(--color-ink-subtle)] bg-[var(--color-ink)] text-[var(--color-bone)]">
        <Container width="default" className="section-y text-center">
          <h2 className="type-h2">
            {t('cta.headline')}
          </h2>
          <p className="mt-5 text-[17px] md:text-[18px] leading-[1.5] text-[var(--color-bone)]/70 max-w-xl mx-auto">
            {t('cta.body')}
          </p>
          <div className="mt-10">
            <Link
              href="/#book"
              className={buttonClasses({ variant: 'inverse', size: 'lg' })}
            >
              {t('cta.button')}
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}

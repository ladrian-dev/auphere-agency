import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getDocsNav } from '@/content/docs/registry';
import type { DocsLocale } from '@/content/docs/types';

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'docs.meta' });
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';
  const pageUrl = `${url}/${locale}/docs`;
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: pageUrl,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${url}/${l}/docs`])),
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

export default async function DocsHomePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'docs.home' });
  const tc = await getTranslations({ locale, namespace: 'docs.chrome' });
  const groups = getDocsNav(locale as DocsLocale);

  return (
    <article className="max-w-[720px]">
      <header>
        <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-ink-subtle)] pb-3">
          <p className="type-meta text-[var(--color-ink-muted)]">
            {t('eyebrow')}
          </p>
          <p className="type-meta text-[var(--color-ink-muted)]">
            / {tc('version')}
          </p>
        </div>
        <h1 className="mt-8 type-h1 text-[var(--color-ink)] [text-wrap:balance]">
          {t('title')}
        </h1>
        <p className="mt-4 text-[17px] md:text-[18px] leading-[1.5] text-[var(--color-ink-muted)] [text-wrap:pretty]">
          {t('intro')}
        </p>
      </header>

      <section className="mt-12 rounded-[16px] border border-[var(--color-ink-subtle)] p-6 md:p-7">
        <p className="type-meta text-[var(--color-primary-deep)]">
          {tc('product')}
        </p>
        <h2 className="mt-3 type-h3">
          {t('productTitle')}
        </h2>
        <p className="mt-3 text-[15px] md:text-[16px] leading-[1.6] text-[var(--color-ink-muted)] [text-wrap:pretty]">
          {t('productDescription')}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`/${locale}/docs/embed/quickstart`}
            className="inline-flex items-center rounded-[999px] bg-[var(--color-ink)] text-[var(--color-bone)] px-5 py-2.5 text-[14px] hover:bg-[var(--color-bangladesh-green)] transition-colors"
          >
            {t('quickstartCta')} →
          </a>
          <a
            href={`/${locale}/docs/embed`}
            className="inline-flex items-center rounded-[999px] border border-[var(--color-ink-subtle)] px-5 py-2.5 text-[14px] text-[var(--color-ink)] hover:border-[var(--color-ink-dim)] transition-colors"
          >
            {t('browseCta')}
          </a>
        </div>
      </section>

      <section className="mt-12">
        {groups.map((group) => (
          <div key={group.id} className="mt-8 first:mt-0">
            <p className="type-meta text-[var(--color-ink-dim)] border-b border-[var(--color-ink-subtle)] pb-2">
              {group.label}
            </p>
            <ul className="divide-y divide-[var(--color-ink-subtle)]">
              {group.items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group flex items-baseline justify-between gap-4 py-3.5"
                  >
                    <span className="text-[15px] md:text-[16px] text-[var(--color-ink)] group-hover:text-[var(--color-primary-deep)] transition-colors">
                      {item.title}
                    </span>
                    <span
                      aria-hidden
                      className="font-mono text-[12px] text-[var(--color-ink-dim)] group-hover:text-[var(--color-primary-deep)] transition-colors"
                    >
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <p className="mt-14 pt-6 border-t border-[var(--color-ink-subtle)] text-[14px] leading-[1.6] text-[var(--color-ink-muted)]">
        {t('help')}{' '}
        <a
          href="mailto:contacto@auphere.com"
          className="text-[var(--color-primary-deep)] underline underline-offset-[3px] decoration-[var(--color-ink-dim)] hover:decoration-[var(--color-primary-deep)] transition-colors"
        >
          contacto@auphere.com
        </a>
      </p>
    </article>
  );
}

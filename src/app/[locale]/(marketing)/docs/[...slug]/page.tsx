import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { DocsRenderer } from '@/components/docs/DocsRenderer';
import { DocsPagination } from '@/components/docs/DocsPagination';
import {
  DOC_PAGES,
  DOC_GROUPS,
  getDocPage,
  getAdjacentPages,
  docHref,
} from '@/content/docs/registry';
import type { DocsLocale } from '@/content/docs/types';

interface Props {
  params: Promise<{ locale: string; slug: string[] }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    DOC_PAGES.map((page) => ({ locale, slug: page.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const page = getDocPage(slug);
  if (!page) return {};
  const content = page[locale as DocsLocale];
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com';
  const path = `/docs/${slug.join('/')}`;
  const pageUrl = `${url}/${locale}${path}`;
  return {
    title: `${content.title} — Auphere Docs`,
    description: content.description,
    alternates: {
      canonical: pageUrl,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${url}/${l}${path}`])),
    },
    openGraph: {
      title: `${content.title} — Auphere Docs`,
      description: content.description,
      url: pageUrl,
      siteName: 'Auphere',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${content.title} — Auphere Docs`,
      description: content.description,
    },
  };
}

export default async function DocPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const page = getDocPage(slug);
  if (!page) notFound();

  const docsLocale = locale as DocsLocale;
  const content = page[docsLocale];
  const t = await getTranslations({ locale, namespace: 'docs.chrome' });

  const group = DOC_GROUPS.find((g) => g.id === page.group);
  const toc = content.blocks.filter(
    (block): block is { kind: 'h2'; id: string; text: string } => block.kind === 'h2',
  );
  const { previous, next } = getAdjacentPages(slug);

  const chrome = {
    copy: t('copy'),
    copied: t('copied'),
    required: t('required'),
  };

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_190px] xl:gap-14">
      <article className="min-w-0 max-w-[720px]">
        <header>
          <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-ink-subtle)] pb-3">
            <p className="type-meta text-[var(--color-ink-muted)]">
              {t('product')} · {group?.label[docsLocale]}
            </p>
            <p className="type-meta text-[var(--color-ink-muted)]">
              / {t('version')}
            </p>
          </div>
          <h1 className="mt-8 type-h1 text-[var(--color-ink)] [text-wrap:balance]">
            {content.title}
          </h1>
          <p className="mt-4 text-[17px] md:text-[18px] leading-[1.5] text-[var(--color-ink-muted)] [text-wrap:pretty]">
            {content.description}
          </p>
        </header>

        <div className="mt-6">
          <DocsRenderer blocks={content.blocks} locale={locale} chrome={chrome} />
        </div>

        <DocsPagination
          previous={
            previous
              ? { href: docHref(locale, previous.slug), title: previous[docsLocale].title }
              : undefined
          }
          next={
            next ? { href: docHref(locale, next.slug), title: next[docsLocale].title } : undefined
          }
          previousLabel={t('previous')}
          nextLabel={t('next')}
        />
      </article>

      {toc.length >= 2 ? (
        <aside className="hidden xl:block" aria-label={t('onThisPage')}>
          <div className="sticky top-28">
            <p className="type-meta text-[var(--color-ink-dim)] mb-3">
              {t('onThisPage')}
            </p>
            <ul className="space-y-2 border-l border-[var(--color-ink-subtle)]">
              {toc.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    className="block pl-3 text-[14px] leading-snug text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      ) : null}
    </div>
  );
}

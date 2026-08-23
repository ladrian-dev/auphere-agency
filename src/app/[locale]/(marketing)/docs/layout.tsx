import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Container } from '@/components/primitives/Container';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { getDocsNav } from '@/content/docs/registry';
import type { DocsLocale } from '@/content/docs/types';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * Shared shell for /docs: left sidebar on desktop, <details> disclosure
 * on mobile. Content pages render inside the right column.
 */
export default async function DocsLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'docs.chrome' });
  const groups = getDocsNav(locale as DocsLocale);

  const sidebar = (
    <DocsSidebar
      groups={groups}
      homeHref={`/${locale}/docs`}
      homeLabel={t('navLabel')}
      productLabel={t('product')}
    />
  );

  return (
    <div className="hero-y">
      <Container width="wide">
        <div className="lg:grid lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-14">
          <aside className="hidden lg:block">
            <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pb-8 pr-2">
              {sidebar}
            </div>
          </aside>

          <div className="min-w-0">
            <details className="lg:hidden mb-7 border border-[var(--color-ink-subtle)] rounded-[8px] group">
              <summary className="cursor-pointer list-none px-5 py-3.5 type-meta text-[var(--color-ink-muted)] flex items-center justify-between gap-4">
                {t('menu')}
                <span aria-hidden className="transition-transform group-open:rotate-45 text-[14px]">
                  +
                </span>
              </summary>
              <div className="px-5 pb-6 pt-2 border-t border-[var(--color-ink-subtle)]">
                {sidebar}
              </div>
            </details>
            {children}
          </div>
        </div>
      </Container>
    </div>
  );
}

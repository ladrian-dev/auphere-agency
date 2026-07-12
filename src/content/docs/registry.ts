import type { DocGroupId, DocPage, DocsLocale } from './types';
import { embedOverview } from './pages/embed-overview';
import { embedQuickstart } from './pages/embed-quickstart';
import { embedProvisioning } from './pages/embed-provisioning';
import { embedConnectWhatsapp } from './pages/embed-connect-whatsapp';
import { embedBroadcasts } from './pages/embed-broadcasts';
import { embedApiReference } from './pages/embed-api-reference';
import { embedSecurity } from './pages/embed-security';
import { embedTroubleshooting } from './pages/embed-troubleshooting';

/**
 * Ordered registry of every docs page. Order here IS the sidebar order
 * and the prev/next pagination order.
 *
 * To add a page: create a module in `pages/`, import it, and place it in
 * this array. To add a future product, add new group ids in `types.ts`
 * and a new heading in `DOC_GROUPS`.
 */
export const DOC_PAGES: DocPage[] = [
  embedOverview,
  embedQuickstart,
  embedProvisioning,
  embedConnectWhatsapp,
  embedBroadcasts,
  embedApiReference,
  embedSecurity,
  embedTroubleshooting,
];

export const DOC_GROUPS: { id: DocGroupId; label: Record<DocsLocale, string> }[] = [
  { id: 'start', label: { en: 'Getting started', es: 'Primeros pasos' } },
  { id: 'guides', label: { en: 'Guides', es: 'Guías' } },
  { id: 'reference', label: { en: 'Reference', es: 'Referencia' } },
];

export function docHref(locale: string, slug: string[]): string {
  return `/${locale}/docs/${slug.join('/')}`;
}

export function getDocPage(slug: string[]): DocPage | undefined {
  const key = slug.join('/');
  return DOC_PAGES.find((page) => page.slug.join('/') === key);
}

export function getAdjacentPages(slug: string[]): {
  previous: DocPage | undefined;
  next: DocPage | undefined;
} {
  const key = slug.join('/');
  const index = DOC_PAGES.findIndex((page) => page.slug.join('/') === key);
  if (index === -1) return { previous: undefined, next: undefined };
  return { previous: DOC_PAGES[index - 1], next: DOC_PAGES[index + 1] };
}

export interface DocsNavGroup {
  id: DocGroupId;
  label: string;
  items: { title: string; href: string; slug: string[] }[];
}

/** Sidebar structure for one locale. */
export function getDocsNav(locale: DocsLocale): DocsNavGroup[] {
  return DOC_GROUPS.map((group) => ({
    id: group.id,
    label: group.label[locale],
    items: DOC_PAGES.filter((page) => page.group === group.id).map((page) => ({
      title: page[locale].title,
      href: docHref(locale, page.slug),
      slug: page.slug,
    })),
  })).filter((group) => group.items.length > 0);
}

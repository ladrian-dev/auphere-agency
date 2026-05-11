/**
 * Server-safe utilities for FAQ section. Kept in a separate file so the
 * `'use client'` boundary of Faq.tsx doesn't pollute it — server components
 * (the page) need to call this to build the FAQPage JSON-LD schema.
 */

const FAQ_KEYS = [
  'cost',
  'timing',
  'codeOwnership',
  'leaving',
  'compliance',
  'channels',
  'engineer',
  'metrics',
  'nda',
  'different',
  'noNeed',
] as const;

export interface FaqItemData {
  q: string;
  a: string;
}

/**
 * Build FAQ items list from a translator. Pass a `getTranslations({namespace:'faq'})`
 * result. The `t` is typed loosely so we can use it from server context where
 * the namespaced types may not infer perfectly.
 */
export function getFaqItems(t: (key: string) => string): FaqItemData[] {
  return FAQ_KEYS.map((key) => ({
    q: t(`items.${key}.q`),
    a: t(`items.${key}.a`),
  }));
}

/**
 * Server-safe helper to resolve a vertical's FAQ items into {q,a} pairs.
 * Mirrors the pattern of components/sections/faq-utils.ts but works against
 * the dynamic `useCases.{vertical}.faq` namespace and a vertical-specific
 * ordered key list (from verticals.ts).
 */

export interface VerticalFaqItem {
  q: string;
  a: string;
}

export function getVerticalFaqItems(
  faqKeys: readonly string[],
  t: (key: string) => string,
): VerticalFaqItem[] {
  return faqKeys.map((key) => ({
    q: t(`items.${key}.q`),
    a: t(`items.${key}.a`),
  }));
}

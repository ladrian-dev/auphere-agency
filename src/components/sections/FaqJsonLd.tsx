import type { FaqItemData } from './faq-utils';

/**
 * Server component that emits the FAQPage JSON-LD schema as a <script> tag.
 * Kept in its own file (no 'use client' directive) so the schema is rendered
 * server-side even if the interactive <Faq> accordion is lazy-mounted,
 * suspended or hidden behind a client boundary.
 */
export function FaqJsonLd({ items }: { items: FaqItemData[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
  return (
    <script
      type="application/ld+json"
       
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

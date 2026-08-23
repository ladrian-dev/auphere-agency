import { Container } from '@/components/primitives/Container';
import type { ReactNode } from 'react';

interface ProseProps {
  children: ReactNode;
}

/**
 * Editorial prose container for legal pages (Privacy, Terms, Trust).
 * Narrow column, generous leading, monospace section numbers.
 */
export function LegalProse({ children }: ProseProps) {
  return (
    <Container width="narrow" className="pb-24 md:pb-32">
      <div className="prose-legal text-[var(--color-ink)] text-[17px] leading-[1.65]">
        {children}
      </div>
    </Container>
  );
}

interface SectionProps {
  number: string;
  title: string;
  children: ReactNode;
}

/**
 * Numbered section inside LegalProse. Renders as:
 *
 *   01 · Data we collect
 *   ─────────────────────
 *   ...body...
 */
export function LegalSection({ number, title, children }: SectionProps) {
  return (
    <section className="mt-14 md:mt-20 first:mt-0 scroll-mt-32" id={`section-${number}`}>
      <div className="flex items-baseline gap-4 border-b border-[var(--color-ink-subtle)] pb-3 mb-6">
        <span className="type-meta text-[var(--color-ink-muted)]">
          {number}
        </span>
        <h2 className="type-h3 text-[var(--color-ink)]">
          {title}
        </h2>
      </div>
      <div className="space-y-4 text-[16px] md:text-[17px] leading-[1.65] text-[var(--color-ink)]">
        {children}
      </div>
    </section>
  );
}

interface ListProps {
  items: { term: string; description: string }[];
  /** Set to false to drop the top border when the list sits directly under a section header (which already has a bottom border). */
  topBorder?: boolean;
}

/**
 * Definition list — used for sub-processors, rights, etc.
 */
export function LegalDefinitionList({ items, topBorder = true }: ListProps) {
  return (
    <dl
      className={`mt-4 divide-y divide-[var(--color-ink-subtle)] border-b border-[var(--color-ink-subtle)] ${
        topBorder ? 'border-t' : ''
      }`}
    >
      {items.map((item) => (
        <div key={item.term} className="py-4 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-6">
          <dt className="type-meta text-[var(--color-ink-muted)] pt-0.5">
            {item.term}
          </dt>
          <dd className="text-[15px] md:text-[16px] leading-[1.55] text-[var(--color-ink)]">
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}

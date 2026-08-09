'use client';
import { useId, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { cn } from '@/lib/utils/cn';
import { track } from '@/lib/analytics';
import type { FaqItemData } from './faq-utils';

interface FaqHeader {
  label: string;
  meta: string;
  headline: string;
  intro: string;
}

export function Faq({
  items,
  namespace = 'faq',
  sectionNumber = '06',
  header,
}: {
  items: FaqItemData[];
  namespace?: string;
  sectionNumber?: string;
  /** Header copy passed directly (content-module pages). Overrides namespace lookups. */
  header?: FaqHeader;
}) {
  // next-intl types the namespace as a strict literal union; we accept any
  // string here so this component can be reused by multiple landing pages.
  const t = useTranslations(namespace as Parameters<typeof useTranslations>[0]);
  const label = header?.label ?? t('marker.label');
  const meta = header?.meta ?? t('marker.meta');
  const headline = header?.headline ?? t('headline');
  const intro = header?.intro ?? t('intro');

  return (
    <section id="faq" className="py-24 md:py-32">
      <SectionMarker number={sectionNumber} label={label} meta={meta} />

      <Container width="default">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 lg:gap-16">
          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-display font-bold text-[clamp(1.875rem,1.1rem+2.4vw,3rem)] leading-[1.06] tracking-[-0.03em] text-balance">
              {headline}
            </h2>
            <p className="text-[var(--color-ink-muted)] mt-5 leading-relaxed max-w-[42ch] text-pretty">
              {intro}
            </p>
          </div>

          <div className="min-w-0 flex flex-col">
            {items.map((item, i) => (
              <FaqAccordionItem key={i} q={item.q} a={item.a} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function FaqAccordionItem({
  q,
  a,
  defaultOpen = false,
}: {
  q: string;
  a: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  // Stable IDs for ARIA accordion pattern (APG Disclosure / accordion)
  const uid = useId();
  const buttonId = `faq-btn-${uid}`;
  const panelId = `faq-panel-${uid}`;

  return (
    <div className="border-b border-[var(--color-ink-subtle)] first:border-t">
      <h3 className="m-0">
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          className="w-full flex items-start justify-between gap-4 md:gap-6 py-5 md:py-6 text-left group font-display font-semibold text-[17px] md:text-xl tracking-[-0.01em] text-[var(--color-ink)] hover:text-[var(--color-bangladesh-green)] transition-colors motion-reduce:transition-none"
          onClick={() =>
            setOpen((v) => {
              if (!v) track('faq_open', { question: q.slice(0, 60) });
              return !v;
            })
          }
        >
          <span className="min-w-0 text-pretty">{q}</span>
          <span
            aria-hidden
            className={cn(
              'shrink-0 w-7 h-7 rounded-full border border-[var(--color-ink-subtle)] flex items-center justify-center text-[var(--color-ink-muted)] mt-0.5',
              'group-hover:border-[var(--color-ink-dim)] transition-colors duration-300 motion-reduce:transition-none',
            )}
          >
            {/* Rota el glifo, no el círculo: rotar el contenedor multiplicaba su
                caja por √2 (28 → 39,6 px) y desbordaba la fila. §E-7 */}
            <svg
              viewBox="0 0 16 16"
              className={cn(
                'w-3 h-3 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none',
                open && 'rotate-45',
              )}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M8 3v10M3 8h10" />
            </svg>
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="grid transition-[grid-template-rows,opacity] duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? '1fr' : '0fr', opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <p className="text-[15px] leading-relaxed text-[var(--color-ink-muted)] pb-6 max-w-2xl">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}


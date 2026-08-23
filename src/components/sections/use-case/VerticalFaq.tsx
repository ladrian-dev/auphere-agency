'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { cn } from '@/lib/utils/cn';
import type { VerticalSlug } from '@/lib/use-cases/verticals';
import type { VerticalFaqItem } from './verticalFaqUtils';

interface Props {
  vertical: VerticalSlug;
  items: VerticalFaqItem[];
  number: string;
}

export function VerticalFaq({ vertical, items, number }: Props) {
  const t = useTranslations(`useCases.${vertical}.faq`);

  return (
    <section id="vertical-faq" className="section-y bg-[var(--color-bone)]">
      <SectionMarker number={number} label={t('marker.label')} meta={t('marker.meta')} />

      <Container width="wide">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="type-h2">
              {t('headline')}
            </h2>
          </div>

          <div className="flex flex-col">
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

  return (
    <div className="border-b border-[var(--color-ink-subtle)] first:border-t">
      <button
        type="button"
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="font-display font-semibold text-lg md:text-xl tracking-[-0.01em] text-[var(--color-ink)] group-hover:text-[var(--color-bangladesh-green)] transition-colors">
          {q}
        </span>
        <span
          aria-hidden
          className={cn(
            'shrink-0 w-[28px] h-[28px] rounded-full border border-[var(--color-ink-subtle)] flex items-center justify-center text-[var(--color-ink-muted)] mt-0.5',
            'group-hover:border-[var(--color-ink-dim)] transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none',
            open && 'rotate-45',
          )}
        >
          <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M8 3v10M3 8h10" />
          </svg>
        </span>
      </button>
      <div
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

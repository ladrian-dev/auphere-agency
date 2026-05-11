'use client';
import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { cn } from '@/lib/utils/cn';
import type { FaqItemData } from './faq-utils';

export function Faq({ items }: { items: FaqItemData[] }) {
  const t = useTranslations('faq');

  return (
    <>
      {/* JSON-LD FAQPage schema for SEO + AI Overview */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: items.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          }),
        }}
      />

      <section id="faq" className="py-24 md:py-32">
        <SectionMarker number="05" label={t('marker.label')} meta={t('marker.meta')} />

        <Container width="default">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.03em]">
                {t('headline')}
              </h2>
              <p className="text-[var(--color-ink-muted)] mt-5 leading-relaxed">
                {t('intro')}
              </p>
            </div>

            <div className="flex flex-col">
              {items.map((item, i) => (
                <FaqAccordionItem key={i} q={item.q} a={item.a} defaultOpen={i === 0} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
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
  const reducedMotion = useReducedMotion();

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
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 45 : 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className={cn(
            'shrink-0 w-7 h-7 rounded-full border border-[var(--color-ink-subtle)] flex items-center justify-center text-[var(--color-ink-muted)] mt-0.5',
            'group-hover:border-[var(--color-ink-dim)] transition-colors',
          )}
        >
          <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M8 3v10M3 8h10" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              reducedMotion ? { duration: 0 } : { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
            }
            className="overflow-hidden"
          >
            <p className="text-[15px] leading-relaxed text-[var(--color-ink-muted)] pb-6 max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';
import { motion } from 'motion/react';
import { Container } from '@/components/primitives/Container';

interface Props {
  eyebrow: string;
  meta: string;
  title: string;
  intro?: string;
}

/**
 * Editorial page header used by inner pages (About / Privacy / Terms / Trust).
 * Mirrors the SectionMarker grammar from the landing — [meta] LABEL / META —
 * but renders as the H1 of the page rather than a section divider.
 */
export function PageHeader({ eyebrow, meta, title, intro }: Props) {
  return (
    <Container width="wide" className="pt-32 md:pt-40 pb-12 md:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className="flex items-baseline justify-between gap-4 border-b border-[var(--color-ink-subtle)] pb-4 mb-10 md:mb-14"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.18em]">
          <span className="text-[var(--color-ink-muted)]">{eyebrow}</span>
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
          / {meta}
        </p>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.05 }}
        className="font-display text-[40px] md:text-[64px] leading-[1.05] tracking-[-0.02em] text-[var(--color-ink)] max-w-4xl"
      >
        {title}
      </motion.h1>

      {intro ? (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.12 }}
          className="font-display text-[20px] md:text-[24px] leading-[1.35] text-[var(--color-ink-muted)] mt-6 max-w-3xl"
        >
          {intro}
        </motion.p>
      ) : null}
    </Container>
  );
}

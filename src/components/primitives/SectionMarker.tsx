'use client';
import { motion } from 'motion/react';
import { Container } from './Container';
import { cn } from '@/lib/utils/cn';

interface Props {
  /** Section number — "01", "02"... */
  number: string;
  /** Concept label, uppercase */
  label: string;
  /** Right-side metadata (e.g. "5 DÍAS · CERRADO", "DATA ↔ BUSINESS") */
  meta: string;
  className?: string;
  variant?: 'light' | 'dark';
}

const VARIANTS = {
  light: {
    border: 'border-[var(--color-ink-subtle)]',
    numLabel: 'text-[var(--color-ink-muted)]',
    label: 'text-[var(--color-ink)]',
    meta: 'text-[var(--color-ink-muted)]',
  },
  dark: {
    border: 'border-[var(--color-bone)]/15',
    numLabel: 'text-[var(--color-bone)]/50',
    label: 'text-[var(--color-bone)]',
    meta: 'text-[var(--color-bone)]/50',
  },
};

/**
 * Attio-style section marker.
 *
 *   [01]  DIAGNÓSTICO                                      / 5 DÍAS · CERRADO
 *   ─────────────────────────────────────────────────────────────────────────
 */
export function SectionMarker({ number, label, meta, className, variant = 'light' }: Props) {
  const v = VARIANTS[variant];
  return (
    <Container width="wide" className={cn('mb-12 md:mb-20', className)}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className={cn('flex items-baseline justify-between gap-4 border-b pb-4', v.border)}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.18em]">
          <span className={v.numLabel}>[{number}]</span>
          <span className={cn('ml-3', v.label)}>{label}</span>
        </p>
        <p className={cn('font-mono text-[11px] uppercase tracking-[0.18em]', v.meta)}>
          / {meta}
        </p>
      </motion.div>
    </Container>
  );
}

'use client';
import { Container } from './Container';
import { cn } from '@/lib/utils/cn';
import { useReveal } from '@/lib/motion/reveal';

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
  const ref = useReveal<HTMLDivElement>({ y: 10 });
  return (
    <Container width="wide" className={cn('mb-12 md:mb-20', className)}>
      <div ref={ref} className={cn('flex items-baseline justify-between gap-4 border-b pb-4', v.border)}>
        <p className="type-meta">
          <span className={v.numLabel}>[{number}]</span>
          <span className={cn('ml-3', v.label)}>{label}</span>
        </p>
        <p className={cn('type-meta', v.meta)}>
          / {meta}
        </p>
      </div>
    </Container>
  );
}

'use client';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
  /** When `link`, renders as a flat link with arrow (Attio newsbar pattern). When `pill`, renders as bordered pill. */
  style?: 'pill' | 'link';
  href?: string;
}

const VARIANT_COLORS = {
  light: 'text-[var(--color-ink-muted)] border-[var(--color-ink-subtle)]',
  dark: 'text-[var(--color-bone)]/80 border-[var(--color-bone)]/20',
};

export function Eyebrow({ children, className, variant = 'light', style = 'pill', href }: Props) {
  const Tag = href ? motion.a : motion.span;
  const stylesByStyle =
    style === 'link'
      ? 'text-[15px] font-medium hover:opacity-80 transition-opacity'
      : cn(
          'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5',
          'font-mono text-[11px] uppercase tracking-[0.18em]',
          'backdrop-blur-sm',
          VARIANT_COLORS[variant],
        );

  return (
    <Tag
      {...(href ? { href } : {})}
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      className={cn(stylesByStyle, className)}
    >
      {children}
      {style === 'link' && (
        <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5" aria-hidden>
          →
        </span>
      )}
    </Tag>
  );
}

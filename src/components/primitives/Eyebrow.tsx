'use client';
import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';
import { useReveal } from '@/lib/motion/reveal';

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
  const ref = useReveal<HTMLElement>({ y: 6 });
  const Tag = (href ? 'a' : 'span') as 'a';
  const stylesByStyle =
    style === 'link'
      ? 'text-[15px] font-medium hover:opacity-80 transition-opacity'
      : cn(
          'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5',
          'type-meta',
          'backdrop-blur-sm',
          VARIANT_COLORS[variant],
        );

  return (
    <Tag ref={ref as never} {...(href ? { href } : {})} className={cn(stylesByStyle, className)}>
      {children}
      {style === 'link' && (
        <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5" aria-hidden>
          →
        </span>
      )}
    </Tag>
  );
}

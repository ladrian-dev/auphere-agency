import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
}

export function Caption({ children, className, variant = 'light' }: Props) {
  return (
    <span
      className={cn(
        'font-mono text-xs uppercase tracking-[0.12em]',
        variant === 'dark' ? 'text-[var(--color-bone)]/60' : 'text-[var(--color-ink-muted)]',
        className,
      )}
    >
      {children}
    </span>
  );
}

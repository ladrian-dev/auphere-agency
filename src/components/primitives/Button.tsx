import { cn } from '@/lib/utils/cn';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'md' | 'lg';

interface BaseProps {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-ink)] text-[var(--color-bone)] hover:bg-[var(--color-bangladesh-green)] active:scale-[0.98]',
  outline:
    'bg-transparent text-[var(--color-ink)] border border-[var(--color-ink-subtle)] hover:border-[var(--color-ink)] hover:bg-[var(--color-ink-faint)] active:scale-[0.98]',
  ghost:
    'bg-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-ink-faint)]',
};

const SIZES: Record<ButtonSize, string> = {
  md: 'h-[44px] px-[20px] text-[14px]',
  lg: 'h-[52px] px-[24px] text-[15px]',
};

const BASE = [
  'inline-flex items-center justify-center gap-2',
  'rounded-full font-medium tracking-tight',
  'transition-[background-color,transform,border-color,color] duration-200 ease-out',
  'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-3',
  'whitespace-nowrap',
].join(' ');

type Props<T extends ElementType> = BaseProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof BaseProps | 'as'>;

export function Button<T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: Props<T>) {
  const Tag = (as ?? 'button') as ElementType;
  return (
    <Tag className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...rest}>
      {children}
    </Tag>
  );
}

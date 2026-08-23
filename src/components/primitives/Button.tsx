import { cn } from '@/lib/utils/cn';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'inverse' | 'outline-inverse';
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
  // Sobre superficie oscura (surface-deep / surface-hero / surface-darker).
  // Cada página se los escribía a mano: seis variantes del mismo botón, dos de
  // ellas sin `focus-visible`.
  inverse:
    'bg-[var(--color-bone)] text-[var(--color-ink)] hover:bg-[var(--color-caribbean-green)] active:scale-[0.98]',
  'outline-inverse':
    'bg-transparent text-[var(--color-bone)] border border-[var(--color-bone)]/30 hover:border-[var(--color-bone)]/60 hover:bg-[var(--color-bone)]/5 active:scale-[0.98]',
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

/**
 * Clases del botón sin el componente. Existe para los CTA que ya son `<a>` o
 * `<Link>` dentro de una página: antes cada uno reescribía la receta a mano
 * —diez variantes del mismo par de botones, cuatro de ellas sin
 * `focus-visible`— en vez de compartir esta.
 */
export function buttonClasses({
  variant = 'primary',
  size = 'md',
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

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
    <Tag className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
    </Tag>
  );
}

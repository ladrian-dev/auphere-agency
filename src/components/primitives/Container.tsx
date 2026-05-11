import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  /** Visual width preset. `narrow` for editorial copy, `default` for most sections, `wide` for hero/grids. */
  width?: 'narrow' | 'default' | 'wide';
}

const WIDTHS = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-[1280px]',
};

export function Container({ children, className = '', width = 'default' }: Props) {
  return (
    <div className={cn('mx-auto px-6 md:px-10 lg:px-12', WIDTHS[width], className)}>
      {children}
    </div>
  );
}

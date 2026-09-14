import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  /** Ancho visual. `narrow` para prosa editorial, `default` para casi todo, `wide` para heroes y grids. */
  width?: 'narrow' | 'default' | 'wide';
}

const WIDTHS = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-[1280px]',
};

/** Contenedor de las páginas heredadas (v3). El rediseño usa `container-site`. */
export function Container({ children, className = '', width = 'default' }: Props) {
  return <div className={cn('mx-auto px-6 md:px-10 lg:px-12', WIDTHS[width], className)}>{children}</div>;
}

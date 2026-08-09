'use client';
import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';
import { useStageInset } from '@/components/motion/narrative/NarrativeSequence';

interface Props {
  children: ReactNode;
  className?: string;
  /** Visual width preset. `narrow` for editorial copy, `default` for most sections, `wide` for hero/grids. */
  width?: 'narrow' | 'default' | 'wide';
  /**
   * Deja el contenido a ancho completo aunque esté dentro de la secuencia
   * narrativa. Para bandas que deben cruzar la página por debajo del plano.
   */
  ignoreStageInset?: boolean;
}

const WIDTHS = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-[1280px]',
};

export function Container({ children, className = '', width = 'default', ignoreStageInset = false }: Props) {
  // Dentro de `<NarrativeSequence>` el plano ocupa el 46 % derecho de la
  // pantalla desde `xl`. El contenido se retira a la izquierda para no quedar
  // debajo. Se hace aquí y no en cada sección para que ninguna se olvide.
  const inset = useStageInset() && !ignoreStageInset;

  return (
    <div
      className={cn(
        'mx-auto px-6 md:px-10 lg:px-12',
        WIDTHS[width],
        inset && 'xl:mx-0 xl:max-w-none xl:pr-[48%] xl:pl-[max(3rem,calc((100vw-1280px)/2+3rem))]',
        className,
      )}
    >
      {children}
    </div>
  );
}

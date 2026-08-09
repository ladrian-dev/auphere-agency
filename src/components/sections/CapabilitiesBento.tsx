'use client';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { cn } from '@/lib/utils/cn';
import { registerAuphereGSAP, Flip, gsap } from '@/lib/motion/gsap';
import { useStageInset } from '@/components/motion/narrative/NarrativeSequence';

const CELL_KEYS = ['media', 'memory', 'jobs', 'browser', 'escalation', 'hygiene'] as const;
type CellKey = (typeof CELL_KEYS)[number];

/**
 * Ancho de cada celda en la rejilla de 4 columnas de `lg`. Dos celdas anchas en
 * diagonal (la primera de la fila 1, la última de la fila 2) rompen la simetría
 * y dan jerarquía real: antes eran seis tarjetas idénticas en 3 columnas, que es
 * exactamente el "feature grid" genérico que la sección quería evitar (§E-6).
 * 2 + 1 + 1 y 1 + 1 + 2 llenan las dos filas exactamente.
 */
const CELL_SPAN: Record<CellKey, string> = {
  media: 'lg:col-span-2',
  memory: 'lg:col-span-1',
  jobs: 'lg:col-span-1',
  browser: 'lg:col-span-1',
  escalation: 'lg:col-span-1',
  hygiene: 'lg:col-span-2',
};

/** Variante de la rejilla cuando el plano ocupa la mitad derecha: 2 columnas. */
const CELL_SPAN_INSET: Record<CellKey, string> = {
  media: 'lg:col-span-2',
  memory: 'lg:col-span-1',
  jobs: 'lg:col-span-1',
  browser: 'lg:col-span-1',
  escalation: 'lg:col-span-1',
  hygiene: 'lg:col-span-2',
};

/**
 * §6.1 [02] — capacidades reales (todo verificado contra claims.ts).
 * A-06: la celda crece in-place con GSAP Flip (0.45 s, ease auphere).
 * Escape cierra, aria-expanded. Reduced motion: expansión instantánea sin Flip.
 *
 * La celda abierta ya NO pasa a ocupar la fila entera: eso reordenaba la rejilla
 * de golpe cada vez que alguien abría una tarjeta. Ahora solo crece en alto y
 * Flip anima el desplazamiento de las vecinas.
 */
export function CapabilitiesBento() {
  const t = useTranslations('capabilities');
  const gridRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<CellKey | null>(null);
  const inset = useStageInset();

  function toggle(key: CellKey) {
    registerAuphereGSAP();
    const grid = gridRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!grid || reduced) {
      setExpanded((prev) => (prev === key ? null : key));
      return;
    }
    const state = Flip.getState(grid.querySelectorAll('[data-bento-cell]'));
    setExpanded((prev) => (prev === key ? null : key));
    // Flip after React commits the new layout.
    requestAnimationFrame(() => {
      Flip.from(state, { duration: 0.45, ease: 'auphere', absolute: false, nested: true });
      const detail = grid.querySelector<HTMLElement>(`[data-bento-cell="${key}"] [data-bento-detail]`);
      if (detail) gsap.fromTo(detail, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, delay: 0.15, ease: 'auphere-expo' });
    });
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Escape' && expanded) {
      toggle(expanded);
    }
  }

  return (
    <section className="py-24 md:py-32 border-t border-[var(--color-ink-subtle)]" onKeyDown={onKeyDown}>
      <SectionMarker number="02" label={t('marker.label')} meta={t('marker.meta')} />
      <Container width="wide">
        <div className="max-w-3xl mb-10 md:mb-14">
          <h2 className="font-display font-bold text-[clamp(1.875rem,1.1rem+2.6vw,3.25rem)] leading-[1.05] tracking-[-0.03em] text-balance">
            {t('headline')}
          </h2>
          <p className="font-display font-medium text-[clamp(1rem,0.9rem+0.4vw,1.1875rem)] leading-[1.5] text-[var(--color-ink-muted)] mt-5 max-w-[56ch] text-pretty">
            {t('intro')}
          </p>
        </div>

        <div
          ref={gridRef}
          className={cn(
            'grid grid-cols-1 md:grid-cols-2 gap-3',
            inset ? 'lg:grid-cols-2' : 'lg:grid-cols-4',
          )}
        >
          {CELL_KEYS.map((key) => {
            const isOpen = expanded === key;
            return (
              <div
                key={key}
                data-bento-cell={key}
                className={cn(
                  'rounded-2xl border bg-[var(--color-bone)] transition-colors motion-reduce:transition-none',
                  inset ? CELL_SPAN_INSET[key] : CELL_SPAN[key],
                  isOpen
                    ? 'border-[var(--color-bangladesh-green)]/45 bg-[var(--color-ink-faint)]'
                    : 'border-[var(--color-ink-subtle)] hover:border-[var(--color-ink-dim)]',
                )}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(key)}
                  className="w-full h-full text-left p-5 md:p-6 flex flex-col gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-bangladesh-green)] rounded-2xl"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="min-w-0 font-display font-semibold text-[17px] md:text-[18px] leading-snug tracking-[-0.01em] text-pretty">
                      {t(`cells.${key}.title`)}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        'shrink-0 w-7 h-7 rounded-full border border-[var(--color-ink-subtle)] flex items-center justify-center text-[var(--color-ink-muted)]',
                        'transition-colors duration-300 motion-reduce:transition-none',
                      )}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        className={cn(
                          'w-3 h-3 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none',
                          isOpen && 'rotate-45',
                        )}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M8 3v10M3 8h10" />
                      </svg>
                    </span>
                  </span>
                  <span className="text-[13.5px] leading-relaxed text-[var(--color-ink-muted)] text-pretty">
                    {t(`cells.${key}.body`)}
                  </span>
                  {isOpen && (
                    <span
                      data-bento-detail
                      className="block text-[14.5px] leading-relaxed text-[var(--color-ink)] mt-3 border-t border-[var(--color-ink-subtle)] pt-4 text-pretty"
                    >
                      {t(`cells.${key}.detail`)}
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

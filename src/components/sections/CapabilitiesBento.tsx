'use client';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { cn } from '@/lib/utils/cn';
import { registerAuphereGSAP, Flip, gsap } from '@/lib/motion/gsap';

const CELL_KEYS = ['media', 'memory', 'jobs', 'browser', 'escalation', 'hygiene'] as const;
type CellKey = (typeof CELL_KEYS)[number];

/**
 * §6.1 [01] — bento de capacidades reales (todo verificado contra claims.ts).
 * A-06: la celda se expande in-place con GSAP Flip (0.45 s, ease auphere).
 * Escape cierra, aria-expanded, foco al panel. Reduced motion: expansión
 * instantánea sin Flip.
 */
export function CapabilitiesBento() {
  const t = useTranslations('capabilities');
  const gridRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<CellKey | null>(null);

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
      <SectionMarker number="01" label={t('marker.label')} meta={t('marker.meta')} />
      <Container width="wide">
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.03em]">
            {t('headline')}
          </h2>
          <p className="font-display font-medium text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.5] text-[var(--color-ink-muted)] mt-6">
            {t('intro')}
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {CELL_KEYS.map((key) => {
            const isOpen = expanded === key;
            return (
              <div
                key={key}
                data-bento-cell={key}
                className={cn(
                  'rounded-2xl border border-[var(--color-ink-subtle)] bg-[var(--color-bone)] transition-colors',
                  isOpen ? 'md:col-span-2 lg:col-span-3 border-[var(--color-bangladesh-green)]/40' : 'hover:border-[var(--color-ink-dim)]',
                )}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(key)}
                  className="w-full text-left p-6 md:p-7 flex flex-col gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-bangladesh-green)] rounded-2xl"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="font-display font-semibold text-[17px] md:text-[18px] leading-snug tracking-[-0.01em]">
                      {t(`cells.${key}.title`)}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        'shrink-0 w-6 h-6 rounded-full border border-[var(--color-ink-subtle)] flex items-center justify-center text-[var(--color-ink-muted)] transition-transform duration-300',
                        isOpen && 'rotate-45',
                      )}
                    >
                      <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M8 3v10M3 8h10" />
                      </svg>
                    </span>
                  </span>
                  <span className="text-[13.5px] leading-relaxed text-[var(--color-ink-muted)]">{t(`cells.${key}.body`)}</span>
                  {isOpen && (
                    <span data-bento-detail className="block text-[14.5px] leading-relaxed text-[var(--color-ink)] mt-3 max-w-3xl border-t border-[var(--color-ink-subtle)] pt-4">
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

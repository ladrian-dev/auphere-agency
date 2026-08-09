'use client';
import { useRef } from 'react';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { Orchestrator, type OrchestratorLabels } from '@/components/motion/Orchestrator';
import { useAuphereGSAP } from '@/lib/motion/gsap';
import { cn } from '@/lib/utils/cn';

interface Stop {
  title: string;
  body: string;
}

interface Props {
  labels: OrchestratorLabels;
  stops: Stop[];
  marker: { label: string; meta: string };
}

const STOP_GROUPS = ['channels', 'classifier', 'tools', 'response', 'human'] as const;

/**
 * A-05 — scroll narrativo del ciclo de vida de una conversación sobre el
 * orquestador. El diagrama queda sticky (CSS) mientras las 5 paradas
 * scrollean; cada parada ilumina su región del diagrama (un ScrollTrigger
 * por parada, 5 en total — sin pin: la única sección pinned del sitio es
 * la de la home).
 *
 * Reduced motion: diagrama estático + lista numerada, sin resaltado.
 */
export function LifecycleNarrative({ labels, stops, marker }: Props) {
  const rootRef = useRef<HTMLElement>(null);

  useAuphereGSAP(
    ({ reduced, gsap }) => {
      const root = rootRef.current;
      if (!root || reduced) return;

      const stopEls = root.querySelectorAll<HTMLElement>('[data-lifecycle-stop]');
      const groups = STOP_GROUPS.map((g) => root.querySelectorAll<SVGGElement>(`[data-orch-group="${g}"]`));
      if (!stopEls.length) return;

      const setActive = (index: number) => {
        groups.forEach((els, i) => {
          gsap.to(els, { opacity: i === index ? 1 : 0.25, duration: 0.35, ease: 'auphere', overwrite: 'auto' });
        });
        stopEls.forEach((el, i) => {
          el.dataset.active = i === index ? 'true' : 'false';
        });
      };

      stopEls.forEach((el, i) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 60%',
            end: 'bottom 60%',
            onEnter: () => setActive(i),
            onEnterBack: () => setActive(i),
          },
        });
      });
      setActive(0);
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="py-24 md:py-32 border-t border-[var(--color-ink-subtle)]">
      <SectionMarker number="01" label={marker.label} meta={marker.meta} />
      <Container width="wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Sticky diagram — light surface variant */}
          <div className="hidden lg:block">
            <div className="sticky top-28 text-[var(--color-ink)]" style={{ ['--orchestrator-accent' as string]: 'var(--color-bangladesh-green)' }}>
              <Orchestrator labels={labels} className="w-full" />
            </div>
          </div>

          <ol className="flex flex-col gap-[18vh] lg:py-[12vh]">
            {stops.map((stop, i) => (
              <li
                key={i}
                data-lifecycle-stop
                className={cn(
                  'max-w-lg transition-opacity duration-300',
                  'data-[active=false]:lg:opacity-40 data-[active=true]:opacity-100',
                )}
              >
                <p className="font-mono text-[12px] tracking-[0.18em] text-[var(--color-bangladesh-green)]">
                  {String(i + 1).padStart(2, '0')} / {String(stops.length).padStart(2, '0')}
                </p>
                <h3 className="font-display font-bold text-[24px] md:text-[30px] leading-[1.08] tracking-[-0.02em] mt-3">
                  {stop.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[var(--color-ink-muted)] mt-4">{stop.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

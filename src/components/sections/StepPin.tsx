'use client';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { useAuphereGSAP } from '@/lib/motion/gsap';

const STEP_KEYS = ['diagnose', 'configure', 'goLive'] as const;

/**
 * §6.1 [02] + A-04 — Cómo trabajamos como sticky scroll pinned de 3 etapas.
 * pin: true · scrub 0.6 · end +=200%. La etapa activa gana contraste, las
 * otras bajan a ink-muted; barra de progreso lateral. LA ÚNICA sección
 * pinned de todo el sitio.
 *
 * Reduced motion y <lg: grid vertical de 3, sin pin.
 */
export function StepPin() {
  const t = useTranslations('howWeWork');
  const sectionRef = useRef<HTMLElement>(null);

  useAuphereGSAP(
    ({ reduced, gsap }) => {
      const section = sectionRef.current;
      if (!section || reduced) return;
      if (!window.matchMedia('(min-width: 1024px)').matches) return;

      const steps = section.querySelectorAll<HTMLElement>('[data-step]');
      const bar = section.querySelector<HTMLElement>('[data-step-progress]');
      const numbers = section.querySelectorAll<HTMLElement>('[data-step-number]');
      if (!steps.length || !bar) return;

      gsap.set(steps, { opacity: 0.28 });
      gsap.set(steps[0]!, { opacity: 1 });
      gsap.set(bar, { scaleY: 0, transformOrigin: 'top' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 0.6,
        },
      });

      steps.forEach((step, i) => {
        const at = i / steps.length;
        if (i > 0) {
          tl.to(steps[i - 1]!, { opacity: 0.28, duration: 0.18 }, at);
          tl.to(step, { opacity: 1, duration: 0.18 }, at);
          tl.to(numbers[i - 1]!, { color: 'var(--color-ink-muted)', duration: 0.18 }, at);
        }
        tl.to(numbers[i]!, { color: 'var(--color-caribbean-green)', duration: 0.18 }, at);
      });
      tl.to(bar, { scaleY: 1, ease: 'none', duration: 1 }, 0);
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="how" className="relative py-20 md:py-24 lg:min-h-screen lg:flex lg:flex-col lg:justify-center border-t border-[var(--color-ink-subtle)]">
      <SectionMarker number="02" label={t('marker.label')} meta={t('marker.meta')} />
      <Container width="wide">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.03em]">
            {t('headline')}
          </h2>
          <p className="font-display font-medium text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.5] text-[var(--color-ink-muted)] mt-6">
            {t('intro')}
          </p>
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-6 lg:gap-12">
          {/* Progress rail (desktop) */}
          <div aria-hidden className="hidden lg:block relative w-px bg-[var(--color-ink-subtle)]">
            <div data-step-progress className="absolute inset-x-0 top-0 h-full bg-[var(--color-caribbean-green)]" style={{ transform: 'scaleY(0)' }} />
          </div>

          <div className="col-span-2 lg:col-span-1 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
            {STEP_KEYS.map((key, i) => (
              <article key={key} data-step className="flex flex-col gap-4">
                <p data-step-number className="font-mono text-[12px] tracking-[0.18em] text-[var(--color-ink-muted)]">
                  {String(i + 1).padStart(2, '0')} / {String(STEP_KEYS.length).padStart(2, '0')}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                  {t(`steps.${key}.timing`)}
                </p>
                <h3 className="font-display font-bold text-[24px] md:text-[28px] leading-[1.08] tracking-[-0.02em]">
                  {t(`steps.${key}.title`)}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                  {t(`steps.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

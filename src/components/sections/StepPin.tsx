'use client';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { useAuphereGSAP } from '@/lib/motion/gsap';
import { useStageInset } from '@/components/motion/narrative/NarrativeSequence';
import { cn } from '@/lib/utils/cn';

const STEP_KEYS = ['diagnose', 'configure', 'goLive'] as const;

/**
 * §6.1 [03] — Cómo trabajamos: tres etapas con la activa destacada al hacer
 * scroll. LA ÚNICA sección con scroll dirigido de todo el sitio.
 *
 * Tres correcciones de la auditoría 2026-08-09:
 *
 *  · §E-2 — la sección era `lg:flex lg:flex-col`. Un `mx-auto max-w-*` dentro
 *    de un flex column deja de estirar (los márgenes auto ganan a
 *    `align-items: stretch`), así que el SectionMarker se encogía a su
 *    contenido y se centraba, con un ancho distinto al del resto de la página.
 *    Ahora la sección es flujo normal.
 *
 *  · §E-3 — los pasos inactivos estaban a `opacity 0.28`: 1,48:1 y 1,90:1 de
 *    contraste, el único fallo WCAG que devolvía axe en la home. Sin scroll o
 *    con reduced-motion el texto era ilegible. El suelo sube a 0.62 (≥4,5:1) y
 *    la jerarquía la marca ahora la regla lateral, no la desaparición del texto.
 *
 *  · §F-3 — el pin secuestraba un 200 % de scroll para tres párrafos. Se
 *    sustituye por un realce por proximidad: la etapa que está en el centro de
 *    la pantalla gana contraste, sin bloquear el scroll de nadie.
 */
export function StepPin() {
  const t = useTranslations('howWeWork');
  const sectionRef = useRef<HTMLElement>(null);
  const inset = useStageInset();

  useAuphereGSAP(
    ({ reduced, gsap }) => {
      const section = sectionRef.current;
      if (!section || reduced) return;
      if (!window.matchMedia('(min-width: 1024px)').matches) return;

      const steps = section.querySelectorAll<HTMLElement>('[data-step]');
      const bar = section.querySelector<HTMLElement>('[data-step-progress]');
      const numbers = section.querySelectorAll<HTMLElement>('[data-step-number]');
      if (!steps.length || !bar) return;

      // La barra de progreso se llena con el avance de la sección por la
      // pantalla. `scrub` sobre el recorrido natural, sin pin.
      gsap.set(bar, { scaleY: 0, transformOrigin: 'top' });
      gsap.to(bar, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top 70%', end: 'bottom 70%', scrub: 0.5 },
      });

      // Entrada escalonada: las tres etapas entran en orden, que es lo único
      // que la animación tiene que comunicar aquí. NO se atenúan las inactivas
      // — en escritorio las tres entran en pantalla a la vez, así que atenuar
      // dos de cada tres solo dejaba texto ilegible sin decir nada (§E-3).
      //
      // El disparo va por IntersectionObserver, nunca por ScrollTrigger: un
      // ScrollTrigger que no refresca deja el contenido oculto para siempre, y
      // eso ya pasó con los marcadores de sección (§F-2).
      gsap.set(steps, { opacity: 0, y: 16 });

      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        gsap.to(steps, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'auphere-expo',
          stagger: 0.12,
          clearProps: 'transform',
        });
        gsap.to(numbers, {
          color: 'var(--color-bangladesh-green)',
          duration: 0.4,
          stagger: 0.12,
          delay: 0.15,
        });
      };

      const first = steps[0];
      if (typeof IntersectionObserver === 'undefined' || !first) {
        play();
        return undefined;
      }
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            play();
            io.disconnect();
          }
        },
        { rootMargin: '0px 0px -10% 0px' },
      );
      io.observe(first);
      const failsafe = window.setTimeout(play, 10000);

      return () => {
        io.disconnect();
        window.clearTimeout(failsafe);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="how"
      className="relative section-y section-edge"
    >
      <SectionMarker number="03" label={t('marker.label')} meta={t('marker.meta')} />
      <Container width="wide">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <h2 className="type-h2 text-balance">
            {t('headline')}
          </h2>
          <p className="type-intro text-[var(--color-ink-muted)] mt-5 max-w-[56ch] text-pretty">
            {t('intro')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1px_1fr] gap-8 lg:gap-12">
          {/* Progress rail (desktop) */}
          <div aria-hidden className="hidden lg:block relative w-px bg-[var(--color-ink-subtle)]">
            <div
              data-step-progress
              className="absolute inset-x-0 top-0 h-full bg-[var(--color-bangladesh-green)]"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>

          <ol className={cn('grid grid-cols-1 gap-10 list-none p-0 m-0', inset ? 'lg:gap-8' : 'lg:grid-cols-3 lg:gap-8')}>
            {STEP_KEYS.map((key, i) => (
              <li key={key} data-step className="flex flex-col gap-4">
                <p
                  data-step-number
                  className="font-mono text-[12px] tracking-[0.18em] text-[var(--color-ink-muted)]"
                >
                  {String(i + 1).padStart(2, '0')} / {String(STEP_KEYS.length).padStart(2, '0')}
                </p>
                <p className="type-meta text-[var(--color-ink-muted)]">
                  {t(`steps.${key}.timing`)}
                </p>
                <h3 className="type-h3 text-balance">
                  {t(`steps.${key}.title`)}
                </h3>
                <p className="text-[14px] leading-relaxed text-[var(--color-ink-muted)] text-pretty">
                  {t(`steps.${key}.body`)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

'use client';
import { useRef, type RefObject } from 'react';
import { useAuphereGSAP } from './gsap';

interface RevealOptions {
  /** Seconds before the reveal starts. */
  delay?: number;
  /** Initial vertical offset in px. */
  y?: number;
  /** `load` plays immediately; `inView` waits for the element (default). */
  mode?: 'load' | 'inView';
}

/**
 * §7.5 — primitiva <Reveal> como hook: entrada estándar A-08
 * (y + opacity, ease auphere-expo, once). Reduced motion: estático.
 *
 * Se dispara con IntersectionObserver, no con ScrollTrigger (auditoría
 * 2026-08-09 §F-2). El motivo no es estilístico:
 *
 *   · Con ScrollTrigger, TODOS los `[NN] SECTION MARKER` de la web se quedaban
 *     a `opacity: 0` de forma permanente. Reproducido recorriendo la home
 *     entera: los seis marcadores seguían invisibles al final del scroll. El
 *     trigger depende de que Lenis y ScrollTrigger estén sincronizados y de un
 *     `refresh()` que no siempre llega (anclas, restauración de scroll,
 *     hidratación tardía).
 *   · IntersectionObserver no depende de nada de eso: el navegador avisa
 *     cuando el elemento entra, y punto.
 *
 * Además hay una red de seguridad: si el observer no existe o nunca dispara,
 * un temporizador revela el contenido igualmente. Ninguna ruta de este código
 * puede dejar texto invisible.
 *
 * Attach the returned ref to the element to reveal.
 */
export function useReveal<T extends HTMLElement>(options: RevealOptions = {}): RefObject<T | null> {
  const ref = useRef<T>(null);
  const { delay = 0, y = 12, mode = 'inView' } = options;

  useAuphereGSAP(
    ({ reduced, gsap }) => {
      const el = ref.current;
      if (!el || reduced) return undefined;

      gsap.set(el, { opacity: 0, y });

      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'auphere-expo',
          delay,
          clearProps: 'transform',
        });
      };

      if (mode === 'load' || typeof IntersectionObserver === 'undefined') {
        play();
        return undefined;
      }

      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            play();
            io.disconnect();
          }
        },
        // Empieza un poco antes de que el borde superior entre, para que el
        // movimiento acompañe al scroll en vez de ir por detrás.
        { rootMargin: '0px 0px -12% 0px' },
      );
      io.observe(el);

      // Red de seguridad: si en 10 s el observer no ha disparado, se muestra
      // igual. Preferimos perder la animación antes que perder el contenido.
      const failsafe = window.setTimeout(play, 10000);

      return () => {
        io.disconnect();
        window.clearTimeout(failsafe);
      };
    },
    { dependencies: [delay, y, mode] },
  );

  return ref;
}

'use client';
import { ReactLenis, type LenisRef } from 'lenis/react';
import { useEffect, useRef, type ReactNode } from 'react';
import { registerAuphereGSAP, gsap, ScrollTrigger } from '@/lib/motion/gsap';

/**
 * Lenis smooth scroll + ScrollTrigger.
 *
 * Lenis conduce su propio RAF (`autoRaf` por defecto) y nosotros solo
 * escuchamos su evento de scroll para actualizar ScrollTrigger.
 *
 * Antes esto usaba el patrón de "un solo reloj": `autoRaf: false` y
 * `gsap.ticker.add(t => lenis.raf(t * 1000))`. Es más elegante y estaba roto:
 * el enganche vivía en un `useEffect` con dependencias `[]` que hacía
 * `if (!lenisRef.current?.lenis) return;` — sin reintento. Cuando el ref no
 * estaba listo en esa primera pasada, el ticker no se enganchaba nunca y
 * **la página dejaba de poder hacer scroll**: Lenis seguía capturando la rueda
 * (`preventDefault`, clase `lenis-scrolling`) pero nada avanzaba la posición.
 * El scroll programático seguía funcionando, así que el fallo no aparecía en
 * pruebas automáticas — solo con rueda o trackpad reales.
 *
 * El coste de dejar que Lenis lleve su RAF es un bucle extra por frame. Barato
 * comparado con una web que no baja.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    registerAuphereGSAP();
    gsap.ticker.lagSmoothing(0);

    // El ref lo puebla ReactLenis en su propio commit; puede no estar listo en
    // la primera pasada de este efecto. Reintentamos en los siguientes frames
    // en lugar de rendirnos, que era justo el fallo anterior.
    let frame = 0;
    let attached: (() => void) | undefined;

    const attach = () => {
      const lenis = lenisRef.current?.lenis;
      if (!lenis) {
        frame = requestAnimationFrame(attach);
        return;
      }
      const update = () => ScrollTrigger.update();
      lenis.on('scroll', update);
      // Las alturas cambian cuando entran las fuentes y las secciones reveladas.
      ScrollTrigger.refresh();
      attached = () => lenis.off('scroll', update);
    };
    attach();

    return () => {
      cancelAnimationFrame(frame);
      attached?.();
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.1,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

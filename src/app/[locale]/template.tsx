'use client';
import { useRef, type ReactNode } from 'react';
import { useAuphereGSAP } from '@/lib/motion/gsap';

/** Module flag: the wipe never plays on the first paint (protects LCP). */
let hasNavigated = false;

/**
 * A-13 — transición de página: wipe vertical bangladesh-green descubriendo
 * el contenido con el wordmark centrado (600 ms out, ease auphere-io).
 * template.tsx se re-monta en cada navegación del App Router, así que el
 * efecto corre exactamente una vez por cambio de ruta.
 * Reduced motion: fade 120 ms. Primer load: nada.
 */
export default function Template({ children }: { children: ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useAuphereGSAP(({ reduced, gsap }) => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (!hasNavigated) {
      hasNavigated = true;
      overlay.style.display = 'none';
      return;
    }
    if (reduced) {
      gsap.fromTo(overlay, { opacity: 1 }, {
        opacity: 0,
        duration: 0.12,
        onComplete: () => {
          overlay.style.display = 'none';
        },
      });
      return;
    }
    const mark = overlay.querySelector('[data-wipe-mark]');
    gsap
      .timeline({
        onComplete: () => {
          overlay.style.display = 'none';
        },
      })
      .fromTo(mark, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.2, ease: 'auphere' }, 0)
      .to(mark, { opacity: 0, duration: 0.15 }, 0.3)
      .to(overlay, { yPercent: -100, duration: 0.6, ease: 'auphere-io' }, 0.35);
  });

  return (
    <>
      <div
        ref={overlayRef}
        aria-hidden
        className="fixed inset-0 z-[90] flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-bangladesh-green)' }}
      >
        <span
          data-wipe-mark
          className="font-display font-bold text-[28px] tracking-[-0.02em]"
          style={{ color: 'var(--color-bone)', opacity: 0 }}
        >
          Auphere
        </span>
      </div>
      {children}
    </>
  );
}

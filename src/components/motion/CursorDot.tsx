'use client';
import { useRef } from 'react';
import { useAuphereGSAP } from '@/lib/motion/gsap';

/**
 * A-16 — cursor editorial: círculo de 12 px con mix-blend-difference que
 * crece a 48 px sobre elementos interactivos. quickTo 0.3 s. SOLO puntero
 * fino (@media pointer:fine). Sin trail, sin partículas. Reduced: apagado.
 */
export function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);

  useAuphereGSAP(
    ({ reduced, gsap }) => {
      const dot = ref.current;
      if (!dot || reduced) return;
      if (!window.matchMedia('(pointer: fine)').matches) return;

      dot.style.display = 'block';
      const toX = gsap.quickTo(dot, 'x', { duration: 0.3, ease: 'auphere' });
      const toY = gsap.quickTo(dot, 'y', { duration: 0.3, ease: 'auphere' });
      const toScale = gsap.quickTo(dot, 'scale', { duration: 0.25, ease: 'auphere' });

      const INTERACTIVE = 'a, button, [role="button"], input, select, textarea, label, summary';
      const onMove = (event: PointerEvent) => {
        toX(event.clientX);
        toY(event.clientY);
        const interactive = (event.target as Element | null)?.closest?.(INTERACTIVE);
        toScale(interactive ? 4 : 1);
      };
      const onLeave = () => gsap.to(dot, { opacity: 0, duration: 0.2 });
      const onEnter = () => gsap.to(dot, { opacity: 1, duration: 0.2 });

      window.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
      document.documentElement.addEventListener('pointerenter', onEnter);
      return () => {
        window.removeEventListener('pointermove', onMove);
        document.documentElement.removeEventListener('pointerleave', onLeave);
        document.documentElement.removeEventListener('pointerenter', onEnter);
      };
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden -translate-x-1/2 -translate-y-1/2"
      style={{
        width: 12,
        height: 12,
        borderRadius: 999,
        backgroundColor: '#fff',
        mixBlendMode: 'difference',
      }}
    />
  );
}

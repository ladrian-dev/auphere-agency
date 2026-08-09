'use client';
import { useRef } from 'react';
import { useAuphereGSAP } from '@/lib/motion/gsap';

/**
 * A-15 — halo verde que respira bajo el CTA final. scale + opacity, 4 s,
 * yoyo, y SOLO mientras está en viewport (ScrollTrigger toggleActions).
 * Reduced motion: sin halo animado (estático tenue).
 */
export function CtaHalo() {
  const ref = useRef<HTMLDivElement>(null);

  useAuphereGSAP(
    ({ reduced, gsap }) => {
      const el = ref.current;
      if (!el || reduced) return;
      gsap.fromTo(
        el,
        { scale: 0.96, opacity: 0.25 },
        {
          scale: 1.04,
          opacity: 0.5,
          duration: 4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', toggleActions: 'play pause resume pause' },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-x-8 -inset-y-6 rounded-[40px] opacity-30"
      style={{
        background: 'radial-gradient(60% 70% at 50% 50%, color-mix(in srgb, var(--color-caribbean-green) 22%, transparent) 0%, transparent 70%)',
      }}
    />
  );
}

'use client';
import { ReactLenis } from 'lenis/react';
import type { ReactNode } from 'react';

/**
 * Lenis smooth scroll provider. Auto-RAF (no manual ticker sync needed since
 * we don't use GSAP). Respects prefers-reduced-motion via Lenis itself.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

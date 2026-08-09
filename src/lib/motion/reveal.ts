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
 * Attach the returned ref to the element to reveal.
 */
export function useReveal<T extends HTMLElement>(options: RevealOptions = {}): RefObject<T | null> {
  const ref = useRef<T>(null);
  const { delay = 0, y = 12, mode = 'inView' } = options;

  useAuphereGSAP(
    ({ reduced, gsap }) => {
      const el = ref.current;
      if (!el || reduced) return;
      gsap.set(el, { opacity: 0, y });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'auphere-expo',
        delay,
        clearProps: 'transform',
        ...(mode === 'inView' ? { scrollTrigger: { trigger: el, start: 'top 88%', once: true } } : {}),
      });
    },
    { dependencies: [delay, y, mode] },
  );

  return ref;
}

'use client';
import type { RefObject } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { Flip } from 'gsap/Flip';
import { Observer } from 'gsap/Observer';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

/**
 * Central GSAP registry — the single point where plugins, brand eases and
 * global defaults are configured. Import from here, never from 'gsap' directly
 * in components, so registration is guaranteed before first use.
 *
 * Brand rules (see vault brand-system §10): no bounce, no overshoot, no
 * playful springs. Animations explain, rank or reward — or they don't ship.
 */

export const EASES = {
  /** Primary easing — UI state, reveals with weight. */
  primary: 'auphere',
  /** Symmetric in-out — loops, marquees, position swaps. */
  inOut: 'auphere-io',
  /** Long-tail expo — text reveals, section entrances. */
  expo: 'auphere-expo',
} as const;

/** Duration scale in seconds, from the brand system. */
export const DURATIONS = {
  instant: 0.08,
  hover: 0.2,
  state: 0.4,
  scroll: 1.0,
  ambient: 2.0,
} as const;

declare global {
  interface Window {
    __auphereGsapRegistered?: boolean;
  }
}

/** Idempotent (HMR-safe) plugin + ease registration. */
export function registerAuphereGSAP(): void {
  if (typeof window === 'undefined' || window.__auphereGsapRegistered) return;
  window.__auphereGsapRegistered = true;

  gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase, Flip, Observer, DrawSVGPlugin, MotionPathPlugin);

  CustomEase.create('auphere', '0.32, 0.72, 0, 1');
  CustomEase.create('auphere-io', '0.65, 0, 0.35, 1');
  CustomEase.create('auphere-expo', '0.22, 1, 0.36, 1');

  gsap.defaults({ ease: 'auphere', duration: 0.7 });
}

interface AuphereGSAPContext {
  /** True when the visitor prefers reduced motion — provide the static variant. */
  reduced: boolean;
  gsap: typeof gsap;
}

interface UseAuphereGSAPOptions {
  scope?: RefObject<HTMLElement | SVGSVGElement | null>;
  dependencies?: unknown[];
}

/**
 * useGSAP with the brand registry and a reduced-motion matchMedia already
 * mounted. The callback runs once per matching media state and is fully
 * reverted on unmount / dependency change (no leaked ScrollTriggers).
 */
export function useAuphereGSAP(
  callback: (ctx: AuphereGSAPContext) => void,
  options: UseAuphereGSAPOptions = {},
): void {
  registerAuphereGSAP();
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduced: '(prefers-reduced-motion: reduce)',
          full: '(prefers-reduced-motion: no-preference)',
        },
        (ctx) => {
          const conditions = ctx.conditions as { reduced: boolean };
          callback({ reduced: conditions.reduced, gsap });
        },
      );
      return () => mm.revert();
    },
    { scope: options.scope, dependencies: options.dependencies },
  );
}

export { gsap, ScrollTrigger, Flip, Observer };

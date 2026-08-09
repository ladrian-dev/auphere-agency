'use client';
import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import { useAuphereGSAP } from '@/lib/motion/gsap';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
}

interface ItemProps {
  children: ReactNode;
  className?: string;
}

/**
 * A-08 — standard section entrance, on GSAP.
 * Spec: y 24px + opacity, 0.7 s, ease auphere-expo, once.
 * One ScrollTrigger per container (never per item); items stagger inside it.
 *
 * Reduced motion: static render — the initial hide is never applied.
 */
export function StaggerGrid({
  children,
  className,
  staggerChildren = 0.12,
  delayChildren = 0.1,
}: ContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useAuphereGSAP(
    ({ reduced, gsap }) => {
      const root = ref.current;
      if (!root || reduced) return;
      // Only direct members of THIS grid — nested grids own their items.
      const items = Array.from(root.querySelectorAll<HTMLElement>('[data-stagger-item]')).filter(
        (el) => el.closest('[data-stagger-grid]') === root,
      );
      if (!items.length) return;

      gsap.set(items, { opacity: 0, y: 24 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'auphere-expo',
        stagger: staggerChildren,
        delay: delayChildren,
        clearProps: 'transform',
        scrollTrigger: { trigger: root, start: 'top 85%', once: true },
      });
    },
    { dependencies: [staggerChildren, delayChildren] },
  );

  return (
    <div ref={ref} data-stagger-grid className={cn(className)}>
      {children}
    </div>
  );
}

export function StaggerItem({ children, className }: ItemProps) {
  return (
    <div data-stagger-item className={className}>
      {children}
    </div>
  );
}

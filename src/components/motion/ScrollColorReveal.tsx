'use client';
import { Fragment, useRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { useAuphereGSAP } from '@/lib/motion/gsap';

interface Props {
  text: string;
  className?: string;
}

/**
 * A-07 — scroll-scrubbed pull-quote reveal, on GSAP.
 * Words go from dim (0.22) to full ink as the paragraph crosses the
 * viewport band. Spec: scrub, start "top 80%", end "top 30%".
 *
 * Reduced motion: text at full ink, no scrub.
 */
export function ScrollColorReveal({ text, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(' ');

  useAuphereGSAP(
    ({ reduced, gsap }) => {
      const root = ref.current;
      if (!root || reduced) return;
      const targets = root.querySelectorAll<HTMLElement>('[data-reveal-word]');
      if (!targets.length) return;

      gsap.set(targets, { opacity: 0.22 });
      gsap.to(targets, {
        opacity: 1,
        ease: 'none',
        stagger: 0.06,
        scrollTrigger: {
          trigger: root,
          start: 'top 80%',
          end: 'top 30%',
          scrub: true,
        },
      });
    },
    { dependencies: [text] },
  );

  return (
    <p ref={ref} className={cn('text-[var(--color-ink)]', className)}>
      {/* Accessible name for screen readers — read once, full text */}
      <span className="sr-only">{text}</span>
      {/* Decorative animated words — hidden from SR */}
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span data-reveal-word>{word}</span>
            {i < words.length - 1 && ' '}
          </Fragment>
        ))}
      </span>
    </p>
  );
}

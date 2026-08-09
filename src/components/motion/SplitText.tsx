'use client';
import { Fragment, useRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { useAuphereGSAP } from '@/lib/motion/gsap';

interface Props {
  text: string;
  /** Base delay before the first word starts (in seconds) */
  delay?: number;
  /** Stagger between words (in seconds) */
  stagger?: number;
  /** Reveal as page loads (default) vs reveal when entering viewport */
  trigger?: 'load' | 'inView';
  className?: string;
  /** Element to render. Default: span (so it can be wrapped in any heading). */
  as?: 'span' | 'div';
}

/**
 * A-01 — word-by-word blur reveal, on GSAP.
 * Spec: y 12px + blur(6px)→0, ease auphere-expo, stagger 0.06 s.
 * On `load` it waits for `document.fonts.ready` so the type never animates
 * mid-FOUT; the tween is created synchronously (paused) so the useGSAP
 * context still owns and reverts it.
 *
 * A11y (axe-clean, WCAG 2.1.1): full text exposed once via sr-only span;
 * animated word spans live under a single aria-hidden container.
 *
 * Reduced motion: words render statically (no initial hide is ever applied).
 */
export function SplitText({
  text,
  delay = 0,
  stagger = 0.06,
  trigger = 'load',
  className,
  as = 'span',
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(' ');

  useAuphereGSAP(
    ({ reduced, gsap }) => {
      const root = ref.current;
      if (!root || reduced) return;
      const targets = root.querySelectorAll<HTMLElement>('[data-split-word]');
      if (!targets.length) return;

      gsap.set(targets, { opacity: 0, y: 12, filter: 'blur(6px)' });
      const tween = gsap.to(targets, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'auphere-expo',
        stagger,
        delay,
        clearProps: 'filter,transform',
        paused: trigger === 'load',
        ...(trigger === 'inView'
          ? { scrollTrigger: { trigger: root, start: 'top 85%', once: true } }
          : {}),
      });

      if (trigger === 'load') {
        document.fonts.ready.then(() => {
          if (tween.isActive() || tween.progress() > 0) return;
          tween.play();
        });
      }
    },
    { dependencies: [text, delay, stagger, trigger] },
  );

  const Tag = as === 'div' ? 'div' : 'span';

  return (
    <Tag ref={ref as never} className={cn('inline-block', className)}>
      {/* Accessible name for screen readers — read once, full text */}
      <span className="sr-only">{text}</span>
      {/* Decorative animated words — hidden from SR. Spaces live OUTSIDE the
          inline-block spans so they don't collapse at inline-block edges. */}
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span data-split-word className="inline-block">
              {word}
            </span>
            {i < words.length - 1 && ' '}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}

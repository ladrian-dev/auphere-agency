'use client';
import { Fragment, useRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { useAuphereGSAP } from '@/lib/motion/gsap';
import { onEnter } from '@/lib/motion/on-enter';

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
 *
 * Timing (auditoría 2026-08-09 §F-1): the reveal used to run 0.9 s per word
 * with a 0.06–0.10 s stagger and a second line delayed a further 0.6 s, so the
 * H1 — which is the LCP element — was still resolving from blur about two
 * seconds in. It now lands in well under a second: shorter duration, tighter
 * stagger, and a stagger budget capped so a long headline never drags.
 *
 * A11y (axe-clean, WCAG 2.1.1): full text exposed once via sr-only span;
 * animated word spans live under a single aria-hidden container.
 *
 * Reduced motion: words render statically (no initial hide is ever applied).
 */
export function SplitText({
  text,
  delay = 0,
  stagger = 0.045,
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

      // Cap the total stagger so a 10-word headline is not slower than a
      // 4-word one. Everything lands within ~0.45 s of the first word.
      const totalStagger = Math.min(stagger * (targets.length - 1), 0.45);
      const perWord = targets.length > 1 ? totalStagger / (targets.length - 1) : 0;

      gsap.set(targets, { opacity: 0, y: 10, filter: 'blur(5px)' });
      const tween = gsap.to(targets, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.55,
        ease: 'auphere-expo',
        stagger: perWord,
        delay,
        clearProps: 'filter,transform,opacity',
        paused: true,
      });

      if (trigger === 'inView') {
        return onEnter(root, () => tween.play());
      }

      if (trigger === 'load') {
        // Wait for fonts so the type never animates mid-FOUT — but never let a
        // slow/failed font load leave the headline invisible. `document.fonts.ready`
        // can hang behind a stalled webfont; the race guarantees a play() either way.
        const play = () => {
          if (tween.isActive() || tween.progress() > 0) return;
          tween.play();
        };
        let done = false;
        const once = () => {
          if (done) return;
          done = true;
          play();
        };
        document.fonts.ready.then(once);
        const timer = window.setTimeout(once, 900);
        return () => window.clearTimeout(timer);
      }
      return undefined;
    },
    { dependencies: [text, delay, stagger, trigger] },
  );

  const Tag = as === 'div' ? 'div' : 'span';

  return (
    <Tag ref={ref as never} className={cn('inline', className)}>
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

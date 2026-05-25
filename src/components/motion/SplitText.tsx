'use client';
import { Fragment } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils/cn';

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
 * Word-by-word blur reveal — Salix's signature pattern, ported to Motion.
 * Each word starts blurred + transparent, animates to clear + visible.
 *
 * A11y pattern (axe-clean, WCAG 2.1.1):
 *   - The full text is exposed to screen readers ONCE via a visually-hidden
 *     <span class="sr-only"> (standards-compliant accessible name).
 *   - The animated word spans are wrapped in a single aria-hidden="true"
 *     container so SR ignores them entirely (no per-word stutter).
 *   - Avoids aria-label on <span> (axe rule `aria-prohibited-attr`).
 *
 * Reduced motion: renders text statically with no animation.
 */
export function SplitText({
  text,
  delay = 0,
  stagger = 0.08,
  trigger = 'load',
  className,
  as = 'span',
}: Props) {
  const reducedMotion = useReducedMotion();
  const Tag = as === 'div' ? motion.div : motion.span;

  if (reducedMotion) {
    const StaticTag = as === 'div' ? 'div' : 'span';
    return <StaticTag className={className}>{text}</StaticTag>;
  }

  const words = text.split(' ');

  const triggerProps =
    trigger === 'load'
      ? { initial: 'hidden', animate: 'visible' }
      : {
          initial: 'hidden',
          whileInView: 'visible',
          viewport: { once: true, margin: '-50px' },
        };

  return (
    <Tag
      className={cn('inline-block', className)}
      {...triggerProps}
      variants={{ hidden: {}, visible: {} }}
    >
      {/* Accessible name for screen readers — read once, full text */}
      <span className="sr-only">{text}</span>
      {/* Decorative animated words — hidden from SR.
          Spaces live OUTSIDE the inline-block motion.spans so they don't
          collapse at the inline-block edges (browsers strip trailing
          whitespace at the boundary of inline-block boxes). */}
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <motion.span
              className="inline-block will-change-[filter,opacity,transform]"
              variants={{
                hidden: { filter: 'blur(20px)', opacity: 0, y: 16 },
                visible: { filter: 'blur(0px)', opacity: 1, y: 0 },
              }}
              transition={{
                duration: 0.85,
                delay: delay + i * stagger,
                ease: [0.32, 0.72, 0, 1],
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && ' '}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}

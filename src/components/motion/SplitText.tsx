'use client';
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
 * A11y: the full text is announced once via aria-label on the wrapper;
 * each word span is aria-hidden so screen readers don't read word-by-word.
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
      aria-label={text}
      className={cn('inline-block', className)}
      {...triggerProps}
      variants={{ hidden: {}, visible: {} }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden
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
          {i < words.length - 1 && ' '}
        </motion.span>
      ))}
    </Tag>
  );
}

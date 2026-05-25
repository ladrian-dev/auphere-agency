'use client';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface Props {
  text: string;
  className?: string;
}

/**
 * Attio-style scroll-driven word color reveal.
 * Each word transitions from dim to full ink as it crosses the
 * configured scroll progress range.
 *
 * Use for editorial pull quotes — the lecture cadence makes the reader
 * actually READ instead of skimming.
 *
 * Reduced motion: shows text fully colored, no animation.
 */
export function ScrollColorReveal({ text, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // Start when the paragraph enters the bottom-15% of viewport, end when it crosses the top-15%
    offset: ['start 0.85', 'start 0.15'],
  });

  const words = text.split(' ');

  if (reducedMotion) {
    return (
      <p ref={ref} className={cn('text-[var(--color-ink)]', className)}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {/* Accessible name for screen readers — read once, full text */}
      <span className="sr-only">{text}</span>
      {/* Decorative animated words — hidden from SR */}
      <span aria-hidden="true">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 0.85) / words.length;
          return (
            <RevealWord key={i} word={word} start={start} end={end} progress={scrollYProgress} />
          );
        })}
      </span>
    </p>
  );
}

function RevealWord({
  word,
  start,
  end,
  progress,
}: {
  word: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
}): ReactNode {
  const opacity = useTransform(progress, [start, end], [0.22, 1]);
  return (
    <>
      <motion.span aria-hidden style={{ opacity }}>
        {word}
      </motion.span>
      {' '}
    </>
  );
}

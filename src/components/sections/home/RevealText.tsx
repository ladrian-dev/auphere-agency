'use client';
import { useRef } from 'react';
import { useAuphereGSAP, ScrollTrigger } from '@/lib/motion/gsap';

interface Props {
  text: string;
  className?: string;
}

/**
 * Frase que se revela palabra a palabra con el scroll (opacidad .22 → 1).
 * Un ScrollTrigger con scrub entre el 85 % y el 35 % del viewport; con
 * `prefers-reduced-motion` se pinta completa desde el principio.
 */
export function RevealText({ text, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(' ');

  useAuphereGSAP(
    ({ reduced, gsap }) => {
      const el = ref.current;
      if (!el) return;
      const spans = el.querySelectorAll<HTMLSpanElement>('[data-word]');
      if (reduced) {
        gsap.set(spans, { opacity: 1 });
        return;
      }
      gsap.set(spans, { opacity: 0.22 });
      const tween = gsap.to(spans, {
        opacity: 1,
        stagger: 0.08,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'top 35%',
          scrub: true,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        void ScrollTrigger;
      };
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden data-word className="inline-block" style={{ opacity: 0.22 }}>
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
}

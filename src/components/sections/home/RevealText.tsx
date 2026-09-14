'use client';
import { useRef } from 'react';
import { useAuphereGSAP } from '@/lib/motion/gsap';

interface Props {
  text: string;
  className?: string;
}

/**
 * Frase que se revela palabra a palabra con el scroll (opacidad .22 → 1).
 * Cada palabra pinta su color con `background-clip: text` y una variable
 * `--o` que un ScrollTrigger con scrub sube de .22 a 1 entre el 85 % y el 35 %
 * del viewport. La frase completa va en un span solo para lectores de
 * pantalla; las palabras visibles quedan ocultas al árbol de accesibilidad.
 * Con `prefers-reduced-motion` se pinta completa desde el principio.
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
        gsap.set(spans, { '--o': 1 });
        return;
      }
      const tween = gsap.to(spans, {
        '--o': 1,
        stagger: 0.08,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 35%', scrub: true },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          data-word
          className="inline-block bg-clip-text text-transparent [background-image:linear-gradient(rgba(241,247,246,var(--o)),rgba(241,247,246,var(--o)))]"
          style={{ '--o': 0.22 } as React.CSSProperties}
        >
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </p>
  );
}

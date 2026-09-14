'use client';
import Image from 'next/image';
import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface Props {
  image: { src: string; alt?: string };
  eyebrow: string;
  line1: string;
  line2: string;
  lead: string;
  /** CTA primario y, opcionalmente, un enlace secundario. */
  primary: ReactNode;
  secondary?: ReactNode;
}

/**
 * Hero cinematográfico de Partners y Enterprise (README §Partners 1): 100svh
 * con imagen de fondo en ken-burns de 26 s alterno, parallax al cursor
 * (±16 / ±10 px) y degradado oscuro por la izquierda y por abajo. El texto va
 * alineado a la izquierda y centrado en vertical; las líneas del H1 entran
 * con `translateY(110%) skewY(2deg)`. Con `prefers-reduced-motion` no hay
 * ken-burns ni parallax.
 */
export function CineHero({ image, eyebrow, line1, line2, lead, primary, secondary }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches || !window.matchMedia('(pointer: fine)').matches) return;
    let raf = 0;
    const onMove = (event: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = section.getBoundingClientRect();
        if (event.clientY < r.top || event.clientY > r.bottom) {
          bg.style.transform = 'none';
          return;
        }
        const x = ((event.clientX - r.left) / r.width - 0.5) * -1;
        const y = ((event.clientY - r.top) / r.height - 0.5) * -1;
        bg.style.transform = `translate3d(${x * 16}px, ${y * 10}px, 0)`;
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden bg-[var(--color-surface)] max-tab:min-h-[88svh]"
    >
      <div
        ref={bgRef}
        aria-hidden
        className="pointer-events-none absolute inset-[-4%] z-0 will-change-transform transition-transform duration-[1100ms] ease-[var(--ease-cine)]"
      >
        <Image
          src={image.src}
          alt={image.alt ?? ''}
          fill
          priority
          sizes="100vw"
          className="object-cover motion-safe:animate-[g-kb_26s_ease-in-out_infinite_alternate]"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(3,34,33,.35), transparent 28%, transparent 62%, rgba(3,34,33,.85)), linear-gradient(90deg, rgba(3,34,33,.6), transparent 55%)',
        }}
      />

      <div
        className={cn(
          'absolute z-[2] flex max-w-[min(100%,760px)] flex-col items-start text-left',
          'left-[max(clamp(24px,8vw,160px),calc((100%-1200px)/2))] right-[clamp(24px,8vw,160px)] top-1/2 -translate-y-1/2',
          'max-tab:left-5 max-tab:right-5 max-tab:top-[56%] max-tab:max-w-none max-tab:items-center max-tab:text-center',
        )}
      >
        <p className="type-eyebrow opacity-0 motion-safe:animate-[g-fade_.5s_var(--ease-cine)_.3s_both] motion-reduce:opacity-100">
          {eyebrow}
        </p>
        <h1 className="type-h1-cine mt-2.5 [text-shadow:0_2px_2px_rgba(0,0,0,.35)]">
          <span className="block overflow-hidden pb-[.06em]">
            <span className="block text-[var(--color-text)] motion-safe:animate-[g-line_.8s_var(--ease-line)_.3s_both] tab:whitespace-nowrap">
              {line1}
            </span>
          </span>
          <span className="block overflow-hidden pb-[.06em]">
            <span className="block text-[var(--color-text-2)] motion-safe:animate-[g-line_.85s_var(--ease-line)_.44s_both] tab:whitespace-nowrap">
              {line2}
            </span>
          </span>
        </h1>
        <p
          className={cn(
            'mt-[clamp(15px,2vh,24px)] max-w-[52ch] text-[clamp(15px,1.7vh,19px)] leading-[1.45] text-[rgba(241,247,246,.84)] [text-shadow:0_1px_3px_rgba(0,0,0,.5)] [text-wrap:pretty]',
            'opacity-0 motion-safe:animate-[g-copy_.62s_var(--ease-cine)_.74s_both] motion-reduce:opacity-100',
            'max-tab:max-w-none',
          )}
        >
          {lead}
        </p>
        <div
          className={cn(
            'mt-[clamp(24px,3.1vh,36px)] flex flex-wrap items-center gap-3.5',
            'opacity-0 motion-safe:animate-[g-action_.56s_var(--ease-cine)_.96s_both] motion-reduce:opacity-100',
            'max-tab:w-full max-tab:flex-col max-tab:items-stretch',
          )}
        >
          {primary}
          {secondary}
        </div>
      </div>
    </section>
  );
}

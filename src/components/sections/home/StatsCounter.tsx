'use client';
import { useEffect, useRef, useState } from 'react';

export interface StatSpec {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
}

const DURATION_MS = 1400;

/**
 * Cuatro cifras con contador (README §Home 4): arrancan al entrar en el
 * viewport (umbral 30 %) y suben durante 1,4 s con ease-out cúbico. Con
 * `prefers-reduced-motion` se muestran ya en su valor final.
 */
export function StatsCounter({ stats, label }: { stats: StatSpec[]; label: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let raf = 0;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      raf = requestAnimationFrame(() => setProgress(1));
      return () => cancelAnimationFrame(raf);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / DURATION_MS);
          setProgress(1 - Math.pow(1 - p, 3));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <ul
      ref={ref}
      aria-label={label}
      className="mt-16 grid grid-cols-2 gap-4 border-t border-[var(--color-line)] pt-10 tab:grid-cols-4 max-tab:mt-12 max-tab:pt-8"
    >
      {stats.map((s) => (
        <li key={s.label} className="text-center">
          <p className="text-[clamp(34px,4vw,52px)] font-semibold leading-none tracking-[-0.025em] [font-variant-numeric:tabular-nums]">
            <span className="sr-only">{`${s.prefix}${s.value}${s.suffix}`}</span>
            <span aria-hidden>
              {s.prefix}
              {Math.round(s.value * progress)}
              {s.suffix}
            </span>
          </p>
          <p className="mt-2 text-[14px] leading-[1.4] text-[rgba(241,247,246,.6)]">{s.label}</p>
        </li>
      ))}
    </ul>
  );
}

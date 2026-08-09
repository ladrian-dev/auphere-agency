'use client';
import { useRef } from 'react';
import { useAuphereGSAP } from '@/lib/motion/gsap';
import { onEnter } from '@/lib/motion/on-enter';
import { track } from '@/lib/analytics';

export interface GuaranteeRowResolved {
  label: string;
  note?: string;
  status: 'live' | 'dated';
  /** For dated rows — the only allowed phrasing (claims.ts publishAs). */
  dateText?: string;
}

interface Props {
  rows: GuaranteeRowResolved[];
  footnote: string;
  todayLabel: string;
  columnGuarantee: string;
  columnStatus: string;
}

/**
 * 02 — La tabla de honestidad (A-12): qué se cumple hoy · qué llega y cuándo.
 * Rows stagger in once (0.05), status chip micro-pops 80 ms after its row.
 * Reads on surface-deep — the data-scale tokens are remapped by the utility.
 */
export function GuaranteeTable({ rows, footnote, todayLabel, columnGuarantee, columnStatus }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useAuphereGSAP(
    ({ reduced, gsap }) => {
      const root = ref.current;
      if (!root || reduced) return undefined;
      const rowEls = root.querySelectorAll<HTMLElement>('[data-guarantee-row]');
      const chips = root.querySelectorAll<HTMLElement>('[data-guarantee-chip]');
      if (!rowEls.length) return undefined;

      gsap.set(rowEls, { opacity: 0, y: 14 });
      gsap.set(chips, { scale: 0.6, opacity: 0 });
      const tl = gsap.timeline({ paused: true });
      tl.to(rowEls, { opacity: 1, y: 0, duration: 0.5, ease: 'auphere-expo', stagger: 0.05, clearProps: 'transform' }).to(
        chips,
        { scale: 1, opacity: 1, duration: 0.08, ease: 'auphere', stagger: 0.05 },
        0.12,
      );
      return onEnter(root, () => {
        track('guarantee_table_view');
        tl.play();
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <div
        role="table"
        aria-label={columnGuarantee}
        className="rounded-2xl border border-[var(--color-bone)]/15 overflow-hidden"
      >
        <div
          role="row"
          className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_260px] gap-4 px-5 md:px-7 py-4 border-b border-[var(--color-bone)]/15 bg-[var(--color-bone)]/[0.03]"
        >
          <span role="columnheader" className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-60">
            {columnGuarantee}
          </span>
          <span role="columnheader" className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-60">
            {columnStatus}
          </span>
        </div>

        {rows.map((row, i) => (
          <div
            key={i}
            role="row"
            data-guarantee-row
            className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_260px] gap-4 px-5 md:px-7 py-4 border-b border-[var(--color-bone)]/10 last:border-b-0 items-start"
          >
            <div role="cell">
              <p className="font-display font-medium text-[15.5px] leading-snug">{row.label}</p>
              {row.note && <p className="text-[12.5px] leading-snug opacity-55 mt-1 max-w-md">{row.note}</p>}
            </div>
            <div role="cell" className="flex items-start gap-2.5">
              <span
                data-guarantee-chip
                aria-hidden
                className="inline-flex shrink-0 items-center justify-center w-6 h-6 rounded-full mt-[-1px]"
                style={{
                  backgroundColor:
                    row.status === 'live'
                      ? 'color-mix(in srgb, var(--color-data-positive) 18%, transparent)'
                      : 'color-mix(in srgb, var(--color-data-pending) 18%, transparent)',
                  color: row.status === 'live' ? 'var(--color-data-positive)' : 'var(--color-data-pending)',
                }}
              >
                {row.status === 'live' ? (
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8.5l3.2 3.2L13 4.5" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" />
                    <path d="M2.5 6.5h11M5.5 2v3M10.5 2v3" />
                  </svg>
                )}
              </span>
              <span
                className="text-[13.5px] leading-snug pt-0.5"
                style={{ color: row.status === 'live' ? 'var(--color-data-positive)' : 'var(--color-data-pending)' }}
              >
                {row.status === 'live' ? todayLabel : row.dateText}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[12px] leading-relaxed opacity-55 mt-4 max-w-2xl">{footnote}</p>
    </div>
  );
}

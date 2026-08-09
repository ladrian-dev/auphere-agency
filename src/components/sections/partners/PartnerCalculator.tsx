'use client';
import { useMemo, useRef, useState } from 'react';
import { useAuphereGSAP, gsap } from '@/lib/motion/gsap';
import { cn } from '@/lib/utils/cn';

/**
 * A-11 — Calculadora de economía de partner.
 *
 * ⏸ CONSTRUIDA PERO NO DESPLEGADA (decisión §6.4): sin tramos cerrados del
 * informe de pricing, una calculadora que devuelve números que luego cambian
 * es peor que no tenerla. Se monta en /partners cuando `tiers` venga del
 * informe (Fase 6) — el claim `pricing-v2` debe estar `live`.
 *
 * Las barras usan gsap.quickTo — la única forma de que un input arrastrable
 * no tartamudee.
 */

export interface CalculatorTier {
  /** Nº de clientes a partir del cual aplica el tramo. */
  fromClients: number;
  /** Coste plataforma por cliente/mes para el partner en este tramo (USD). */
  costPerClient: number;
}

interface Props {
  /** Tramos cerrados del informe de pricing. Sin ellos, no desplegar. */
  tiers: CalculatorTier[];
  /** Cuota mensual de plataforma (0 si exenta para fundadores). */
  platformFee: number;
  labels: {
    clients: string;
    pricePerClient: string;
    monthlyMargin: string;
    annualMargin: string;
    feeCovered: string;
    feeCoveredNever: string;
  };
  onInteract?: (state: { clients: number; price: number; margin: number }) => void;
}

export function PartnerCalculator({ tiers, platformFee, labels, onInteract }: Props) {
  const [clients, setClients] = useState(5);
  const [price, setPrice] = useState(250);
  const barRef = useRef<HTMLDivElement>(null);
  const quickTo = useRef<((value: number) => void) | null>(null);

  const { margin, annual, coveredAt } = useMemo(() => {
    const tier = [...tiers].reverse().find((t) => clients >= t.fromClients) ?? tiers[0];
    const cost = tier ? tier.costPerClient : 0;
    const monthly = clients * (price - cost) - platformFee;
    let covered: number | null = null;
    for (let n = 1; n <= 500; n++) {
      const t = [...tiers].reverse().find((x) => n >= x.fromClients) ?? tiers[0];
      if (n * (price - (t ? t.costPerClient : 0)) >= platformFee) {
        covered = n;
        break;
      }
    }
    return { margin: monthly, annual: monthly * 12, coveredAt: covered };
  }, [clients, price, tiers, platformFee]);

  useAuphereGSAP(({ reduced }) => {
    if (!barRef.current) return;
    if (reduced) {
      quickTo.current = (v) => gsap.set(barRef.current, { scaleX: v });
      return;
    }
    quickTo.current = gsap.quickTo(barRef.current, 'scaleX', { duration: 0.35, ease: 'auphere' }) as unknown as (
      v: number,
    ) => void;
  });

  function update(nextClients: number, nextPrice: number) {
    setClients(nextClients);
    setPrice(nextPrice);
    const tier = [...tiers].reverse().find((t) => nextClients >= t.fromClients) ?? tiers[0];
    const m = nextClients * (nextPrice - (tier ? tier.costPerClient : 0)) - platformFee;
    quickTo.current?.(Math.max(0.02, Math.min(1, m / (500 * nextPrice))));
    onInteract?.({ clients: nextClients, price: nextPrice, margin: m });
  }

  const fmt = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;

  return (
    <div className="rounded-2xl border border-[var(--color-ink-subtle)] p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-6">
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
            {labels.clients}: <strong className="text-[var(--color-ink)]">{clients}</strong>
          </span>
          <input
            type="range"
            min={1}
            max={100}
            value={clients}
            onChange={(e) => update(Number(e.target.value), price)}
            className="w-full mt-3 accent-[var(--color-bangladesh-green)]"
          />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
            {labels.pricePerClient}: <strong className="text-[var(--color-ink)]">{fmt(price)}</strong>
          </span>
          <input
            type="range"
            min={100}
            max={1000}
            step={10}
            value={price}
            onChange={(e) => update(clients, Number(e.target.value))}
            className="w-full mt-3 accent-[var(--color-bangladesh-green)]"
          />
        </label>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">{labels.monthlyMargin}</p>
          <p className={cn('font-display font-bold text-4xl tracking-[-0.03em] mt-1', margin < 0 && 'text-[var(--color-status-danger)]')}>
            {fmt(margin)}
          </p>
          <div className="h-2 rounded-full bg-[var(--color-ink-faint)] mt-3 overflow-hidden">
            <div ref={barRef} className="h-full w-full origin-left rounded-full bg-[var(--color-bangladesh-green)]" style={{ transform: 'scaleX(0.1)' }} />
          </div>
        </div>
        <p className="text-[14px] text-[var(--color-ink-muted)]">
          {labels.annualMargin}: <strong className="text-[var(--color-ink)]">{fmt(annual)}</strong>
        </p>
        <p className="text-[13px] text-[var(--color-ink-muted)]">
          {coveredAt !== null ? `${labels.feeCovered}: ${coveredAt}` : labels.feeCoveredNever}
        </p>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { track } from '@/lib/analytics';

const MIN = 200;
const MAX = 10000;
const STEP = 100;
const DEFAULT = 1800;

/**
 * Slider de consumo (README §Home 6): 200–10.000 conversaciones, barra
 * base/consumo con proporción ilustrativa y leyenda.
 */
export function UsageSlider() {
  const t = useTranslations('home.pricing');
  const locale = useLocale();
  const [conv, setConv] = useState(DEFAULT);
  const [touched, setTouched] = useState(false);

  const usagePct = Math.round(10 + ((conv - MIN) / (MAX - MIN)) * 72);
  const formatted = new Intl.NumberFormat(locale === 'es' ? 'es-ES' : 'en-GB', { useGrouping: 'always' }).format(conv);

  return (
    <div className="text-left">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[15px] text-[rgba(241,247,246,.65)]">{t('usageLabel')}</p>
        <p
          className="text-[clamp(34px,4vw,52px)] font-semibold leading-none tracking-[-0.025em] [font-variant-numeric:tabular-nums] max-tab:text-[32px]"
          aria-live="polite"
        >
          {formatted}
        </p>
      </div>
      <input
        type="range"
        className="slider mt-2"
        min={MIN}
        max={MAX}
        step={STEP}
        value={conv}
        aria-label={t('sliderLabel')}
        aria-valuetext={`${formatted} ${t('sliderLabel').toLowerCase()}`}
        onChange={(e) => {
          setConv(Number(e.target.value));
          if (!touched) {
            setTouched(true);
            track('calc_interact', { widget: 'usage_slider' });
          }
        }}
      />
      <div className="flex justify-between text-[13px] text-[rgba(241,247,246,.5)]">
        <span>{t('min')}</span>
        <span>{t('max')}</span>
      </div>

      <div className="mt-7 flex h-3.5 overflow-hidden rounded-[7px] bg-[var(--color-line)]" aria-hidden>
        <div className="w-[18%] bg-[rgba(241,247,246,.55)]" />
        <div
          className="bg-[var(--color-primary)] transition-[width] duration-400 ease-[var(--ease-out)]"
          style={{ width: `${usagePct}%` }}
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-[var(--color-text-2)]">
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-2.5 rounded-[3px] bg-[rgba(241,247,246,.55)]" />
          {t('base')}
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-2.5 rounded-[3px] bg-[var(--color-primary)]" />
          {t('usage')}
        </span>
      </div>
      <p className="mt-6 text-[14px] leading-[1.5] text-[var(--color-text-3)]">{t('note')}</p>
    </div>
  );
}

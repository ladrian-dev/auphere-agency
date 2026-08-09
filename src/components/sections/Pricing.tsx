'use client';
import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { cn } from '@/lib/utils/cn';

interface Tier {
  id: 'essential' | 'pro' | 'business';
  setupMonthly: number;
  monthlyMonthly: number;
  setupYearly: number;
  monthlyYearly: number; // 10% discount
  recommended: boolean;
}

const TIERS: Tier[] = [
  { id: 'essential', setupMonthly: 850, monthlyMonthly: 120, setupYearly: 850, monthlyYearly: 108, recommended: false },
  { id: 'pro',       setupMonthly: 1490, monthlyMonthly: 249, setupYearly: 1490, monthlyYearly: 224, recommended: true },
  { id: 'business',  setupMonthly: 2990, monthlyMonthly: 390, setupYearly: 2990, monthlyYearly: 351, recommended: false },
];

const FEATURE_KEYS = ['volume', 'channels', 'integrations', 'workflows', 'cycle'] as const;

export function Pricing() {
  const t = useTranslations('pricing');
  const [yearly, setYearly] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <section id="pricing" className="py-20 md:py-28">
      <SectionMarker number="03" label={t('marker.label')} meta={t('marker.meta')} />

      <Container width="wide">
        <div className="max-w-4xl mb-10 md:mb-14">
          <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.03em]">
            {t('headline')}
          </h2>
          <p className="font-display font-medium text-[clamp(1.05rem,1.8vw,1.375rem)] leading-[1.4] text-[var(--color-ink-muted)] mt-5 max-w-2xl">
            {t('intro')}
          </p>
        </div>

        {/* Real switch: track + thumb */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <button
            type="button"
            onClick={() => setYearly(false)}
            className={cn(
              'text-[14px] font-medium tracking-tight transition-colors',
              !yearly ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]',
            )}
          >
            {t('toggle.monthly')}
          </button>

          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            aria-label={t('toggle.ariaLabel')}
            onClick={() => setYearly((v) => !v)}
            className={cn(
              'relative inline-flex h-[28px] w-[52px] shrink-0 items-center rounded-full transition-colors duration-200 ease-out',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-bangladesh-green)]',
              yearly ? 'bg-[var(--color-bangladesh-green)]' : 'bg-[var(--color-ink-subtle)]',
            )}
          >
            <motion.span
              aria-hidden
              className="block h-[22px] w-[22px] rounded-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
              animate={{ x: yearly ? 27 : 3 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 600, damping: 36 }
              }
            />
          </button>

          <button
            type="button"
            onClick={() => setYearly(true)}
            className={cn(
              'text-[14px] font-medium tracking-tight transition-colors',
              yearly ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]',
            )}
          >
            {t('toggle.yearly')}
          </button>

          <span
            className={cn(
              'inline-flex items-center rounded-full px-[10px] py-[4px] text-[10px] font-mono uppercase tracking-[0.15em] transition-opacity',
              yearly
                ? 'bg-[var(--color-caribbean-green)]/15 text-[var(--color-bangladesh-green)] opacity-100'
                : 'opacity-0 pointer-events-none',
            )}
          >
            {t('toggle.savings')}
          </span>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map((tier) => {
            const setup = yearly ? tier.setupYearly : tier.setupMonthly;
            const monthly = yearly ? tier.monthlyYearly : tier.monthlyMonthly;
            const isRecommended = tier.recommended;

            return (
              <div
                key={tier.id}
                className={cn(
                  'relative rounded-2xl bg-[var(--color-bone)] p-[24px] md:p-[32px] flex flex-col gap-[20px] md:gap-[24px]',
                  isRecommended
                    ? 'border-2 border-[var(--color-bangladesh-green)] shadow-[0_30px_60px_-30px_rgb(3_98_76_/_0.25)]'
                    : 'border border-[var(--color-ink-subtle)]',
                )}
              >
                {isRecommended && (
                  <span className="absolute -top-3 left-[20px] inline-flex items-center rounded-full bg-[var(--color-caribbean-green)] text-[var(--color-ink)] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em]">
                    {t('recommended')}
                  </span>
                )}

                <div>
                  <h3 className="font-display font-semibold text-2xl tracking-[-0.02em]">
                    {t(`tiers.${tier.id}.name`)}
                  </h3>
                  <p className="text-sm text-[var(--color-ink-muted)] mt-2">
                    {t(`tiers.${tier.id}.tagline`)}
                  </p>
                </div>

                <div className="border-t border-[var(--color-ink-subtle)] pt-[20px]">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                    {t('setup')}
                  </p>
                  <p className="font-display font-bold text-3xl text-[var(--color-ink)] tracking-[-0.03em] mt-1">
                    {/* Fixed locale — .toLocaleString() without one hydration-mismatches (server "1490" vs client "1,490") */}
                    ${setup.toLocaleString('en-US')}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                    {t('monthly')}
                  </p>
                  <p className="font-display font-bold text-3xl text-[var(--color-ink)] tracking-[-0.03em] mt-1">
                    ${monthly}
                    <span className="text-sm font-medium text-[var(--color-ink-muted)] ml-1">
                      /{t('perMonth')}
                    </span>
                  </p>
                </div>

                <ul className="flex flex-col gap-3 border-t border-[var(--color-ink-subtle)] pt-6">
                  {FEATURE_KEYS.map((featureKey) => (
                    <li
                      key={featureKey}
                      className="flex items-start gap-3 text-[14px] text-[var(--color-ink)]"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-mountain-meadow)] shrink-0" />
                      <span>
                        <span className="font-medium">
                          {t(`features.${featureKey}.label`)}:
                        </span>{' '}
                        <span className="text-[var(--color-ink-muted)]">
                          {t(`tiers.${tier.id}.features.${featureKey}`)}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#book"
                  className={cn(
                    'mt-auto inline-flex items-center justify-center w-full h-12 rounded-xl font-medium text-[15px] tracking-tight transition-[background-color,border-color,color,transform] duration-200 ease-out active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-bangladesh-green)]',
                    isRecommended
                      ? 'bg-[var(--color-ink)] text-[var(--color-bone)] hover:bg-[var(--color-bangladesh-green)]'
                      : 'bg-transparent text-[var(--color-ink)] border border-[var(--color-ink-subtle)] hover:border-[var(--color-ink)] hover:bg-[var(--color-ink-faint)]',
                  )}
                >
                  {t('cta')}
                </a>
              </div>
            );
          })}
        </div>

        {/* Microcopy */}
        <p className="mt-8 text-center text-[13px] text-[var(--color-ink-muted)] max-w-2xl mx-auto">
          {t('microcopy')}
        </p>

        {/* §6.1 [04] — único añadido permitido al bloque de precios congelado */}
        <p className="mt-10 text-center text-[14px] text-[var(--color-ink-muted)]">
          {t('partnersLine.text')}{' '}
          <Link href="/partners" className="font-medium text-[var(--color-bangladesh-green)] hover:underline underline-offset-4">
            {t('partnersLine.cta')}
          </Link>
        </p>
      </Container>
    </section>
  );
}


'use client';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { StaggerGrid, StaggerItem } from '@/components/motion/StaggerGrid';
import type { VerticalSlug } from '@/lib/use-cases/verticals';

interface Props {
  vertical: VerticalSlug;
  outcomeKeys: readonly string[];
  number: string;
}

/**
 * Outcomes · 3 large metric cards over a dark surface (matches WhyAuphere
 * grammar from the home). Each metric is presented as a range, never a
 * guarantee — language is explicit about that in the intro.
 */
export function OutcomeMetrics({ vertical, outcomeKeys, number }: Props) {
  const t = useTranslations(`useCases.${vertical}.outcomes`);
  const tCommon = useTranslations('useCases.common');

  return (
    <section className="py-24 md:py-32 bg-[var(--color-ink)] text-[var(--color-bone)] relative overflow-hidden">
      {/* Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(241,247,246,0.4) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10">
        <SectionMarker number={number} label={t('marker.label')} meta={t('marker.meta')} variant="dark" />

        <Container width="wide">
          <div className="max-w-3xl mb-16 md:mb-20">
            <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.03em] text-[var(--color-bone)]">
              {t('headline')}
            </h2>
            <p className="font-display font-medium text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.5] text-[var(--color-bone)]/70 mt-6">
              {t('intro')}
            </p>
          </div>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {outcomeKeys.map((key) => (
              <StaggerItem
                key={key}
                className="rounded-2xl border border-[var(--color-bone)]/15 bg-[var(--color-bone)]/[0.03] p-6 md:p-7 hover:border-[var(--color-bone)]/30 transition-colors"
              >
                <p className="font-display font-bold text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.04em] text-[var(--color-caribbean-green)]">
                  {t(`items.${key}.value` as Parameters<typeof t>[0])}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-bone)]/60 mt-4">
                  {t(`items.${key}.label` as Parameters<typeof t>[0])}
                </p>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <p className="font-accent italic text-[15px] md:text-[16px] text-[var(--color-bone)]/55 mt-12 max-w-2xl">
            {tCommon('outcomesNote')}
          </p>
        </Container>
      </div>
    </section>
  );
}

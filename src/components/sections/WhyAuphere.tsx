'use client';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { StaggerGrid, StaggerItem } from '@/components/motion/StaggerGrid';
import { useStageInset } from '@/components/motion/narrative/NarrativeSequence';
import { cn } from '@/lib/utils/cn';

const PROMISES = ['production', 'compliance', 'isolation', 'oneTeam'] as const;

export function WhyAuphere() {
  const t = useTranslations('whyAuphere');
  const inset = useStageInset();

  return (
    <section id="why" className="py-20 md:py-28 surface-darker">
      <SectionMarker
        number="04"
        label={t('marker.label')}
        meta={t('marker.meta')}
        variant="dark"
      />

      <Container width="wide">
        <div className="max-w-4xl mb-10 md:mb-14">
          <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.03em] text-[var(--color-bone)]">
            {t('headline')}
          </h2>
          <p className="font-display font-medium text-[clamp(1.05rem,1.8vw,1.375rem)] leading-[1.4] text-[var(--color-bone)]/65 mt-5 max-w-2xl">
            {t('intro')}
          </p>
        </div>

        <StaggerGrid className={cn('grid grid-cols-1 md:grid-cols-2 gap-[20px] md:gap-[24px]', inset && 'xl:grid-cols-1')}>
          {PROMISES.map((key, i) => (
            <StaggerItem
              key={key}
              className="rounded-2xl bg-[var(--color-bone)]/[0.04] border border-[var(--color-bone)]/10 p-[28px] md:p-[36px] hover:border-[var(--color-bone)]/25 transition-colors"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-mountain-meadow)] mb-4">
                {String(i + 1).padStart(2, '0')} / 04
              </p>
              <h3 className="font-display font-semibold text-xl md:text-[24px] tracking-[-0.02em] text-[var(--color-bone)] mb-3 leading-[1.2]">
                {t(`promises.${key}.title`)}
              </h3>
              <p className="text-[14.5px] leading-relaxed text-[var(--color-bone)]/70">
                {t(`promises.${key}.body`)}
              </p>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}

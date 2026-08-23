import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { StaggerGrid, StaggerItem } from '@/components/motion/StaggerGrid';

const STEPS = ['diagnose', 'configure', 'goLive'] as const;

export function HowWeWork() {
  const t = useTranslations('howWeWork');

  return (
    <section id="how" className="section-y">
      <SectionMarker number="01" label={t('marker.label')} meta={t('marker.meta')} />

      <Container width="wide">
        <div className="max-w-4xl mb-12 md:mb-16">
          <h2 className="type-h2 text-[var(--color-ink)]">
            {t('headline')}
          </h2>
          <p className="type-intro text-[var(--color-ink-muted)] mt-5 max-w-2xl">
            {t('intro')}
          </p>
        </div>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-ink-subtle)] rounded-2xl overflow-hidden border border-[var(--color-ink-subtle)]">
          {STEPS.map((stepKey, i) => (
            <StaggerItem
              key={stepKey}
              className="bg-[var(--color-bone)] p-6 md:p-7 flex flex-col"
            >
              <div className="flex items-center justify-between gap-3 mb-5">
                <span className="type-meta text-[var(--color-ink-muted)] whitespace-nowrap">
                  {String(i + 1).padStart(2, '0')} / 03
                </span>
                <span className="type-meta text-[var(--color-bangladesh-green)] whitespace-nowrap">
                  {t(`steps.${stepKey}.timing`)}
                </span>
              </div>

              <h3 className="font-display font-semibold text-xl md:text-2xl tracking-[-0.02em] mb-3 text-[var(--color-ink)]">
                {t(`steps.${stepKey}.title`)}
              </h3>

              <p className="text-[14px] leading-relaxed text-[var(--color-ink-muted)] flex-1">
                {t(`steps.${stepKey}.body`)}
              </p>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}

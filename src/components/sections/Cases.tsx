import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { StaggerGrid, StaggerItem } from '@/components/motion/StaggerGrid';

/**
 * Cases · placeholder section, kept registered for when the first real case
 * lands. No `items` rendered until then — we deliberately don't fake a
 * portfolio we don't have yet.
 */
export function Cases() {
  const t = useTranslations('cases');

  return (
    <section id="cases" className="py-24 md:py-32">
      <SectionMarker number="02" label={t('marker.label')} meta={t('marker.meta')} />

      <Container width="wide">
        <div className="max-w-4xl mb-16 md:mb-24">
          <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.03em]">
            {t('headline')}
          </h2>
          <p className="font-display font-medium text-[clamp(1.125rem,2vw,1.5rem)] leading-[1.35] text-[var(--color-ink-muted)] mt-6 max-w-2xl">
            {t('intro')}
          </p>
        </div>

        <StaggerGrid className="flex flex-col gap-6">
          <StaggerItem className="rounded-2xl border border-dashed border-[var(--color-ink-subtle)] p-8 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
              {t('moreSoon')}
            </p>
          </StaggerItem>
        </StaggerGrid>
      </Container>
    </section>
  );
}

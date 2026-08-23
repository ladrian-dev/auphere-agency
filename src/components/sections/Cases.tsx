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
    <section id="cases" className="section-y">
      <SectionMarker number="02" label={t('marker.label')} meta={t('marker.meta')} />

      <Container width="wide">
        <div className="max-w-4xl mb-16 md:mb-24">
          <h2 className="type-h2">
            {t('headline')}
          </h2>
          <p className="type-intro text-[var(--color-ink-muted)] mt-5 max-w-2xl">
            {t('intro')}
          </p>
        </div>

        <StaggerGrid className="flex flex-col gap-6">
          <StaggerItem className="rounded-2xl border border-dashed border-[var(--color-ink-subtle)] p-8 text-center">
            <p className="type-meta text-[var(--color-ink-muted)]">
              {t('moreSoon')}
            </p>
          </StaggerItem>
        </StaggerGrid>
      </Container>
    </section>
  );
}

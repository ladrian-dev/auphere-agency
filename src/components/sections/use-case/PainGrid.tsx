'use client';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { StaggerGrid, StaggerItem } from '@/components/motion/StaggerGrid';
import type { VerticalSlug } from '@/lib/use-cases/verticals';

interface Props {
  vertical: VerticalSlug;
  painKeys: readonly string[];
  number: string;
}

/**
 * Pain grid · 3-4 large stat cards. Each card has the eye-grabbing stat as
 * the dominant typographic element, then a short title and body. Visual
 * pattern mirrors the WhyAuphere section's editorial card grid.
 */
export function PainGrid({ vertical, painKeys, number }: Props) {
  const t = useTranslations(`useCases.${vertical}.pain`);

  return (
    <section className="section-y bg-[var(--color-ink-faint)]">
      <SectionMarker number={number} label={t('marker.label')} meta={t('marker.meta')} />

      <Container width="wide">
        <div className="max-w-3xl mb-16 md:mb-20">
          <h2 className="type-h2 text-[var(--color-ink)]">
            {t('headline')}
          </h2>
          <p className="type-intro text-[var(--color-ink-muted)] mt-5">
            {t('intro')}
          </p>
        </div>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {painKeys.map((key) => (
            <StaggerItem
              key={key}
              className="group relative rounded-2xl border border-[var(--color-ink-subtle)] bg-[var(--color-bone)] p-6 md:p-7 hover:border-[var(--color-ink-dim)] transition-colors"
            >
              <p
                aria-hidden
                className="font-display font-bold text-[clamp(2.75rem,6vw,4.5rem)] leading-none tracking-[-0.04em] text-[var(--color-bangladesh-green)]"
              >
                {t(`items.${key}.stat` as Parameters<typeof t>[0])}
              </p>
              <h3 className="font-display font-semibold text-lg md:text-xl tracking-[-0.02em] leading-[1.25] mt-4 text-[var(--color-ink)]">
                {t(`items.${key}.title` as Parameters<typeof t>[0])}
              </h3>
              <p className="text-[14px] md:text-[15px] leading-[1.55] text-[var(--color-ink-muted)] mt-2.5">
                {t(`items.${key}.body` as Parameters<typeof t>[0])}
              </p>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}

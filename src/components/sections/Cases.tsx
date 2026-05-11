import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { StaggerGrid, StaggerItem } from '@/components/motion/StaggerGrid';
import { Caption } from '@/components/primitives/Caption';

const CASE_KEYS = ['spaSereno'] as const;

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
          {CASE_KEYS.map((key) => (
            <StaggerItem
              key={key}
              className="rounded-2xl border border-[var(--color-ink-subtle)] bg-[var(--color-bone)] p-8 md:p-12 hover:border-[var(--color-ink-dim)] transition-colors"
            >
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-8 md:gap-12 items-start">
                {/* Hand-drawn portrait placeholder — to commission */}
                <div className="hidden md:flex w-32 h-32 rounded-2xl bg-[var(--color-sand)] items-center justify-center">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)] text-center px-3">
                    {t('portraitPlaceholder')}
                  </span>
                </div>

                <div className="flex flex-col gap-5 max-w-2xl">
                  <Caption>
                    {t(`items.${key}.industry`)} · {t(`items.${key}.year`)} · {t(`items.${key}.tier`)}
                  </Caption>

                  <h3 className="font-display font-semibold text-2xl md:text-3xl tracking-[-0.02em] leading-[1.2]">
                    {t(`items.${key}.title`)}
                  </h3>

                  <blockquote className="text-[17px] leading-relaxed text-[var(--color-ink-muted)] border-l-2 border-[var(--color-mountain-meadow)] pl-5 italic font-accent">
                    &ldquo;{t(`items.${key}.quote`)}&rdquo;
                  </blockquote>

                  <p className="text-sm text-[var(--color-ink)]">
                    <span className="font-semibold">{t(`items.${key}.author.name`)}</span>{' '}
                    <span className="text-[var(--color-ink-muted)]">— {t(`items.${key}.author.role`)}</span>
                  </p>
                </div>

                <div className="md:text-right md:min-w-[140px]">
                  <p className="font-display font-bold text-5xl md:text-6xl text-[var(--color-bangladesh-green)] tracking-[-0.04em] leading-none">
                    {t(`items.${key}.metric.value`)}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)] mt-3">
                    {t(`items.${key}.metric.label`)}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}

          {/* Placeholder for upcoming cases */}
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

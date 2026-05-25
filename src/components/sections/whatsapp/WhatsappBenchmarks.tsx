import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';

interface Props {
  number: string;
  locale: 'en' | 'es';
}

const ITEM_KEYS = ['responseTime', 'leadQualified', 'bookingRate', 'humanLoad'] as const;

/**
 * Four benchmark numbers with bracketed value, label and a cited source for
 * each. Designed to be AEO-citable: every figure has a sector data anchor.
 */
export async function WhatsappBenchmarks({ number, locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'whatsapp.benchmarks' });

  return (
    <section className="py-24 md:py-32 border-t border-[var(--color-ink-subtle)]">
      <SectionMarker number={number} label={t('marker.label')} meta={t('marker.meta')} />

      <Container width="wide">
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.03em]">
            {t('headline')}
          </h2>
          <p className="font-display font-medium text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.5] text-[var(--color-ink-muted)] mt-6">
            {t('intro')}
          </p>
        </div>

        <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ITEM_KEYS.map((key) => (
            <div
              key={key}
              className="rounded-2xl border border-[var(--color-ink-subtle)] bg-[var(--color-bone)] p-6 flex flex-col gap-3"
            >
              <dt className="font-display font-bold text-[28px] md:text-[32px] leading-[1.05] tracking-[-0.02em] text-[var(--color-bangladesh-green)]">
                {t(`items.${key}.value`)}
              </dt>
              <dd className="text-[14px] leading-[1.5] text-[var(--color-ink)] font-medium">
                {t(`items.${key}.label`)}
              </dd>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-ink-muted)] mt-auto pt-2">
                {t(`items.${key}.source`)}
              </p>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

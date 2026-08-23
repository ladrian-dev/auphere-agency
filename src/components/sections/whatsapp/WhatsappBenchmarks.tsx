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
    <section className="section-y section-edge">
      <SectionMarker number={number} label={t('marker.label')} meta={t('marker.meta')} />

      <Container width="wide">
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="type-h2">
            {t('headline')}
          </h2>
          <p className="type-intro text-[var(--color-ink-muted)] mt-5">
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
              <p className="type-meta text-[var(--color-ink-muted)] mt-auto pt-2">
                {t(`items.${key}.source`)}
              </p>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

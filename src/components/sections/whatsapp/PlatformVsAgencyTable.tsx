import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';

interface Props {
  number: string;
  locale: 'en' | 'es';
}

type ColumnKey = 'platform' | 'agency' | 'auphere';
type RowKey = 'fit' | 'ops' | 'edge' | 'data' | 'exit';

const COLUMN_KEYS: readonly ColumnKey[] = ['platform', 'agency', 'auphere'] as const;
const ROW_KEYS: readonly RowKey[] = ['fit', 'ops', 'edge', 'data', 'exit'] as const;

const ROW_LABELS: Record<RowKey, { en: string; es: string }> = {
  fit: { en: 'Fit to your operation', es: 'Encaje con tu operación' },
  ops: { en: 'Who runs it', es: 'Quién lo opera' },
  edge: { en: 'Edge cases', es: 'Casos raros' },
  data: { en: 'Data residency', es: 'Residencia de datos' },
  exit: { en: 'Exit terms', es: 'Salida' },
};

/**
 * Editorial 3-column comparison: SaaS platform vs traditional agency vs Auphere.
 * Renders as a single table on desktop and as stacked cards on mobile.
 */
export async function PlatformVsAgencyTable({ number, locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'whatsapp.comparison' });

  // Pre-resolve every cell so the rendering loop stays type-safe.
  const cells = COLUMN_KEYS.reduce(
    (acc, col) => {
      acc[col] = {
        title: t(`columns.${col}.title` as Parameters<typeof t>[0]),
        rows: ROW_KEYS.reduce(
          (rowAcc, row) => {
            rowAcc[row] = t(`columns.${col}.rows.${row}` as Parameters<typeof t>[0]);
            return rowAcc;
          },
          {} as Record<RowKey, string>,
        ),
      };
      return acc;
    },
    {} as Record<ColumnKey, { title: string; rows: Record<RowKey, string> }>,
  );

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

        {/* Desktop table */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-[var(--color-ink-subtle)] bg-[var(--color-bone)]">
          <div className="grid grid-cols-[1fr_1.4fr_1.4fr_1.6fr]">
            {/* Header row */}
            <div className="border-b border-[var(--color-ink-subtle)] p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                / {locale === 'es' ? 'Punto de comparación' : 'Compared on'}
              </p>
            </div>
            {COLUMN_KEYS.map((col) => (
              <div
                key={col}
                className={`border-b border-[var(--color-ink-subtle)] p-5 ${
                  col === 'auphere'
                    ? 'bg-[var(--color-bangladesh-green)] text-[var(--color-bone)]'
                    : ''
                }`}
              >
                <h3 className="font-display font-semibold text-[15px] md:text-[16px] leading-[1.3] tracking-[-0.01em]">
                  {cells[col].title}
                </h3>
              </div>
            ))}

            {/* Rows */}
            {ROW_KEYS.map((row) => (
              <div key={row} className="contents">
                <div className="border-t border-[var(--color-ink-subtle)] p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                    {ROW_LABELS[row][locale]}
                  </p>
                </div>
                {COLUMN_KEYS.map((col) => (
                  <div
                    key={col}
                    className={`border-t border-[var(--color-ink-subtle)] p-5 ${
                      col === 'auphere'
                        ? 'bg-[var(--color-bangladesh-green)] text-[var(--color-bone)]'
                        : ''
                    }`}
                  >
                    <p
                      className={`text-[14px] md:text-[15px] leading-[1.5] ${
                        col === 'auphere' ? '' : 'text-[var(--color-ink)]'
                      }`}
                    >
                      {cells[col].rows[row]}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile stacked cards */}
        <div className="md:hidden space-y-6">
          {COLUMN_KEYS.map((col) => (
            <div
              key={col}
              className={`rounded-2xl border p-5 ${
                col === 'auphere'
                  ? 'bg-[var(--color-bangladesh-green)] text-[var(--color-bone)] border-[var(--color-bangladesh-green)]'
                  : 'border-[var(--color-ink-subtle)] bg-[var(--color-bone)]'
              }`}
            >
              <h3 className="font-display font-semibold text-[16px] leading-[1.3] tracking-[-0.01em] mb-4">
                {cells[col].title}
              </h3>
              <dl className="space-y-3">
                {ROW_KEYS.map((row) => (
                  <div key={row}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-60">
                      {ROW_LABELS[row][locale]}
                    </dt>
                    <dd className="text-[14px] leading-[1.5] mt-1">
                      {cells[col].rows[row]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

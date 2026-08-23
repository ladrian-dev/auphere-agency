import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';

interface Props {
  number: string;
  locale: 'en' | 'es';
}

const USE_CASE_KEYS = [
  'booking',
  'leadQualification',
  'tracking',
  'followUp',
  'reminders',
] as const;

/**
 * Five WhatsApp use cases the agent ships with. Each one shows a title, a body
 * paragraph and a one-line example turn rendered in monospace, mirroring how
 * the agent would actually answer.
 */
export async function WhatsappUseCasesList({ number, locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'whatsapp.useCases' });

  return (
    <section className="section-y section-edge bg-[var(--color-bone)]">
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

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-ink-subtle)] rounded-2xl overflow-hidden border border-[var(--color-ink-subtle)]">
          {USE_CASE_KEYS.map((key, i) => (
            <li
              key={key}
              className="bg-[var(--color-bone)] p-6 md:p-8 flex flex-col gap-4"
            >
              <p className="type-meta text-[var(--color-ink-muted)]">
                {String(i + 1).padStart(2, '0')} / {locale === 'es' ? 'Caso' : 'Use case'}
              </p>
              <h3 className="type-h4 text-[var(--color-ink)]">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-[15px] leading-[1.6] text-[var(--color-ink-muted)]">
                {t(`items.${key}.body`)}
              </p>
              <div className="mt-auto pt-3 border-t border-[var(--color-ink-subtle)]">
                <p className="font-mono text-[12px] leading-[1.5] text-[var(--color-ink)]">
                  {t(`items.${key}.exampleTurn`)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

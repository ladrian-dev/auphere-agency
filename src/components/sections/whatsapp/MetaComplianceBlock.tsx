import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';

interface Props {
  number: string;
  locale: 'en' | 'es';
}

const BLOCK_KEYS = ['killed', 'allowed', 'auphere'] as const;

/**
 * Dedicated block on Meta's 2026 WhatsApp Business API policy change.
 * Three-card structure (prohibited / allowed / how Auphere ships it) plus
 * a "last reviewed" footnote. Designed to be the citable AEO piece of the page.
 */
export async function MetaComplianceBlock({ number, locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'whatsapp.compliance' });

  return (
    <section className="py-24 md:py-32 border-t border-[var(--color-ink-subtle)] bg-[var(--color-ink)] text-[var(--color-bone)]">
      <SectionMarker number={number} label={t('marker.label')} meta={t('marker.meta')} variant="dark" />

      <Container width="wide">
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.03em] text-[var(--color-bone)]">
            {t('headline')}
          </h2>
          <p className="font-display font-medium text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.5] text-[var(--color-bone)]/65 mt-6">
            {t('intro')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOCK_KEYS.map((key) => (
            <article
              key={key}
              className="rounded-2xl border border-[var(--color-bone)]/15 bg-[var(--color-ink)] p-6 md:p-7 flex flex-col gap-4"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-caribbean-green)]">
                {key === 'killed' && (locale === 'es' ? '— Prohibido' : '— Prohibited')}
                {key === 'allowed' && (locale === 'es' ? '+ Permitido' : '+ Allowed')}
                {key === 'auphere' && (locale === 'es' ? '· Auphere' : '· Auphere')}
              </p>
              <h3 className="font-display font-semibold text-[18px] md:text-[20px] leading-[1.3] tracking-[-0.01em] text-[var(--color-bone)]">
                {t(`blocks.${key}.title`)}
              </h3>
              <p className="text-[14.5px] leading-[1.6] text-[var(--color-bone)]/75">
                {t(`blocks.${key}.body`)}
              </p>
            </article>
          ))}
        </div>

        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-bone)]/45 mt-10">
          {t('footnote')}
        </p>
      </Container>
    </section>
  );
}

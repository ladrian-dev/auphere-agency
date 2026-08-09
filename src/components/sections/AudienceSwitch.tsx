import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';

const TRACK_KEYS = ['hire', 'resell', 'embed'] as const;

/**
 * §6.1 bloque 03 — la banda de tres vías con VERBOS (Contrátalo · Revéndelo ·
 * Intégralo). Cards iguales, sin jerarquía visual: el visitante se
 * auto-clasifica en menos de 8 segundos. Es el bloque que decide si esta web
 * vende a cuatro públicos o a uno.
 */
export function AudienceSwitch() {
  const t = useTranslations('threeWays');

  return (
    <section className="py-20 md:py-24 border-t border-[var(--color-ink-subtle)]">
      <SectionMarker number="03" label={t('marker.label')} meta={t('marker.meta')} />
      <Container width="wide">
        <h2 className="sr-only">{t('headline')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-ink-subtle)] rounded-2xl overflow-hidden border border-[var(--color-ink-subtle)]">
          {TRACK_KEYS.map((key) => (
            <Link
              key={key}
              href={t(`tracks.${key}.href`)}
              className="group bg-[var(--color-bone)] p-7 md:p-8 flex flex-col gap-3 hover:bg-[var(--color-ink-faint)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-bangladesh-green)]"
            >
              <h3 className="font-display font-bold text-[26px] md:text-[30px] leading-[1.05] tracking-[-0.02em]">
                {t(`tracks.${key}.verb`)}
              </h3>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-bangladesh-green)]">
                {t(`tracks.${key}.who`)}
              </p>
              <p className="text-[14.5px] leading-relaxed text-[var(--color-ink-muted)] flex-1">
                {t(`tracks.${key}.body`)}
              </p>
              <span className="font-medium text-[14.5px] text-[var(--color-bangladesh-green)] group-hover:underline underline-offset-4">
                {t(`tracks.${key}.cta`)} →
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

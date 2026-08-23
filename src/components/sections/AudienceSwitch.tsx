'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { useStageInset } from '@/components/motion/narrative/NarrativeSequence';
import { cn } from '@/lib/utils/cn';

const TRACK_KEYS = ['hire', 'resell', 'embed'] as const;

/**
 * §6.1 bloque [01] — la banda de tres vías con VERBOS (Contrátalo · Revéndelo ·
 * Intégralo). Cards iguales, sin jerarquía visual: el visitante se
 * auto-clasifica. Es el bloque que decide si esta web vende a cuatro públicos
 * o a uno.
 *
 * Dos correcciones de la auditoría 2026-08-09:
 *  · §D-2 — el H2 estaba en `sr-only`. La mejor frase de posicionamiento del
 *    sitio era invisible y la sección se leía como un hueco de 80 px seguido de
 *    tres tarjetas sin contexto. Ahora es visible, con su intro.
 *  · §D-3 — el comprador enterprise no tenía carril. Va debajo de la rejilla,
 *    sin romper el paralelismo de los tres verbos.
 */
export function AudienceSwitch() {
  const t = useTranslations('threeWays');
  const inset = useStageInset();

  return (
    <section className="section-y section-edge">
      <SectionMarker number="01" label={t('marker.label')} meta={t('marker.meta')} />
      <Container width="wide">
        <div className="max-w-3xl mb-10 md:mb-12">
          <h2 className="type-h2 text-balance">
            {t('headline')}
          </h2>
          <p className="type-intro text-[var(--color-ink-muted)] mt-5 max-w-[52ch] text-pretty">
            {t('intro')}
          </p>
        </div>

        <div
          className={cn(
            'grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-ink-subtle)] rounded-2xl overflow-hidden border border-[var(--color-ink-subtle)]',
            inset && 'xl:grid-cols-1',
          )}
        >
          {TRACK_KEYS.map((key) => (
            <Link
              key={key}
              href={t(`tracks.${key}.href`)}
              className="group bg-[var(--color-bone)] p-6 md:p-8 flex flex-col gap-3 hover:bg-[var(--color-ink-faint)] transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-bangladesh-green)]"
            >
              <h3 className="type-h3">
                {t(`tracks.${key}.verb`)}
              </h3>
              <p className="type-meta text-[var(--color-bangladesh-green)]">
                {t(`tracks.${key}.who`)}
              </p>
              <p className="text-[14px] leading-relaxed text-[var(--color-ink-muted)] flex-1 text-pretty">
                {t(`tracks.${key}.body`)}
              </p>
              <span className="font-medium text-[14px] text-[var(--color-bangladesh-green)] group-hover:underline underline-offset-4">
                {t(`tracks.${key}.cta`)} <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>

        {/* Cuarto público: compra por comité. No es un verbo más — es otra
            conversación, así que va como línea, no como cuarta tarjeta. */}
        <p className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[14px] text-[var(--color-ink-muted)]">
          <span>{t('enterpriseLine')}</span>
          <Link
            href="/enterprise"
            className="font-medium text-[var(--color-bangladesh-green)] hover:underline underline-offset-4"
          >
            {t('enterpriseCta')} <span aria-hidden>→</span>
          </Link>
        </p>
      </Container>
    </section>
  );
}

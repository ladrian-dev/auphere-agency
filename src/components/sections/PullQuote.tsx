import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { ScrollColorReveal } from '@/components/motion/ScrollColorReveal';

/**
 * Pull quote editorial — the Auphere thesis distilled in 3 lines.
 * Background: subtle dot grid (Attio pattern).
 * Animation: text fills from gray to ink as user scrolls through the section.
 */
export function PullQuote() {
  const t = useTranslations('pullQuote');

  return (
    <section className="dot-grid section-y flex items-center">
      <Container width="default" className="text-center">
        <ScrollColorReveal
          text={t('text')}
          className="font-display font-semibold text-[clamp(1.5rem,3.6vw,2.75rem)] leading-[1.35] tracking-[-0.02em] text-[var(--color-ink)]"
        />
        <p className="mt-12 type-meta text-[var(--color-ink-muted)]">
          — {t('attribution')}
        </p>
      </Container>
    </section>
  );
}

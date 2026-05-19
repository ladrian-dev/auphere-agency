'use client';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { VerticalMark } from './VerticalMark';
import { cn } from '@/lib/utils/cn';
import type { VerticalSlug } from '@/lib/use-cases/verticals';

interface Props {
  vertical: VerticalSlug;
}

/**
 * Vertical-specific final CTA · dark green surface with the vertical mark
 * as a faded backdrop on the right. Reuses the home's #book anchor so the
 * same Cal.com embed handles the conversion.
 */
export function VerticalFinalCta({ vertical }: Props) {
  const t = useTranslations(`useCases.${vertical}.finalCta`);

  return (
    <section
      id="book"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: 'var(--color-bangladesh-green)' }}
    >
      {/* Soft mark backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-12%] top-1/2 -translate-y-1/2 hidden md:block text-[var(--color-bone)]/12"
      >
        <VerticalMark vertical={vertical} size={520} static />
      </div>

      <Container width="wide" className="relative z-10">
        <div className="max-w-2xl">
          <h2 className="font-display font-bold text-[clamp(2rem,5vw,4rem)] leading-[1.02] tracking-[-0.03em] text-[var(--color-bone)]">
            {t('headline')}
          </h2>
          <p className="font-display font-medium text-[clamp(1rem,1.8vw,1.375rem)] leading-[1.45] text-[var(--color-bone)]/75 mt-6 max-w-xl">
            {t('subheadline')}
          </p>

          <div className="mt-10">
            <a
              href="/#book"
              className={cn(
                'inline-flex items-center justify-center gap-2 h-[54px] px-[28px]',
                'rounded-full font-medium text-[15px] tracking-tight whitespace-nowrap',
                'bg-[var(--color-bone)] text-[var(--color-ink)]',
                'hover:bg-[var(--color-caribbean-green)]',
                'active:scale-[0.98] transition-[background-color,transform] duration-200 ease-out',
                'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-caribbean-green)]',
              )}
            >
              {t('ctaLabel')}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

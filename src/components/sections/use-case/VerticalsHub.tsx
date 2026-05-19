'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/primitives/Container';
import { StaggerGrid, StaggerItem } from '@/components/motion/StaggerGrid';
import { VerticalMark } from './VerticalMark';
import { VERTICAL_SLUGS, type VerticalSlug } from '@/lib/use-cases/verticals';
import { cn } from '@/lib/utils/cn';

/**
 * Hub grid · one large card per vertical, linking into its dedicated page.
 * Each card pairs the editorial mark with the kicker + summary + a hero
 * metric (the most quotable number from that vertical's research).
 */
export function VerticalsHub() {
  return (
    <Container width="wide" className="pb-24 md:pb-32">
      <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {VERTICAL_SLUGS.map((slug) => (
          <StaggerItem key={slug}>
            <VerticalCard slug={slug} />
          </StaggerItem>
        ))}
      </StaggerGrid>

      <SoonStrip />
    </Container>
  );
}

function VerticalCard({ slug }: { slug: VerticalSlug }) {
  const t = useTranslations(`useCases.hub.list.${slug}`);

  return (
    <Link
      href={`/use-cases/${slug}`}
      className={cn(
        'group relative flex flex-col h-full rounded-2xl border border-[var(--color-ink-subtle)]',
        'bg-[var(--color-bone)] p-6 md:p-7 overflow-hidden',
        'hover:border-[var(--color-ink-dim)] hover:-translate-y-1 transition-all duration-500 ease-out',
      )}
    >
      {/* Mark as decorative backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-22%] top-[-14%] text-[var(--color-bangladesh-green)]/8 group-hover:text-[var(--color-bangladesh-green)]/15 transition-colors duration-500"
      >
        <VerticalMark vertical={slug} size={240} static />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
          {t('kicker')}
        </p>

        <h2 className="font-display font-semibold text-xl md:text-2xl tracking-[-0.02em] leading-[1.15] mt-4 text-[var(--color-ink)]">
          {t('title')}
        </h2>

        <p className="text-[14px] md:text-[15px] leading-[1.55] text-[var(--color-ink-muted)] mt-3">
          {t('summary')}
        </p>

        <div className="mt-auto pt-6 flex items-end justify-between gap-3">
          <div>
            <p className="font-display font-bold text-[clamp(1.75rem,3vw,2.5rem)] leading-none tracking-[-0.04em] text-[var(--color-bangladesh-green)]">
              {t('stat')}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-ink-muted)] mt-2 max-w-[160px]">
              {t('statLabel')}
            </p>
          </div>

          <span
            aria-hidden
            className="shrink-0 inline-flex items-center justify-center w-[36px] h-[36px] rounded-full border border-[var(--color-ink-subtle)] text-[var(--color-ink)] group-hover:border-[var(--color-bangladesh-green)] group-hover:bg-[var(--color-bangladesh-green)] group-hover:text-[var(--color-bone)] transition-all duration-300 ease-out"
          >
            <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

function SoonStrip() {
  const t = useTranslations('useCases.hub.bespoke');

  return (
    <div className="mt-24 md:mt-32 rounded-2xl border border-dashed border-[var(--color-ink-subtle)] p-8 md:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-12 items-center">
        <div>
          <h3 className="font-display font-semibold text-xl md:text-2xl tracking-[-0.02em] text-[var(--color-ink)]">
            {t('title')}
          </h3>
          <p className="text-[15px] leading-[1.6] text-[var(--color-ink-muted)] mt-3 max-w-2xl">
            {t('intro')}
          </p>
        </div>
        <div className="flex lg:justify-end">
          <a
            href="/#book"
            className="inline-flex items-center justify-center h-[48px] px-[24px] rounded-full font-medium text-[14px] tracking-tight whitespace-nowrap bg-[var(--color-ink)] text-[var(--color-bone)] hover:bg-[var(--color-bangladesh-green)] transition-colors active:scale-[0.98]"
          >
            {t('ctaLabel')}
          </a>
        </div>
      </div>
    </div>
  );
}

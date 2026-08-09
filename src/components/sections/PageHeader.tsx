'use client';
import { Container } from '@/components/primitives/Container';
import { useReveal } from '@/lib/motion/reveal';

interface Props {
  eyebrow: string;
  meta: string;
  title: string;
  intro?: string;
}

/**
 * Editorial page header used by inner pages (About / Privacy / Terms / Trust).
 * Mirrors the SectionMarker grammar from the landing — [meta] LABEL / META —
 * but renders as the H1 of the page rather than a section divider.
 */
export function PageHeader({ eyebrow, meta, title, intro }: Props) {
  const barRef = useReveal<HTMLDivElement>({ mode: 'load' });
  const titleRef = useReveal<HTMLHeadingElement>({ mode: 'load', delay: 0.05, y: 14 });
  const introRef = useReveal<HTMLParagraphElement>({ mode: 'load', delay: 0.12, y: 14 });

  return (
    <Container width="wide" className="pt-32 md:pt-40 pb-12 md:pb-16">
      <div
        ref={barRef}
        className="flex items-baseline justify-between gap-4 border-b border-[var(--color-ink-subtle)] pb-4 mb-10 md:mb-14"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.18em]">
          <span className="text-[var(--color-ink-muted)]">{eyebrow}</span>
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
          / {meta}
        </p>
      </div>

      <h1
        ref={titleRef}
        className="font-display text-[40px] md:text-[64px] leading-[1.05] tracking-[-0.02em] text-[var(--color-ink)] max-w-4xl"
      >
        {title}
      </h1>

      {intro ? (
        <p
          ref={introRef}
          className="font-display text-[20px] md:text-[24px] leading-[1.35] text-[var(--color-ink-muted)] mt-6 max-w-3xl"
        >
          {intro}
        </p>
      ) : null}
    </Container>
  );
}

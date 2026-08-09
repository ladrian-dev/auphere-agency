"use client";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { SplitText } from "@/components/motion/SplitText";
import { AnimatedMark } from "@/components/motion/AnimatedMark";
import { cn } from "@/lib/utils/cn";

interface CTA {
  label: string;
  href?: string;
}

interface Props {
  /** Top eyebrow chip. */
  eyebrow: string;
  /** Optional meta line under the eyebrow (e.g. "Voice + WhatsApp · live in 3–4 weeks"). */
  meta?: string;
  /** Optional italic kicker above the headline (e.g. audience descriptor). */
  kicker?: string;
  /**
   * Headline — string for a single-line H1, or a tuple of two strings for the
   * home-style stacked two-line headline. Each line is animated by SplitText.
   */
  headline: string | readonly [string, string];
  subheadline: string;
  ctaPrimary: CTA;
  /** When present, renders a secondary outline CTA next to the primary. */
  ctaSecondary?: CTA;
  /** Small mono microcopy under the CTA row. */
  ctaMicrocopy?: string;
  /** Mono trust line under the microcopy (compliance badges row). */
  trustLine?: string;
  /** Right-side visual. Defaults to the AnimatedMark; the home passes the Orchestrator. */
  visual?: ReactNode;
  /** Override the default top padding. */
  className?: string;
}

/**
 * Shared marketing hero — dark gradient surface with the animated Auphere
 * mark on the right (AnimatedMark with the same config used on the home),
 * a stacked copy block on the left and one-or-two CTAs.
 *
 * Used by the home Hero and every /use-cases/[vertical] page. The differences
 * between them are pure copy — passed through props.
 */
export function MarketingHero({
  eyebrow,
  meta,
  kicker,
  headline,
  subheadline,
  ctaPrimary,
  ctaSecondary,
  ctaMicrocopy,
  trustLine,
  visual,
}: Props) {
  return (
    <section
      className="relative overflow-hidden pt-32 md:pt-40 pb-24 md:pb-32 min-h-[100svh]"
      style={{
        background:
          "radial-gradient(120% 90% at 100% 50%, var(--color-bangladesh-green) 0%, var(--color-pine) 55%, var(--color-ink) 100%)",
      }}
    >
      {/* Dot grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(241,247,246,0.35) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Right-side visual — AnimatedMark by default, Orchestrator on the home */}
      {visual ?? (
        <AnimatedMark
          immediate
          traceDurationSeconds={2.6}
          fillRevealSeconds={0.9}
          loopShimmer
          shimmerIntervalSeconds={11}
          className="pointer-events-none absolute right-[-14%] top-1/2 -translate-y-1/2 w-[68%] max-w-[900px] hidden md:block"
        />
      )}

      <Container width="wide" className="relative z-10">
        <div className="max-w-2xl">
          <Eyebrow variant="dark">{eyebrow}</Eyebrow>

          {meta && (
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-bone)]/50 mt-4">
              / {meta}
            </p>
          )}

          {kicker && (
            <p className="font-accent italic text-[15px] md:text-[16px] text-[var(--color-bone)]/70 mt-6">
              {kicker}
            </p>
          )}

          <h1
            className={cn(
              "font-display font-bold leading-[1.02] tracking-[-0.04em] text-[var(--color-bone)]",
              "text-[clamp(2.25rem,5vw,4.25rem)]",
              kicker ? "mt-3" : "mt-5",
            )}
          >
            {typeof headline === "string" ? (
              <SplitText text={headline} delay={0.15} stagger={0.05} />
            ) : (
              <>
                <SplitText text={headline[0]} delay={0.2} />
                <br />
                <SplitText text={headline[1]} delay={0.6} stagger={0.1} />
              </>
            )}
          </h1>

          <p className="font-display font-medium text-[clamp(1.05rem,1.8vw,1.375rem)] leading-[1.4] tracking-[-0.01em] text-[var(--color-bone)]/70 mt-5 max-w-xl">
            {subheadline}
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <CtaLink
              href={ctaPrimary.href ?? "#book"}
              className={cn(
                "inline-flex items-center justify-center gap-2 h-[52px] px-[28px]",
                "rounded-full font-medium text-[15px] tracking-tight whitespace-nowrap",
                "bg-[var(--color-bone)] text-[var(--color-ink)]",
                "hover:bg-[var(--color-caribbean-green)] hover:text-[var(--color-ink)]",
                "active:scale-[0.98] transition-[background-color,transform] duration-200 ease-out",
                "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-caribbean-green)]",
              )}
            >
              {ctaPrimary.label}
            </CtaLink>

            {ctaSecondary && (
              <CtaLink
                href={ctaSecondary.href ?? "#how"}
                className={cn(
                  "inline-flex items-center justify-center gap-2 h-[52px] px-[24px]",
                  "rounded-full font-medium text-[15px] tracking-tight whitespace-nowrap",
                  "border border-[var(--color-bone)]/30 text-[var(--color-bone)]",
                  "hover:border-[var(--color-bone)]/60 transition-colors",
                )}
              >
                {ctaSecondary.label}
              </CtaLink>
            )}
          </div>

          {ctaMicrocopy && (
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-bone)]/50 mt-5 max-w-lg">
              {ctaMicrocopy}
            </p>
          )}

          {trustLine && (
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-caribbean-green)]/80 mt-4 max-w-lg">
              {trustLine}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

/** Route hrefs go through the i18n Link (locale-aware); hash hrefs stay plain anchors. */
function CtaLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

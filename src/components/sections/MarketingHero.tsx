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
   * Headline. One string — the line breaks come from the measure, never from a
   * hardcoded <br>. The old two-line tuple produced rags that cut mid-phrase
   * ("Construimos, / operamos y / respondemos por") at every viewport.
   */
  headline: string;
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
 * Shared marketing hero — dark gradient surface, copy on the left, visual on
 * the right.
 *
 * Layout contract (auditoría 2026-08-09 §B): copy and visual live in two
 * **grid columns**, never in overlapping absolute layers. Before, the copy was
 * `max-w-2xl` and the visual was `absolute right-[-4%] w-[54%]`; from 1024 px up
 * the H1 ran straight through the WhatsApp node and the visual was clipped by up
 * to 58 px at the viewport edge. Columns make the collision structurally
 * impossible at every width.
 *
 * The section is sized so the primary CTA clears the fold on a 1280 × 720
 * laptop: `min-h` uses `svh` with a cap, and the vertical rhythm is tuned
 * against that budget.
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
      className="relative overflow-hidden pt-24 md:pt-28 pb-14 md:pb-20 min-h-[min(100svh,860px)] flex items-center"
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

      <Container width="wide" className="relative z-10 w-full">
        <div className="grid items-center gap-10 xl:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
          {/* ── Copy lane ── */}
          <div className="min-w-0 max-w-[34rem] xl:max-w-none">
            <Eyebrow variant="dark">{eyebrow}</Eyebrow>

            {meta && (
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-bone)]/60 mt-4">
                / {meta}
              </p>
            )}

            {kicker && (
              <p className="font-accent italic text-[15px] md:text-[16px] text-[var(--color-bone)]/75 mt-5">
                {kicker}
              </p>
            )}

            <h1
              className={cn(
                "font-display font-bold leading-[1.03] tracking-[-0.035em] text-[var(--color-bone)] text-balance",
                "text-[clamp(2rem,1.05rem+3.2vw,3.375rem)]",
                kicker ? "mt-3" : "mt-5",
              )}
            >
              <SplitText text={headline} />
            </h1>

            <p className="font-display font-medium text-[clamp(1rem,0.86rem+0.5vw,1.25rem)] leading-[1.45] tracking-[-0.01em] text-[var(--color-bone)]/75 mt-5 max-w-[40ch] text-pretty">
              {subheadline}
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <CtaLink
                href={ctaPrimary.href ?? "#book"}
                className={cn(
                  "inline-flex items-center justify-center gap-2 h-[52px] px-7",
                  "rounded-full font-medium text-[15px] tracking-tight",
                  "bg-[var(--color-bone)] text-[var(--color-ink)]",
                  "hover:bg-[var(--color-caribbean-green)] hover:text-[var(--color-ink)]",
                  "active:scale-[0.98] transition-[background-color,transform] duration-200 ease-out motion-reduce:transition-none",
                  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-caribbean-green)]",
                )}
              >
                {ctaPrimary.label}
              </CtaLink>

              {ctaSecondary && (
                <CtaLink
                  href={ctaSecondary.href ?? "#how"}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 h-[52px] px-6",
                    "rounded-full font-medium text-[15px] tracking-tight",
                    "border border-[var(--color-bone)]/35 text-[var(--color-bone)]",
                    "hover:border-[var(--color-bone)]/70 hover:bg-[var(--color-bone)]/5 transition-colors motion-reduce:transition-none",
                    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-caribbean-green)]",
                  )}
                >
                  {ctaSecondary.label}
                </CtaLink>
              )}
            </div>

            {/* Microcopy + trust line.
                Both were `bone/50` at 10–11 px: 3.91:1 on this gradient, below
                the 4.5:1 AA floor. Raised to /75 and given normal case at 12 px
                so they read as sentences, not as a wall of tracked-out mono. */}
            {ctaMicrocopy && (
              <p className="text-[13px] leading-relaxed text-[var(--color-bone)]/75 mt-4 max-w-[42ch]">
                {ctaMicrocopy}
              </p>
            )}

            {trustLine && (
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-caribbean-green)] mt-3.5 leading-relaxed">
                {trustLine}
              </p>
            )}
          </div>

          {/* ── Visual lane ──
              Hidden below md (there is no room), shown from md up. It never
              overlaps the copy because it is a sibling column, not an overlay. */}
          {/* `w-full` es obligatorio: con `mx-auto` los márgenes automáticos
              ganan a `align-items: stretch` y el carril se encogía al ancho
              intrínseco del SVG (300 px por defecto en un <svg> con viewBox). */}
          <div className="pointer-events-none hidden md:block w-full min-w-0 md:max-w-[38rem] md:mx-auto xl:max-w-none text-[var(--color-bone)]">
            {visual ?? (
              <AnimatedMark
                immediate
                traceDurationSeconds={2.6}
                fillRevealSeconds={0.9}
                loopShimmer
                shimmerIntervalSeconds={11}
                className="w-full"
              />
            )}
          </div>
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

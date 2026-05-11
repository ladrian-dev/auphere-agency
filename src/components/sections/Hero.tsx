import { useTranslations } from "next-intl";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { SplitText } from "@/components/motion/SplitText";
import { AnimatedMark } from "@/components/motion/AnimatedMark";
import { cn } from "@/lib/utils/cn";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      className="relative overflow-hidden pt-32 md:pt-40 pb-24 md:pb-32 min-h-screen"
      style={{
        background:
          "radial-gradient(120% 90% at 100% 50%, var(--color-bangladesh-green) 0%, var(--color-pine) 55%, var(--color-ink) 100%)",
      }}
    >
      {/* Subtle dot grid layered over the gradient for editorial texture. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(241,247,246,0.35) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Hero brand mark — dominant visual on the right.
          On md+ it occupies ~62% of the hero width, on mobile it falls behind
          the copy as a softer backdrop. */}
      <AnimatedMark
        immediate
        traceDurationSeconds={2.6}
        fillRevealSeconds={0.9}
        loopShimmer
        shimmerIntervalSeconds={11}
        className="pointer-events-none absolute right-[-14%] top-1/2 -translate-y-1/2 w-[68%] max-w-[900px] hidden md:block"
      />

      <Container width="wide" className="relative z-10">
        <div className="max-w-2xl">
          <Eyebrow variant="dark">{t("eyebrow")}</Eyebrow>

          <h1 className="font-display font-bold text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.02] tracking-[-0.04em] text-[var(--color-bone)] mt-5">
            <SplitText text={t("headlineLine1")} delay={0.2} />
            <br />
            <SplitText text={t("headlineLine2")} delay={0.6} stagger={0.1} />
          </h1>

          <p className="font-display font-medium text-[clamp(1.05rem,1.8vw,1.375rem)] leading-[1.4] tracking-[-0.01em] text-[var(--color-bone)]/70 mt-5 max-w-xl">
            {t("subheadline")}
          </p>

          <div className="mt-7">
            <a
              href="#book"
              className={cn(
                "inline-flex items-center justify-center gap-2 h-[52px] px-[28px]",
                "rounded-full font-medium text-[15px] tracking-tight whitespace-nowrap",
                "bg-[var(--color-bone)] text-[var(--color-ink)]",
                "hover:bg-[var(--color-caribbean-green)] hover:text-[var(--color-ink)]",
                "active:scale-[0.98] transition-[background-color,transform] duration-200 ease-out",
                "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-caribbean-green)]",
              )}
            >
              {t("ctaPrimary")}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

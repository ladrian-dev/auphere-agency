"use client";
import { useTranslations } from "next-intl";
import { Container } from "@/components/primitives/Container";
import { SectionMarker } from "@/components/primitives/SectionMarker";
import { motion, useReducedMotion } from "motion/react";
import type { VerticalSlug } from "@/lib/use-cases/verticals";

interface Props {
  vertical: VerticalSlug;
  integrations: readonly string[];
  number: string;
}

/**
 * Integrations · horizontal pill grid of vendor names the agent talks to.
 * No logos in this v1 — purely typographic, matching the editorial voice.
 * Hand-drawn logo set is a future commission (consistent with the cases
 * section approach).
 */
export function IntegrationsStrip({ vertical, integrations, number }: Props) {
  const t = useTranslations(`useCases.${vertical}.integrations`);
  const reducedMotion = useReducedMotion();

  return (
    <section className="py-24 md:py-32">
      <SectionMarker
        number={number}
        label={t("marker.label")}
        meta={t("marker.meta")}
      />

      <Container width="wide">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div>
            <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-[-0.03em]">
              {t("headline")}
            </h2>
            <p className="text-[var(--color-ink-muted)] mt-5 leading-relaxed text-[16px] md:text-[17px] max-w-md">
              {t("intro")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {integrations.map((name, i) => (
              <motion.span
                key={name}
                initial={
                  reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.4,
                  ease: [0.32, 0.72, 0, 1],
                  delay: i * 0.05,
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-sand)] text-[var(--color-ink)] text-[13.5px] font-medium leading-none whitespace-nowrap hover:bg-[var(--color-pistachio)]/60 transition-colors"
              >
                <span
                  aria-hidden
                  className="w-1.5 h-1.5 rounded-full bg-[var(--color-bangladesh-green)]"
                />
                {name}
              </motion.span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

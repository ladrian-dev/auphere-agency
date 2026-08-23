'use client';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { StaggerGrid, StaggerItem } from '@/components/motion/StaggerGrid';
import { RoleIcon } from './RoleIcon';
import type { VerticalSlug } from '@/lib/use-cases/verticals';

interface Props {
  vertical: VerticalSlug;
  roleKeys: readonly string[];
  number: string;
}

/**
 * Five agent role cards. Each one names a capability the agent can deliver
 * for this vertical — including roles we don't have shipped today but can
 * build (bespoke + managed). The point is to expand the buyer's idea of
 * what an AI agent can do beyond "chatbot".
 */
export function AgentRoles({ vertical, roleKeys, number }: Props) {
  const t = useTranslations(`useCases.${vertical}.roles`);

  return (
    <section className="section-y">
      <SectionMarker number={number} label={t('marker.label')} meta={t('marker.meta')} />

      <Container width="wide">
        <div className="max-w-3xl mb-16 md:mb-20">
          <h2 className="type-h2">
            {t('headline')}
          </h2>
          <p className="type-intro text-[var(--color-ink-muted)] mt-5">
            {t('intro')}
          </p>
        </div>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {roleKeys.map((key, i) => (
            <StaggerItem
              key={key}
              className="group relative rounded-2xl border border-[var(--color-ink-subtle)] bg-[var(--color-bone)] p-6 md:p-7 hover:border-[var(--color-ink-dim)] hover:-translate-y-0.5 transition-all duration-300 ease-out"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-[44px] h-[44px] rounded-xl bg-[var(--color-sand)] flex items-center justify-center text-[var(--color-bangladesh-green)] group-hover:bg-[var(--color-bangladesh-green)] group-hover:text-[var(--color-bone)] transition-colors">
                  <RoleIcon role={key} />
                </div>
                <p className="type-meta text-[var(--color-ink-muted)] mt-4">
                  / {String(i + 1).padStart(2, '0')}
                </p>
              </div>
              <h3 className="font-display font-semibold text-lg md:text-xl tracking-[-0.02em] leading-[1.25] mt-5 text-[var(--color-ink)]">
                {t(`items.${key}.title` as Parameters<typeof t>[0])}
              </h3>
              <p className="text-[14px] md:text-[15px] leading-[1.55] text-[var(--color-ink-muted)] mt-2.5">
                {t(`items.${key}.body` as Parameters<typeof t>[0])}
              </p>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}

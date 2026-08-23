import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { StaggerGrid, StaggerItem } from '@/components/motion/StaggerGrid';

const YES_KEYS = ['yes1', 'yes2', 'yes3', 'yes4'] as const;
const NO_KEYS = ['no1', 'no2'] as const;

export function Qualifier() {
  const t = useTranslations('qualifier');

  return (
    <section className="section-y dot-grid">
      <SectionMarker number="05" label={t('marker.label')} meta={t('marker.meta')} />

      <Container width="wide">
        <div className="max-w-3xl mb-10 md:mb-14">
          <h2 className="type-h2">
            {t('headline')}
          </h2>
        </div>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          <StaggerItem>
            <p className="type-meta text-[var(--color-mountain-meadow)] mb-6">
              {t('yesTitle')}
            </p>
            <ul className="flex flex-col gap-5">
              {YES_KEYS.map((k) => (
                <li key={k} className="flex items-start gap-4">
                  <CheckIcon />
                  <span className="text-[17px] leading-relaxed text-[var(--color-ink)]">
                    {t(`yes.${k}`)}
                  </span>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <p className="type-meta text-[var(--color-status-danger)] mb-6">
              {t('noTitle')}
            </p>
            <ul className="flex flex-col gap-5">
              {NO_KEYS.map((k) => (
                <li key={k} className="flex items-start gap-4">
                  <CrossIcon />
                  <span className="text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                    {t(`no.${k}`)}
                  </span>
                </li>
              ))}
            </ul>
          </StaggerItem>
        </StaggerGrid>
      </Container>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden
      className="shrink-0 mt-1.5 w-5 h-5 text-[var(--color-mountain-meadow)]"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 10.5l4.5 4.5L17 5" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      aria-hidden
      className="shrink-0 mt-1.5 w-5 h-5 text-[var(--color-status-danger)]"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}

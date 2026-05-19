import { useTranslations } from 'next-intl';
import { MarketingHero } from '@/components/sections/MarketingHero';
import type { VerticalSlug } from '@/lib/use-cases/verticals';

interface Props {
  vertical: VerticalSlug;
}

/**
 * Vertical use-case hero — single-line outcome headline, dual CTA. Reuses
 * the shared MarketingHero so the animation (AnimatedMark with trace →
 * fill → shimmer) is identical to the home, with only the copy changing.
 */
export function VerticalHero({ vertical }: Props) {
  const t = useTranslations(`useCases.${vertical}.hero`);
  const tCommon = useTranslations('useCases.common');

  return (
    <MarketingHero
      eyebrow={t('eyebrow')}
      meta={t('meta')}
      kicker={t('kicker')}
      headline={t('headline')}
      subheadline={t('subheadline')}
      ctaPrimary={{ label: tCommon('ctaPrimary'), href: '#book' }}
      ctaSecondary={{ label: tCommon('ctaSecondary'), href: '#conversation' }}
      ctaMicrocopy={tCommon('ctaMicrocopy')}
    />
  );
}

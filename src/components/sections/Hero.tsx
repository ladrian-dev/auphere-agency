import { useTranslations } from 'next-intl';
import { MarketingHero } from './MarketingHero';

/**
 * Home hero — two-line outcome headline, single CTA. Thin wrapper that
 * passes the home's copy into the shared MarketingHero layout.
 */
export function Hero() {
  const t = useTranslations('hero');

  return (
    <MarketingHero
      eyebrow={t('eyebrow')}
      headline={[t('headlineLine1'), t('headlineLine2')]}
      subheadline={t('subheadline')}
      ctaPrimary={{ label: t('ctaPrimary'), href: '#book' }}
      ctaMicrocopy={t('ctaMicrocopy')}
    />
  );
}

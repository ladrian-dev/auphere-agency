import { useTranslations } from 'next-intl';
import { MarketingHero } from './MarketingHero';
import { Orchestrator } from '@/components/motion/Orchestrator';

/**
 * Home hero v3 — el relato de plataforma ("construimos, operamos y
 * respondemos por") con el ORQUESTADOR como visual (§6.1.1), no un mockup
 * de chat. El LCP es el H1; el SVG se anima después, vía A-03.
 */
export function Hero() {
  const t = useTranslations('hero');

  return (
    <MarketingHero
      eyebrow={t('eyebrow')}
      headline={[t('headlineLine1'), t('headlineLine2')]}
      subheadline={t('subheadline')}
      ctaPrimary={{ label: t('ctaPrimary'), href: '#book' }}
      ctaSecondary={{ label: t('ctaSecondary'), href: '/platform' }}
      ctaMicrocopy={t('ctaMicrocopy')}
      trustLine={t('trustLine')}
      visual={
        <div className="pointer-events-none absolute right-[-4%] top-1/2 -translate-y-1/2 w-[54%] max-w-[760px] hidden lg:block text-[var(--color-bone)]">
          <Orchestrator
            immediate
            labels={{
              channels: [
                t('orchestrator.whatsapp'),
                t('orchestrator.instagram'),
                t('orchestrator.tiktok'),
                t('orchestrator.voice'),
              ],
              classifier: t('orchestrator.classifier'),
              tools: [
                t('orchestrator.calendar'),
                t('orchestrator.crm'),
                t('orchestrator.payments'),
                t('orchestrator.browser'),
              ],
              response: t('orchestrator.response'),
              human: t('orchestrator.human'),
            }}
          />
        </div>
      }
    />
  );
}

import { useTranslations } from 'next-intl';
import { MarketingHero } from './MarketingHero';
import { Orchestrator } from '@/components/motion/Orchestrator';

/**
 * Home hero v3 — el relato de plataforma ("construimos, operamos y
 * respondemos por") con el ORQUESTADOR como visual (§6.1.1). El LCP es el H1;
 * el SVG entra después.
 *
 * El visual ya no es una capa absoluta sobre el texto: `MarketingHero` lo
 * coloca en su propia columna de grid. Ver auditoría 2026-08-09 §B-2.
 */
export function Hero() {
  const t = useTranslations('hero');

  return (
    <MarketingHero
      eyebrow={t('eyebrow')}
      headline={t('headline')}
      subheadline={t('subheadline')}
      ctaPrimary={{ label: t('ctaPrimary'), href: '#book' }}
      ctaSecondary={{ label: t('ctaSecondary'), href: '/platform' }}
      visual={
        <Orchestrator
          immediate
          className="w-full"
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
      }
    />
  );
}

import { useTranslations } from 'next-intl';
import { TickIcon } from '@/components/primitives/icons';
import { CtaLink } from '@/components/primitives/CtaLink';
import { UsageSlider } from './UsageSlider';

const BULLETS = ['b1', 'b2', 'b3'] as const;

/**
 * Cómo se cobra (README §Home 6): panel de 32 px con texto + ticks + CTA a la
 * izquierda y el slider de consumo a la derecha. Sin cifras de precio.
 */
export function Pricing() {
  const t = useTranslations('home.pricing');

  return (
    <section id="precio" className="section-y scroll-mt-24">
      <div className="container-site">
        <div className="panel relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-10%] top-[-30%] h-[120%] w-[60%] blur-[40px]"
            style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(0,223,129,.16), transparent 70%)' }}
          />
          <div className="relative grid grid-cols-1 items-center gap-10 desk:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] desk:gap-[72px]">
            <div className="max-tab:flex max-tab:flex-col max-tab:items-center max-tab:text-center">
              <p className="type-eyebrow">{t('eyebrow')}</p>
              {/* H2 de máximo dos líneas en desktop (regla del rediseño): baja un escalón porque el titular es largo y vive en media columna. */}
              <h2 className="type-h2 mt-3.5 max-w-[24ch] desk:text-[clamp(30px,3.2vw,42px)] max-tab:max-w-none">{t('title')}</h2>
              <p className="type-lead mt-[18px] max-w-[42ch] max-tab:max-w-none">{t('lead')}</p>
              <ul className="mt-6 flex flex-col gap-2.5 text-left max-tab:inline-flex max-tab:max-w-full">
                {BULLETS.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[16px] leading-[1.5] text-[rgba(241,247,246,.85)]">
                    <TickIcon className="mt-[3px] shrink-0" />
                    <span>{t(b)}</span>
                  </li>
                ))}
              </ul>
              <CtaLink href="#agenda" section="pricing" className="btn btn-primary btn-md mt-7 max-tab:h-[52px] max-tab:w-full">
                {t('cta')}
              </CtaLink>
            </div>
            <UsageSlider />
          </div>
        </div>
      </div>
    </section>
  );
}

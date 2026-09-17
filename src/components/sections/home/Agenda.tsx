import { useTranslations } from 'next-intl';
import { CalPanel } from '@/components/sections/CalPanel';

/**
 * Agenda ahora (README §Home 8): H2, párrafo y el panel de reserva.
 */
export function Agenda() {
  const t = useTranslations('home.agenda');

  return (
    <section
      id="agenda"
      className="relative isolate scroll-mt-16 section-y"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-2px] z-0 h-[80%] w-[120vw] -translate-x-1/2 blur-[50px] max-tab:left-0 max-tab:w-full max-tab:translate-x-0"
        style={{ background: 'radial-gradient(50% 60% at 50% 30%, rgba(0,223,129,.22), transparent 70%)' }}
      />
      <div className="container-site relative z-[1]">
        <div className="mx-auto max-w-[56ch] text-center max-tab:max-w-none">
          <p className="type-eyebrow">{t('eyebrow')}</p>
          <h2 className="mx-auto mt-3.5 max-w-[16ch] text-[clamp(30px,4.6vw,60px)] font-semibold leading-[1.04] tracking-[-0.03em] [text-wrap:balance] max-tab:max-w-none max-tab:text-[clamp(28px,7.6vw,34px)] max-tab:leading-[1.12]">
            {t('title')}
          </h2>
          <p className="type-lead mt-[18px]">{t('lead')}</p>
        </div>
        <div id="cal" className="mt-14 scroll-mt-24 max-tab:mt-10">
          <CalPanel />
        </div>
      </div>
    </section>
  );
}

import { useTranslations } from 'next-intl';
import { Marquee } from './Marquee';
import { HeroChat } from './HeroChat';
import { CtaLink } from '@/components/primitives/CtaLink';

const TASK_KEYS = ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9'] as const;

/**
 * Hero de la home (README §Home 1). Grid de dos columnas desde 960 px: chip,
 * H1, párrafo, dos CTAs y marquesina de tareas; a la derecha el mock de chat.
 * Fondo: halo radial mint al 22 % con blur 40 y rejilla de 64 px al 5 % con
 * máscara radial.
 */
export function HomeHero() {
  const t = useTranslations('home.hero');

  return (
    <section
      id="hero"
      className="relative isolate pt-[clamp(140px,18vh,200px)] max-tab:pt-[120px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10%] z-0 h-[70vh] w-[120vw] -translate-x-1/2 blur-[40px] max-tab:left-0 max-tab:w-full max-tab:translate-x-0 motion-safe:animate-[g-glow_8s_ease-in-out_infinite]"
        style={{ background: 'radial-gradient(50% 60% at 50% 40%, rgba(0,223,129,.22), transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(241,247,246,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(241,247,246,.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(60% 60% at 50% 30%, #000, transparent)',
          WebkitMaskImage: 'radial-gradient(60% 60% at 50% 30%, #000, transparent)',
        }}
      />

      <div className="container-site relative z-[1]">
        <div className="grid grid-cols-1 items-center gap-14 max-tab:gap-10 desk:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="min-w-0 motion-safe:animate-[g-up_.7s_var(--ease-out)_both] max-tab:flex max-tab:flex-col max-tab:items-center max-tab:text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-3)] bg-[rgba(241,247,246,.05)] py-1.5 pl-3 pr-1.5 text-[13px]">
              <span className="font-semibold text-[var(--color-primary)]">{t('chipA')}</span>
              <span aria-hidden className="h-3.5 w-px bg-[rgba(241,247,246,.2)]" />
              <span className="text-[rgba(241,247,246,.75)]">{t('chipB')}&nbsp;&nbsp;</span>
            </div>
            <h1 className="type-h1 mt-[22px] max-w-[14ch] max-tab:max-w-none">{t('title')}</h1>
            <p className="type-hero-lead mt-[22px] max-w-[44ch] max-tab:max-w-none">{t('lead')}</p>
            <div className="mt-8 flex flex-wrap gap-3 max-tab:w-full max-tab:flex-col">
              <CtaLink href="#agenda" section="hero" className="btn btn-primary btn-lg max-tab:w-full">
                {t('ctaPrimary')}
              </CtaLink>
              <a href="#funciones" className="btn btn-ghost h-[52px] px-6 text-[16px] max-tab:w-full">
                {t('ctaSecondary')}
              </a>
            </div>
            <Marquee
              className="mt-11"
              label={t('tasksLabel')}
              items={TASK_KEYS.map((k) => t(`tasks.${k}`))}
              duration={28}
            />
          </div>

          <div className="flex min-w-0 justify-center motion-safe:animate-[g-up_.8s_var(--ease-out)_.15s_both]">
            <div className="relative w-full max-w-[440px]">
              <div
                aria-hidden
                className="absolute -inset-10 z-0 blur-[30px]"
                style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(0,223,129,.18), transparent 70%)' }}
              />
              <HeroChat />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

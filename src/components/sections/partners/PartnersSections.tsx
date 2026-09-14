import { useTranslations } from 'next-intl';
import { CalPanel } from '@/components/sections/CalPanel';
import { PartnerApplicationForm } from './PartnerApplicationForm';
import { cn } from '@/lib/utils/cn';

/** Tres formas de ganar (README §Partners 2). */
export function ThreeWays() {
  const t = useTranslations('partners.ways');
  const tracks = ['referral', 'reseller', 'embedded'] as const;

  return (
    <section id="vias" className="section-y-inner scroll-mt-24">
      <div className="container-site">
        <div className="mx-auto max-w-[52ch] text-center max-tab:max-w-none">
          <p className="type-eyebrow">{t('eyebrow')}</p>
          <h2 className="type-h2 mt-3.5">{t('title')}</h2>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-4 cal:grid-cols-3 max-tab:mt-10">
          {tracks.map((track) => {
            const featured = track === 'reseller';
            return (
              <a
                key={track}
                href="#apply"
                className={cn(
                  'flex flex-col gap-3.5 rounded-[24px] border p-7 text-[var(--color-text)] transition-colors duration-200',
                  'hover:border-[rgba(0,223,129,.6)] hover:text-[var(--color-text)]',
                  featured
                    ? 'border-[rgba(0,223,129,.45)] bg-[linear-gradient(180deg,rgba(0,223,129,.10),rgba(241,247,246,.03))]'
                    : 'border-[var(--color-line-2)] bg-[var(--color-card)]',
                  'max-tab:items-center max-tab:px-5 max-tab:py-6 max-tab:text-center',
                )}
              >
                <p className="type-eyebrow">{t(`items.${track}.eyebrow`)}</p>
                <h3 className="text-[28px] font-semibold leading-[1.1] tracking-[-0.02em] max-tab:text-[24px]">{t(`items.${track}.name`)}</h3>
                <p className="text-[14px] text-[rgba(241,247,246,.6)]">{t(`items.${track}.audience`)}</p>
                <p className="text-[16px] leading-[1.55] text-[rgba(241,247,246,.8)] [text-wrap:pretty]">{t(`items.${track}.body`)}</p>
                <span className="mt-auto text-[15px] font-semibold text-[var(--color-primary)]">
                  {t(`items.${track}.cta`)}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Qué recibes (README §Partners 3): lista con etiqueta «Hoy» / «Con fecha». */
export function WhatYouGet() {
  const t = useTranslations('partners.get');
  const items = [
    { key: 'i1', dated: false },
    { key: 'i2', dated: false },
    { key: 'i3', dated: false },
    { key: 'i4', dated: false },
    { key: 'i5', dated: true },
    { key: 'i6', dated: true },
  ] as const;

  return (
    <section className="section-y-inner">
      <div className="container-site">
        <div className="grid grid-cols-1 items-start gap-10 cal:grid-cols-2 cal:gap-16">
          <div className="max-tab:text-center">
            <p className="type-eyebrow">{t('eyebrow')}</p>
            <h2 className="type-h2 mt-3.5 max-w-[20ch] max-tab:mx-auto max-tab:max-w-none">{t('title')}</h2>
          </div>
          <ul className="flex flex-col border-t border-[var(--color-line)] text-left">
            {items.map((item) => (
              <li key={item.key} className="flex items-start gap-4 border-b border-[var(--color-line)] py-[18px]">
                <span className={cn('tag mt-[3px]', item.dated ? 'tag-muted' : 'tag-accent')}>
                  {item.dated ? t('dated') : t('today')}
                </span>
                <div>
                  <p className="text-[16px] leading-[1.5]">{t(`items.${item.key}.text`)}</p>
                  {item.dated && (
                    <p className="mt-1 text-[14px] text-[var(--color-text-3)]">{t(`items.${item.key}.note`)}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Quién hace qué (README §Partners 4): dos tarjetas de igual alto «Tú» / «Nosotros». */
export function WhoDoesWhat() {
  const t = useTranslations('partners.who');
  const keys = ['i1', 'i2', 'i3', 'i4', 'i5'] as const;

  const card = (side: 'you' | 'us') => (
    <div
      className={cn(
        'flex h-full flex-col rounded-[24px] border p-7 text-left max-tab:px-5 max-tab:py-6',
        side === 'you' ? 'border-[rgba(0,223,129,.3)] bg-[rgba(0,223,129,.06)]' : 'border-[var(--color-line-2)] bg-[var(--color-card)]',
      )}
    >
      <p className={cn('text-[14px] font-semibold', side === 'you' ? 'text-[var(--color-primary)]' : 'text-[rgba(241,247,246,.7)]')}>
        {t(side)}
      </p>
      <ul className="mt-4 flex flex-col gap-3">
        {keys.map((k) => (
          <li key={k} className="flex gap-3 text-[16px] leading-[1.5]">
            <span
              aria-hidden
              className={cn('mt-[9px] size-1.5 shrink-0 rounded-full', side === 'you' ? 'bg-[var(--color-primary)]' : 'bg-[rgba(241,247,246,.5)]')}
            />
            <span>{t(`${side}Items.${k}`)}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className="section-y-inner">
      <div className="container-site">
        <div className="mx-auto max-w-[52ch] text-center max-tab:max-w-none">
          <p className="type-eyebrow">{t('eyebrow')}</p>
          <h2 className="type-h2 mt-3.5">{t('title')}</h2>
        </div>
        <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-stretch gap-10 cal:gap-16 max-tab:mt-10">
          {card('you')}
          {card('us')}
        </div>
      </div>
    </section>
  );
}

/** Únete al programa (README §Partners 5): texto + formulario y, debajo, el panel de reserva. */
export function Apply() {
  const t = useTranslations('partners.apply');

  return (
    <section id="apply" className="section-y relative isolate scroll-mt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-[80%] w-[120vw] -translate-x-1/2 blur-[50px] max-tab:left-0 max-tab:w-full max-tab:translate-x-0"
        style={{ background: 'radial-gradient(50% 60% at 50% 30%, rgba(0,223,129,.2), transparent 70%)' }}
      />
      <div className="container-site relative z-[1]">
        <div className="grid grid-cols-1 items-start gap-10 cal:grid-cols-2 cal:gap-16">
          <div className="max-tab:text-center">
            <p className="type-eyebrow">{t('eyebrow')}</p>
            <h2 className="mt-3.5 max-w-[20ch] text-[clamp(32px,4.6vw,58px)] font-semibold leading-[1.04] tracking-[-0.03em] [text-wrap:balance] max-tab:mx-auto max-tab:max-w-none max-tab:text-[clamp(28px,7.6vw,34px)] max-tab:leading-[1.12]">
              {t('title')}
            </h2>
            <p className="mt-[18px] max-w-[44ch] text-[17px] leading-[1.55] text-[var(--color-text-2)] [text-wrap:pretty] max-tab:mx-auto max-tab:max-w-none">
              {t('lead')}
            </p>
          </div>
          <div className="flex min-w-0 flex-col gap-6">
            <PartnerApplicationForm />
          </div>
        </div>

        <div className="mt-[clamp(48px,6vw,72px)]">
          <div className="mx-auto max-w-[52ch] text-center max-tab:max-w-none">
            <p className="type-eyebrow">{t('or.eyebrow')}</p>
            <p className="type-lead mt-3.5">{t('or.lead')}</p>
          </div>
          <div id="agenda" className="mt-10 scroll-mt-24">
            <CalPanel />
          </div>
        </div>
      </div>
    </section>
  );
}

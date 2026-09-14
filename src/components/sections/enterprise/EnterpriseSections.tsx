import { TickIcon } from '@/components/primitives/icons';
import { CalPanel } from '@/components/sections/CalPanel';
import { getClaim } from '@/content/claims';
import {
  deployment,
  deploymentSteps,
  guaranteeRows,
  guarantees,
  isolation,
  isolationControls,
  sales,
  type Localized,
} from '@/content/enterprise';
import { cn } from '@/lib/utils/cn';

type Lang = 'es' | 'en';
const pick = (l: Localized, lang: Lang) => l[lang];

/** Garantías y SLAs (README §Enterprise 2): filas con etiqueta «Hoy» / fecha. */
export function Guarantees({ lang }: { lang: Lang }) {
  return (
    <section id="garantias" className="section-y-inner scroll-mt-24">
      <div className="container-site">
        <div className="grid grid-cols-1 items-start gap-10 cal:grid-cols-2 cal:gap-16">
          <div className="max-tab:text-center">
            <p className="type-eyebrow">{pick(guarantees.eyebrow, lang)}</p>
            <h2 className="type-h2 mt-3.5 max-w-[20ch] max-tab:mx-auto max-tab:max-w-none">{pick(guarantees.title, lang)}</h2>
            <p className="mt-4 max-w-[40ch] text-[16px] leading-[1.55] text-[rgba(241,247,246,.65)] max-tab:mx-auto max-tab:max-w-none">
              {pick(guarantees.lead, lang)}
            </p>
          </div>
          <ul className="flex flex-col border-t border-[var(--color-line)] text-left">
            {guaranteeRows.map((row) => {
              const live = getClaim(row.claimId).status === 'live';
              const badge = live ? pick(guarantees.today, lang) : row.when ? pick(row.when, lang) : pick(guarantees.dated, lang);
              return (
                <li
                  key={row.claimId}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 border-b border-[var(--color-line)] py-3.5"
                >
                  <div>
                    <p className="text-[16px] leading-[1.45]">{pick(row.label, lang)}</p>
                    {row.note && <p className="mt-[3px] text-[13px] text-[var(--color-text-3)]">{pick(row.note, lang)}</p>}
                  </div>
                  <span className={cn('tag', live ? 'tag-accent' : 'tag-muted')}>{badge}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Seguridad y control (README §Enterprise 3): panel de 32 px con los 9 controles en grid con hairlines. */
export function Controls({ lang }: { lang: Lang }) {
  return (
    <section className="section-y-inner">
      <div className="container-site">
        <div className="panel">
          <div className="max-w-[56ch] max-tab:mx-auto max-tab:max-w-none max-tab:text-center">
            <p className="type-eyebrow">{pick(isolation.eyebrow, lang)}</p>
            <h2 className="type-h2 mt-3.5">{pick(isolation.title, lang)}</h2>
          </div>
          <ol className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-px overflow-hidden rounded-[20px] border border-[var(--color-line)] bg-[var(--color-line)] max-tab:mt-8">
            {isolationControls.map((control, i) => (
              <li key={control.name.en} className="flex flex-col gap-2 bg-[var(--color-surface)] p-6 text-left">
                <span className="text-[13px] font-semibold text-[var(--color-primary)]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-[17px] font-semibold leading-[1.3]">{pick(control.name, lang)}</h3>
                <p className="text-[14px] leading-[1.55] text-[rgba(241,247,246,.68)]">{pick(control.mechanism, lang)}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-[70ch] text-[15px] leading-[1.55] text-[rgba(241,247,246,.65)] max-tab:mx-auto max-tab:text-center">
            <strong className="font-semibold text-[var(--color-text)]">{pick(isolation.measureTitle, lang)}</strong>{' '}
            {pick(isolation.measureBody, lang)}
          </p>
        </div>
      </div>
    </section>
  );
}

/** Despliegue a medida (README §Enterprise 4): texto + cuatro pasos. */
export function Deployment({ lang }: { lang: Lang }) {
  return (
    <section className="section-y-inner">
      <div className="container-site">
        <div className="grid grid-cols-1 items-start gap-10 cal:grid-cols-2 cal:gap-16">
          <div className="max-tab:flex max-tab:flex-col max-tab:items-center max-tab:text-center">
            <p className="type-eyebrow">{pick(deployment.eyebrow, lang)}</p>
            <h2 className="type-h2 mt-3.5 max-w-[20ch] max-tab:max-w-none">{pick(deployment.title, lang)}</h2>
            <p className="mt-4 max-w-[42ch] text-[16px] leading-[1.55] text-[rgba(241,247,246,.65)] max-tab:max-w-none">
              {pick(deployment.lead, lang)}
            </p>
            <ul className="mt-6 flex flex-col gap-3 text-left max-tab:inline-flex max-tab:max-w-full">
              {deployment.items.map((item) => (
                <li key={item.en} className="flex gap-3 text-[16px] leading-[1.5]">
                  <TickIcon className="mt-[3px] shrink-0" />
                  <span>{pick(item, lang)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[42ch] text-[15px] leading-[1.55] text-[var(--color-text-3)] max-tab:max-w-none">
              <strong className="font-semibold text-[var(--color-text)]">{pick(deployment.priceTitle, lang)}</strong>{' '}
              {pick(deployment.priceBody, lang)}
            </p>
          </div>
          <ol className="flex flex-col gap-3 text-left">
            {deploymentSteps.map((step) => (
              <li
                key={step.label.en}
                className="grid grid-cols-[96px_minmax(0,1fr)] gap-x-4 gap-y-2 rounded-[20px] border border-[var(--color-line-2)] bg-[var(--color-card)] px-6 py-[22px] max-tab:grid-cols-1 max-tab:px-5"
              >
                <span className="text-[14px] font-semibold text-[var(--color-primary)]">{pick(step.label, lang)}</span>
                <div>
                  <h3 className="text-[18px] font-semibold leading-[1.25]">{pick(step.title, lang)}</h3>
                  <p className="mt-1.5 text-[15px] leading-[1.55] text-[rgba(241,247,246,.7)]">{pick(step.body, lang)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Habla con ventas (README §Enterprise 5): H2, párrafo y panel de reserva. */
export function TalkToSales({ lang }: { lang: Lang }) {
  return (
    <section
      id="agenda"
      className="relative isolate scroll-mt-16 pt-[clamp(96px,12vw,160px)] pb-[clamp(64px,8vw,100px)] max-tab:py-[clamp(56px,14vw,80px)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-[80%] w-[120vw] -translate-x-1/2 blur-[50px] max-tab:left-0 max-tab:w-full max-tab:translate-x-0"
        style={{ background: 'radial-gradient(50% 60% at 50% 30%, rgba(0,223,129,.22), transparent 70%)' }}
      />
      <div className="container-site relative z-[1]">
        <div className="mx-auto max-w-[56ch] text-center max-tab:max-w-none">
          <h2 className="text-[clamp(36px,5vw,64px)] font-semibold leading-[1.04] tracking-[-0.03em] [text-wrap:balance] max-tab:text-[clamp(28px,7.6vw,34px)] max-tab:leading-[1.12]">
            {pick(sales.title, lang)}
          </h2>
          <p className="type-lead mt-[18px]">{pick(sales.lead, lang)}</p>
        </div>
        <div className="mt-12 max-tab:mt-10">
          <CalPanel />
        </div>
      </div>
    </section>
  );
}

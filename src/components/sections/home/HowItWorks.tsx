import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { StatsCounter } from './StatsCounter';

const STEPS = [
  { key: 's1', src: '/img/step-01.webp' },
  { key: 's2', src: '/img/step-02.webp' },
  { key: 's3', src: '/img/step-03.webp' },
] as const;

const STAT_VALUES = { s1: 30, s2: 6, s3: 24, s4: 100 } as const;

/**
 * Cómo funciona (README §Home 4). Cabecera centrada, tres tarjetas numeradas
 * con imagen 904:368 y, debajo, cuatro cifras con contador animado.
 */
export function HowItWorks() {
  const t = useTranslations('home.how');

  const stats = (['s1', 's2', 's3', 's4'] as const).map((k) => ({
    value: STAT_VALUES[k],
    prefix: t(`stats.${k}.prefix`),
    suffix: t(`stats.${k}.suffix`),
    label: t(`stats.${k}.label`),
  }));

  return (
    <section id="como" className="section-y scroll-mt-24">
      <div className="container-site">
        <div className="mx-auto max-w-[60ch] text-center max-tab:max-w-none">
          <p className="type-eyebrow">{t('eyebrow')}</p>
          <h2 className="type-h2 mt-3.5">
            {t('titleA')}
            <br className="max-tab:hidden" /> {t('titleB')}
          </h2>
          <p className="type-lead mt-[18px]">{t('lead')}</p>
        </div>

        <ol className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 max-tab:mt-10">
          {STEPS.map((step) => (
            <li key={step.key} className="card card-hover flex flex-col gap-3.5 p-7 max-tab:text-center">
              <span className="text-[14px] font-semibold text-[var(--color-primary)]">{t(`steps.${step.key}.n`)}</span>
              <h3 className="type-h3">{t(`steps.${step.key}.title`)}</h3>
              <p className="text-[16px] leading-[1.55] text-[rgba(241,247,246,.7)] [text-wrap:pretty]">{t(`steps.${step.key}.body`)}</p>
              <div className="mt-auto overflow-hidden rounded-[14px] border border-[rgba(241,247,246,.08)] bg-[#04302D]" style={{ aspectRatio: '904 / 368' }}>
                <Image
                  src={step.src}
                  alt={t(`steps.${step.key}.alt`)}
                  width={1344}
                  height={576}
                  sizes="(min-width: 1100px) 360px, (min-width: 761px) 50vw, 100vw"
                  className="size-full object-cover"
                />
              </div>
            </li>
          ))}
        </ol>

        <StatsCounter stats={stats} label={t('statsLabel')} />
      </div>
    </section>
  );
}

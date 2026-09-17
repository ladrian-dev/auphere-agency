import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { TickIcon } from '@/components/primitives/icons';
import { CtaLink } from '@/components/primitives/CtaLink';
import { cn } from '@/lib/utils/cn';

const ITEMS = [
  { key: 'audio', image: 'skill-audio', flip: false },
  { key: 'memory', image: 'skill-memory', flip: true },
  { key: 'bookings', image: 'skill-bookings', flip: false },
  { key: 'handoff', image: 'skill-handoff', flip: true },
] as const;

const BULLETS = ['b1', 'b2', 'b3', 'b4'] as const;

/**
 * Habilidades (README §Home 5): cuatro filas alternadas imagen 4:3 (máx. 520 px)
 * + texto con eyebrow, H3, párrafo, cuatro ticks y botón fantasma de 44 px.
 */
export function Skills() {
  const t = useTranslations('home.skills');
  // Las capturas llevan texto: cada idioma tiene la suya (`skill-audio.webp` / `skill-audio.en.webp`).
  const suffix = useLocale() === 'en' ? '.en' : '';

  return (
    <section id="funciones" className="section-y scroll-mt-24">
      <div className="container-site">
        <div className="mx-auto max-w-[60ch] text-center max-tab:max-w-none">
          <p className="type-eyebrow">{t('eyebrow')}</p>
          <h2 className="type-h2 mt-3.5">
            {t('titleA')}
            <br className="max-tab:hidden" /> {t('titleB')}
          </h2>
          <p className="type-lead mt-[18px]">{t('lead')}</p>
        </div>

        <div className="mt-14 flex flex-col gap-[clamp(48px,6vw,88px)] max-tab:mt-10">
          {ITEMS.map((item) => (
            <article
              key={item.key}
              className="grid grid-cols-1 items-center gap-10 desk:grid-cols-2 desk:gap-[72px]"
            >
              <div className={cn('relative mx-auto w-full max-w-[520px]', item.flip && 'desk:order-2')}>
                <div
                  aria-hidden
                  className="absolute inset-0 blur-[36px]"
                  style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(0,223,129,.14), transparent 70%)' }}
                />
                <div className="card-gradient relative p-3">
                  <div className="overflow-hidden rounded-[14px] bg-[#04302D]" style={{ aspectRatio: '4 / 3' }}>
                    <Image
                      src={`/img/${item.image}${suffix}.webp`}
                      alt={t(`items.${item.key}.alt`)}
                      width={1200}
                      height={896}
                      sizes="(min-width: 961px) 520px, 100vw"
                      className="size-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="max-tab:flex max-tab:flex-col max-tab:items-center max-tab:text-center">
                <p className="type-eyebrow">{t(`items.${item.key}.eyebrow`)}</p>
                <h3 className="type-h3-feature mt-3">{t(`items.${item.key}.title`)}</h3>
                <p className="mt-4 max-w-[46ch] text-[17px] leading-[1.55] text-[var(--color-text-2)] [text-wrap:pretty] max-tab:max-w-none">
                  {t(`items.${item.key}.body`)}
                </p>
                <ul className="mt-[22px] flex flex-col gap-2.5 text-left max-tab:inline-flex max-tab:max-w-full">
                  {BULLETS.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[16px] leading-[1.5] text-[rgba(241,247,246,.85)]">
                      <TickIcon className="mt-[3px] shrink-0" />
                      <span>{t(`items.${item.key}.${b}`)}</span>
                    </li>
                  ))}
                </ul>
                <CtaLink
                  href="#agenda"
                  section={`skills-${item.key}`}
                  className="btn btn-outline-accent btn-sm mt-[26px] max-tab:min-w-[220px]"
                >
                  {t('cta')}
                </CtaLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

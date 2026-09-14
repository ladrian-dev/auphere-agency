'use client';
import { useId, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { PlusIcon } from '@/components/primitives/icons';
import { cn } from '@/lib/utils/cn';
import { track } from '@/lib/analytics';
import { CONTACT_EMAIL } from '@/lib/site';
import { FAQ_KEYS } from './faq-keys';


/**
 * FAQ (README §Home 7): acordeón de siete preguntas (grid-rows 0fr → 1fr,
 * 400 ms) y tarjeta «¿No encuentras tu respuesta?» con la ilustración del
 * equipo. La primera pregunta arranca abierta.
 */
export function HomeFaq() {
  const t = useTranslations('home.faq');
  const [open, setOpen] = useState<number>(0);
  const baseId = useId();

  const toggle = (i: number) => {
    const next = open === i ? -1 : i;
    setOpen(next);
    if (next !== -1) track('faq_open', { question: FAQ_KEYS[i] ?? String(i) });
  };

  return (
    <section id="faq" className="section-y scroll-mt-24">
      <div className="container-site">
        <div className="text-center">
          <p className="type-eyebrow">{t('eyebrow')}</p>
          <h2 className="type-h2 mt-3.5">{t('title')}</h2>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-10 desk:grid-cols-2 desk:gap-[72px] max-tab:mt-10">
          <div className="flex flex-col gap-2.5">
            {FAQ_KEYS.map((key, i) => {
              const isOpen = open === i;
              const panelId = `${baseId}-panel-${i}`;
              const buttonId = `${baseId}-button-${i}`;
              return (
                <div
                  key={key}
                  className={cn(
                    'rounded-2xl border border-[var(--color-line)] transition-colors duration-300',
                    isOpen ? 'bg-[var(--color-card-2)]' : 'bg-[rgba(241,247,246,.03)]',
                  )}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(i)}
                      className="flex min-h-11 w-full items-center justify-between gap-5 px-5 py-[18px] text-left text-[17px] font-medium"
                    >
                      <span>{t(`items.${key}.q`)}</span>
                      <PlusIcon
                        className={cn('shrink-0 transition-transform duration-[350ms] ease-[var(--ease-out)]', isOpen && 'rotate-45')}
                      />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="grid transition-[grid-template-rows] duration-400 ease-[var(--ease-out)]"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-[15px] leading-[1.6] text-[var(--color-text-2)]">{t(`items.${key}.a`)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="card flex flex-col gap-4 p-8 text-left">
            <h3 className="type-h3">{t('help.title')}</h3>
            <p className="text-[16px] leading-[1.55] text-[rgba(241,247,246,.7)]">{t('help.body')}</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-outline-accent btn-sm self-start max-tab:self-stretch">
              {t('help.cta')}
            </a>
            <div className="mt-auto overflow-hidden rounded-[14px] bg-[#04302D]" style={{ aspectRatio: '677 / 388' }}>
              <Image
                src="/img/faq-team.webp"
                alt={t('help.alt')}
                width={1100}
                height={619}
                sizes="(min-width: 961px) 520px, 100vw"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

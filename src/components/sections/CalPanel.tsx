import { useTranslations } from 'next-intl';
import { MarkIcon, TickIcon } from '@/components/primitives/icons';
import { CalEmbed } from './CalEmbed';
import { cn } from '@/lib/utils/cn';

interface Props {
  className?: string;
}

/**
 * Panel de reserva (README §Panel de reserva). Tarjeta 24 px, borde .12, dos
 * columnas desde 900 px con hairline vertical: a la izquierda la ficha de la
 * reunión (icono, título, 3 bullets); a la derecha el embed real de Cal.com
 * en tema oscuro con el idioma de la página. En móvil el texto queda alineado
 * a la izquierda (excepción explícita a la regla de centrado).
 */
export function CalPanel({ className }: Props) {
  const t = useTranslations('site.cal');
  const bullets = ['b1', 'b2', 'b3'] as const;

  return (
    <div
      data-cal-block
      className={cn(
        'overflow-hidden rounded-[24px] border border-[var(--color-line-2)] shadow-[var(--shadow-panel)]',
        'bg-[linear-gradient(180deg,rgba(241,247,246,.06),rgba(241,247,246,.02))]',
        className,
      )}
    >
      <div className="grid grid-cols-1 items-stretch cal:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div
          className={cn(
            'flex flex-col gap-[18px] border-b border-[var(--color-line)] p-[clamp(28px,4vw,44px)] text-left',
            'cal:border-b-0 cal:border-r',
            'max-tab:px-5 max-tab:py-6',
          )}
        >
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-[var(--color-primary)] text-[var(--color-on-primary)]">
              <MarkIcon size={24} />
            </span>
            <div>
              <p className="text-[16px] font-semibold">{t('title')}</p>
              <p className="text-[13px] text-[var(--color-text-3)]">{t('meta')}</p>
            </div>
          </div>
          <ul className="mt-1.5 flex flex-col gap-2.5">
            {bullets.map((key) => (
              <li key={key} className="flex gap-3 text-[16px] leading-[1.5] text-[rgba(241,247,246,.85)]">
                <TickIcon className="mt-[3px] shrink-0" />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex bg-[rgba(3,34,33,.6)]">
          <CalEmbed theme="dark" minHeight={620} className="max-tab:min-h-[560px]" />
        </div>
      </div>
    </div>
  );
}

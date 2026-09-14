'use client';
import Cal, { getCalApi } from '@calcom/embed-react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils/cn';

/**
 * Reunión de diagnóstico · 30 min · sin coste. Todos los públicos (Home,
 * Partners, Enterprise) reservan la misma reunión (README §Panel de reserva).
 */
export const CAL_LINK =
  process.env.NEXT_PUBLIC_CAL_LINK || 'auphere-team/diagnostico-auphere-30-min-sin-coste';

interface Props {
  calLink?: string;
  theme?: 'dark' | 'light';
  /** Alto mínimo del embed (620 px en el panel de reserva; 560 en móvil). */
  minHeight?: number;
  className?: string;
}

/**
 * Embed de Cal.com sin cromo propio: el marco lo pone quien lo usa (CalPanel).
 * Carga diferida hasta que el visitante se acerca — el iframe + JS de Cal pesa
 * ~400 KB y no debe entrar en el primer pintado.
 */
export function CalEmbed({ calLink = CAL_LINK, theme = 'dark', minHeight = 620, className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const locale = useLocale();
  const t = useTranslations('site.cal');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('IntersectionObserver' in window)) {
      const id = setTimeout(() => setShouldLoad(true), 0);
      return () => clearTimeout(id);
    }
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    (async () => {
      const cal = await getCalApi();
      cal('ui', {
        theme,
        cssVarsPerTheme: {
          light: {
            'cal-brand': '#03624C',
            'cal-text': '#0D0F01',
            'cal-bg': '#F1F7F6',
          },
          dark: {
            'cal-brand': '#00DF81',
            'cal-text': '#F1F7F6',
            'cal-bg': '#032221',
            'cal-bg-muted': '#04302D',
          },
        },
        hideEventTypeDetails: true,
        layout: 'month_view',
      });
    })();
  }, [shouldLoad, theme]);

  return (
    <div ref={containerRef} className={cn('flex w-full', className)} style={{ minHeight }}>
      {shouldLoad ? (
        <Cal
          calLink={calLink}
          config={{
            layout: 'month_view',
            theme,
            // Cal no hereda el idioma de la página: hay que pasárselo. `lang`
            // es el parámetro que usa el embed de referencia; `locale` el que
            // documenta embed-react. Se envían los dos.
            locale,
            lang: locale,
          }}
          // Sin `overflow: auto`: convertía el contenedor en una región
          // desplazable que el teclado no puede enfocar (axe
          // scrollable-region-focusable). Cal redimensiona su propio iframe.
          style={{ width: '100%', minHeight: `${minHeight}px`, colorScheme: theme }}
        />
      ) : (
        <div
          aria-hidden
          className="flex w-full items-center justify-center text-[14px] text-[var(--color-text-3)]"
          style={{ minHeight }}
        >
          {t('loading')}
        </div>
      )}
    </div>
  );
}

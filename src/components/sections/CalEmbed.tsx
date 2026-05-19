'use client';
import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect, useRef, useState } from 'react';

const CAL_LINK =
  process.env.NEXT_PUBLIC_CAL_LINK ||
  'auphere-team/diagnostico-auphere-30-min-sin-coste';

export function CalEmbed() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Defer loading of the Cal.com embed until the user is close to the section.
  // Cal's iframe + JS is heavy (~400KB) and was always loaded on first paint
  // even when the user never scrolled to it. IntersectionObserver with a
  // generous rootMargin keeps the first interaction instant when they do reach it.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
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
        cssVarsPerTheme: {
          light: {
            'cal-brand': '#03624C',
            'cal-text': '#0D0F01',
            'cal-bg': '#F1F7F6',
          },
          dark: {
            'cal-brand': '#00DF81',
            'cal-text': '#F1F7F6',
            'cal-bg': '#0D0F01',
          },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, [shouldLoad]);

  return (
    <div
      ref={containerRef}
      className="rounded-2xl overflow-hidden border border-[var(--color-bone)]/15 bg-[var(--color-bone)] shadow-2xl shadow-black/30"
      style={{ minHeight: 650 }}
    >
      {shouldLoad ? (
        <Cal
          calLink={CAL_LINK}
          config={{
            layout: 'month_view',
            theme: 'light',
          }}
          style={{ width: '100%', height: '650px', overflow: 'auto' }}
        />
      ) : (
        <div
          aria-hidden
          className="flex h-[650px] w-full items-center justify-center text-[var(--color-ink-muted)]"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: '0.08em' }}
        >
          LOADING CALENDAR…
        </div>
      )}
    </div>
  );
}

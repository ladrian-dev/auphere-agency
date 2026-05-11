'use client';
import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';
import { useLocale } from 'next-intl';

const CAL_LINK =
  process.env.NEXT_PUBLIC_CAL_LINK ||
  'auphere-team/diagnostico-auphere-30-min-sin-coste';

export function CalEmbed() {
  const locale = useLocale();

  useEffect(() => {
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
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden border border-[var(--color-bone)]/15 bg-[var(--color-bone)] shadow-2xl shadow-black/30">
      <Cal
        calLink={CAL_LINK}
        config={{
          layout: 'month_view',
          theme: 'light',
        }}
        style={{ width: '100%', height: '650px', overflow: 'auto' }}
      />
    </div>
  );
}

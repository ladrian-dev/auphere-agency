import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';

export const runtime = 'nodejs';
export const alt = 'Auphere · AI agents we build, run and improve for your team';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function TwitterImage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: 'hero' });
  const tMeta = await getTranslations({ locale, namespace: 'meta' });

  const headlineLine1 = t('headlineLine1');
  const headlineLine2 = t('headlineLine2');
  const eyebrow =
    locale === 'es'
      ? 'AGENTES DE IA · BESPOKE + MANAGED'
      : 'BESPOKE AI AGENTS · BUILT, RUN AND IMPROVED';
  const footerCta =
    locale === 'es' ? 'Reserva un diagnóstico de 30 min · auphere.com' : 'Book a 30-min diagnostic · auphere.com';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background:
            'radial-gradient(120% 90% at 100% 50%, #03624C 0%, #024236 55%, #021A14 100%)',
          color: '#F1F7F6',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em', color: '#F1F7F6' }}>
            Auphere
          </div>
          <div
            style={{
              fontSize: 16,
              letterSpacing: '0.18em',
              color: 'rgba(241,247,246,0.65)',
              fontFamily: 'monospace',
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 920 }}>
          <div style={{ fontSize: 84, fontWeight: 600, lineHeight: 1.02, letterSpacing: '-0.03em', color: '#F1F7F6' }}>
            {headlineLine1}
          </div>
          <div style={{ fontSize: 84, fontWeight: 600, lineHeight: 1.02, letterSpacing: '-0.03em', color: 'rgba(241,247,246,0.55)' }}>
            {headlineLine2}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32 }}>
          <div style={{ fontSize: 22, color: 'rgba(241,247,246,0.7)', maxWidth: 720, lineHeight: 1.3 }}>
            {tMeta('title').replace('Auphere · ', '')}
          </div>
          <div
            style={{
              fontSize: 18,
              color: '#F1F7F6',
              fontFamily: 'monospace',
              letterSpacing: '0.04em',
              textAlign: 'right',
            }}
          >
            {footerCta}
          </div>
        </div>
      </div>
    ),
    size,
  );
}

import { useTranslations } from 'next-intl';
import { Marquee } from './Marquee';

const PAIN_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5'] as const;

type NotifId = 'wa' | 'ig' | 'tel' | 'cal';
const NOTIFS: Array<{ id: NotifId; opacity: number; scale: number }> = [
  { id: 'wa', opacity: 1, scale: 1 },
  { id: 'ig', opacity: 0.85, scale: 0.98 },
  { id: 'tel', opacity: 0.7, scale: 0.96 },
  { id: 'cal', opacity: 0.55, scale: 0.94 },
];

/**
 * El problema (README §Home 2). Texto + marquesina de dolores en rojo (sentido
 * inverso) y, a la derecha, cuatro notificaciones estilo iOS con opacidad y
 * escala decrecientes.
 */
export function Problem() {
  const t = useTranslations('home.problem');

  return (
    <section className="section-y">
      <div className="container-site">
        <div className="grid grid-cols-1 items-center gap-10 desk:grid-cols-2 desk:gap-[72px]">
          <div className="max-tab:flex max-tab:flex-col max-tab:items-center max-tab:text-center">
            <p className="type-eyebrow">{t('eyebrow')}</p>
            <h2 className="type-h2 mt-3.5 max-w-[20ch] max-tab:max-w-none">{t('title')}</h2>
            <p className="type-lead mt-[18px] max-w-[44ch] max-tab:max-w-none">{t('lead')}</p>
            <Marquee
              className="mt-7"
              label={t('painsLabel')}
              items={PAIN_KEYS.map((k) => t(`pains.${k}`))}
              tone="alert"
              duration={22}
              reverse
            />
          </div>

          <div className="relative min-h-[340px] max-tab:min-h-0">
            <div
              aria-hidden
              className="absolute inset-0 blur-[30px]"
              style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(168,68,58,.18), transparent 70%)' }}
            />
            <ul className="relative mx-auto flex max-w-[380px] flex-col gap-3 max-tab:max-w-none" aria-label={t('notifsLabel')}>
              {NOTIFS.map((n) => (
                <li
                  key={n.id}
                  className="flex w-full items-center gap-3.5 rounded-2xl border border-[var(--color-line)] bg-[var(--color-card-2)] px-4 py-3.5 backdrop-blur-[10px]"
                  style={{ opacity: n.opacity, transform: `scale(${n.scale})` }}
                >
                  <NotifIcon id={n.id} />
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-[14px] font-semibold">{t(`notifs.${n.id}.title`)}</p>
                    <p className="truncate text-[13px] text-[rgba(241,247,246,.6)]">{t(`notifs.${n.id}.body`)}</p>
                  </div>
                  <span className="whitespace-nowrap text-[12px] text-[var(--color-text-4)]">{t(`notifs.${n.id}.when`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Iconos estilo app iOS (40 px, radio 11, brillo superior). */
function NotifIcon({ id }: { id: NotifId }) {
  const base = 'flex size-10 shrink-0 items-center justify-center rounded-[11px] shadow-[inset_0_1px_0_rgba(255,255,255,.25)]';
  if (id === 'wa') {
    return (
      <span className={base} style={{ background: '#25D366' }} aria-hidden>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4c1.7.7 2.1.6 2.8.5a2.5 2.5 0 0 0 1.6-1.2 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.5-.3z" />
        </svg>
      </span>
    );
  }
  if (id === 'ig') {
    return (
      <span
        className={base}
        style={{ background: 'radial-gradient(circle at 30% 107%, #FDF497 0%, #FDF497 5%, #FD5949 45%, #D6249F 60%, #285AEB 90%)' }}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.4" cy="6.6" r="1" fill="#fff" stroke="none" />
        </svg>
      </span>
    );
  }
  if (id === 'tel') {
    return (
      <span className={base} style={{ background: 'linear-gradient(180deg, #5AF175, #1FBF44)' }} aria-hidden>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff">
          <path d="M6.6 3.2c.5-.4 1.2-.3 1.6.2l2 2.7c.4.5.3 1.2-.1 1.6l-1.3 1.2c-.3.3-.4.7-.2 1a11 11 0 0 0 5.5 5.5c.3.2.7.1 1-.2l1.2-1.3c.4-.4 1.1-.5 1.6-.1l2.7 2c.5.4.6 1.1.2 1.6l-1.4 1.8c-.6.8-1.6 1.1-2.6.9C10.4 18.6 5.4 13.6 3.9 7.2c-.2-1 .1-2 .9-2.6l1.8-1.4z" />
        </svg>
      </span>
    );
  }
  return (
    <span className={base} style={{ background: '#fff' }} aria-hidden>
      <svg viewBox="0 0 40 40" width="40" height="40">
        <rect x="0" y="0" width="40" height="40" rx="11" fill="#fff" />
        <text x="20" y="12.5" textAnchor="middle" fontFamily="-apple-system, Helvena, system-ui, sans-serif" fontSize="8" fontWeight="600" fill="#FF3B30" letterSpacing=".04em">
          MAR
        </text>
        <text x="20" y="31" textAnchor="middle" fontFamily="-apple-system, Helvena, system-ui, sans-serif" fontSize="20" fontWeight="300" fill="#1C1C1E">
          12
        </text>
      </svg>
    </span>
  );
}

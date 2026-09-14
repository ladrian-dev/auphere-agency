'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MarkIcon } from '@/components/primitives/icons';
import { cn } from '@/lib/utils/cn';

/**
 * Mock de chat de WhatsApp del hero. Cuatro mensajes que «se escriben solos»:
 * indicador de escritura 1,1 s → mensaje; pausa 3,8 s; al terminar, vuelve a
 * empezar. Con `prefers-reduced-motion` se muestran los cuatro de golpe.
 */

const TYPING_MS = 1100;
const PAUSE_MS = 3800;
const RESTART_MS = 5200;

type Role = 'customer' | 'agent';
const SCRIPT: Array<{ key: 'm1' | 'm2' | 'm3' | 'm4'; role: Role }> = [
  { key: 'm1', role: 'customer' },
  { key: 'm2', role: 'agent' },
  { key: 'm3', role: 'customer' },
  { key: 'm4', role: 'agent' },
];

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

export function HeroChat() {
  const t = useTranslations('home.hero.chat');
  const reduced = useReducedMotion();
  // Cuántos mensajes están visibles y si el «siguiente» se está escribiendo.
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (reduced) return;
    let timer: number;
    if (shown >= SCRIPT.length) {
      timer = window.setTimeout(() => setShown(0), RESTART_MS);
      return () => window.clearTimeout(timer);
    }
    // pausa → indicador → mensaje
    timer = window.setTimeout(
      () => {
        setTyping(true);
        timer = window.setTimeout(() => {
          setTyping(false);
          setShown((n) => n + 1);
        }, TYPING_MS);
      },
      shown === 0 ? 600 : PAUSE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [shown, reduced]);

  const visible = reduced ? SCRIPT.length : shown;
  const next = SCRIPT[visible];

  return (
    <div
      className="relative z-[1] rounded-[28px] border border-[var(--color-line-3)] p-5 motion-safe:animate-[g-float_9s_ease-in-out_infinite]"
      style={{
        background: 'linear-gradient(180deg, rgba(241,247,246,.08), rgba(241,247,246,.03))',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,.12), 0 40px 100px -40px rgba(0,0,0,.7)',
      }}
      role="group"
      aria-label={t('label')}
    >
      <div className="flex items-center gap-3 border-b border-[var(--color-line)] pb-4">
        <div className="flex size-[38px] shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)] text-[var(--color-on-primary)]">
          <MarkIcon size={22} />
        </div>
        <div className="min-w-0 flex-1 text-left">
          <p className="text-[15px] font-semibold">{t('agent')}</p>
          <p className="truncate text-[13px] text-[var(--color-text-3)]">{t('business')}</p>
        </div>
        <span className="shrink-0 rounded-full bg-[var(--color-primary-tint)] px-2.5 py-1 text-[12px] font-medium text-[var(--color-primary)]">
          {t('status')}
        </span>
      </div>

      <ul className="mt-4 flex h-[348px] flex-col gap-2.5 overflow-hidden text-left" aria-live="polite">
        {SCRIPT.slice(0, visible).map((m) => (
          <li
            key={m.key}
            className={cn(
              'flex max-w-[86%] items-end gap-2 motion-safe:animate-[g-up_.35s_var(--ease-out)_both]',
              m.role === 'customer' ? 'self-end' : 'self-start',
            )}
          >
            {m.role === 'agent' && <AgentAvatar />}
            <p
              className={cn(
                'rounded-2xl px-3.5 py-2.5 text-[15px] leading-[1.45]',
                m.role === 'customer'
                  ? 'rounded-br-[6px] bg-[rgba(0,223,129,.16)] text-[var(--color-text)]'
                  : 'rounded-bl-[6px] bg-[rgba(241,247,246,.10)] text-[var(--color-text)]',
              )}
            >
              {t(m.key)}
            </p>
          </li>
        ))}
        {typing && next && !reduced && (
          <li
            className={cn(
              'flex items-end gap-2 motion-safe:animate-[g-up_.3s_both]',
              next.role === 'customer' ? 'self-end' : 'self-start',
            )}
            aria-label={t('typing')}
          >
            {next.role === 'agent' && <AgentAvatar />}
            <span
              className={cn(
                'flex gap-1 rounded-2xl px-3.5 py-[13px]',
                next.role === 'customer' ? 'bg-[rgba(0,223,129,.16)]' : 'bg-[rgba(241,247,246,.10)]',
              )}
            >
              {[0, 0.15, 0.3].map((delay) => (
                <span
                  key={delay}
                  className="size-1.5 rounded-full bg-[var(--color-text)] motion-safe:animate-[g-dot_1.2s_infinite]"
                  style={{ animationDelay: `${delay}s` }}
                />
              ))}
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}

function AgentAvatar() {
  return (
    <span className="flex size-[26px] shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)] text-[var(--color-on-primary)]">
      <MarkIcon size={15} />
    </span>
  );
}

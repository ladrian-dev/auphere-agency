'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { useAuphereGSAP } from '@/lib/motion/gsap';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { cn } from '@/lib/utils/cn';

type FlowKey = 'restaurant' | 'clinic' | 'ecomm';
const FLOW_KEYS: readonly FlowKey[] = ['restaurant', 'clinic', 'ecomm'] as const;

// Each flow knows how many turns it has (clinic has 5, others 4) and which
// side they come from.
const FLOW_TURNS: Record<FlowKey, readonly { from: 'them' | 'us'; id: string }[]> = {
  restaurant: [
    { from: 'them', id: 't1' },
    { from: 'us', id: 't2' },
    { from: 'them', id: 't3' },
    { from: 'us', id: 't4' },
  ],
  clinic: [
    { from: 'them', id: 't1' },
    { from: 'us', id: 't2' },
    { from: 'them', id: 't3' },
    { from: 'us', id: 't4' },
    { from: 'us', id: 't5' },
  ],
  ecomm: [
    { from: 'them', id: 't1' },
    { from: 'us', id: 't2' },
    { from: 'them', id: 't3' },
    { from: 'us', id: 't4' },
  ],
};

/**
 * Three side-by-side WhatsApp mockups (restaurant, clinic, e-commerce).
 * On desktop, the three chats render in a row. On mobile, they stack as tabs.
 */
export function WhatsappConversations({ number }: { number: string }) {
  const t = useTranslations('whatsapp.conversations');
  const [activeMobile, setActiveMobile] = useState<FlowKey>('restaurant');

  return (
    <section
      id="conversation"
      className="py-24 md:py-32 border-t border-[var(--color-ink-subtle)] bg-[var(--color-bone)]"
    >
      <SectionMarker number={number} label={t('marker.label')} meta={t('marker.meta')} />

      <Container width="wide">
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.03em]">
            {t('headline')}
          </h2>
          <p className="font-display font-medium text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.5] text-[var(--color-ink-muted)] mt-6">
            {t('intro')}
          </p>
        </div>

        {/* Desktop: three chats in a row */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
          {FLOW_KEYS.map((key) => (
            <ConversationCard key={key} flow={key} />
          ))}
        </div>

        {/* Mobile: tab switcher + single chat */}
        <div className="md:hidden">
          <div className="flex gap-2 mb-6 overflow-x-auto -mx-2 px-2">
            {FLOW_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveMobile(key)}
                className={cn(
                  'shrink-0 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors',
                  activeMobile === key
                    ? 'bg-[var(--color-bangladesh-green)] text-[var(--color-bone)]'
                    : 'bg-[var(--color-bone)] text-[var(--color-ink-muted)] border border-[var(--color-ink-subtle)]',
                )}
              >
                {t(`flows.${key}.title`)}
              </button>
            ))}
          </div>
          <ConversationCard flow={activeMobile} />
        </div>
      </Container>
    </section>
  );
}

function ConversationCard({ flow }: { flow: FlowKey }) {
  const t = useTranslations(`whatsapp.conversations.flows.${flow}`);
  const turns = FLOW_TURNS[flow];
  const figureRef = useRef<HTMLElement>(null);

  useAuphereGSAP(
    ({ reduced, gsap }) => {
      const figure = figureRef.current;
      if (!figure || reduced) return;
      const turnEls = figure.querySelectorAll<HTMLElement>('[data-chat-turn]');
      gsap.set(figure, { opacity: 0, y: 20 });
      gsap.set(turnEls, { opacity: 0, y: 8 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: figure, start: 'top 80%', once: true } });
      tl.to(figure, { opacity: 1, y: 0, duration: 0.7, ease: 'auphere', clearProps: 'transform' }).to(
        turnEls,
        { opacity: 1, y: 0, duration: 0.35, ease: 'auphere', stagger: 0.15, clearProps: 'transform' },
        0.4,
      );
    },
    { scope: figureRef },
  );

  return (
    <figure ref={figureRef} className="flex flex-col gap-3">
      <figcaption className="flex flex-col gap-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
          {t('subtitle')}
        </p>
        <h3 className="font-display font-semibold text-[15px] tracking-[-0.01em] text-[var(--color-ink)]">
          {t('title')}
        </h3>
      </figcaption>

      <div className="rounded-3xl bg-[var(--color-ink)] p-1.5 shadow-[0_24px_60px_-24px_rgba(13,15,1,0.25)]">
        {/* WhatsApp header */}
        <div className="rounded-t-[20px] bg-[#075E54] px-4 py-3 flex items-center gap-3">
          <div className="w-[36px] h-[36px] rounded-full bg-[var(--color-caribbean-green)] flex items-center justify-center text-[var(--color-ink)] font-bold text-sm">
            Au
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[13px] font-medium truncate">
              {t('businessName')}
            </p>
            <p className="text-white/70 text-[11px] truncate">
              Auphere Agent · {t('online')}
            </p>
          </div>
        </div>

        {/* Chat body */}
        <div className="bg-[#ECE5DD] p-4 space-y-2.5 min-h-[440px]">
          {turns.map((turn) => (
            <div
              key={turn.id}
              data-chat-turn
              className={cn('flex', turn.from === 'us' ? 'justify-end' : 'justify-start')}
            >
              <p
                className={cn(
                  'max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-[1.42]',
                  turn.from === 'us'
                    ? 'bg-[#DCF8C6] text-[var(--color-ink)] rounded-br-sm'
                    : 'bg-white text-[var(--color-ink)] rounded-bl-sm shadow-sm',
                )}
              >
                {t(turn.id as Parameters<typeof t>[0])}
              </p>
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}

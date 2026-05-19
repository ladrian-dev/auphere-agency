'use client';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';
import { Container } from '@/components/primitives/Container';
import { SectionMarker } from '@/components/primitives/SectionMarker';
import { cn } from '@/lib/utils/cn';
import type { VerticalConfig } from '@/lib/use-cases/verticals';

interface Props {
  config: VerticalConfig;
  number: string;
}

/**
 * Conversation demo · WhatsApp-style mockup tuned to the vertical's actual
 * dialogue patterns. Driven by the `conversationTurns` array in VerticalConfig
 * so each vertical can have 4-5 turns with the right "from" mapping.
 */
export function ConversationDemo({ config, number }: Props) {
  const t = useTranslations(`useCases.${config.slug}.conversation`);
  const tChat = useTranslations(`useCases.${config.slug}.hero.chat`);
  const reducedMotion = useReducedMotion();

  return (
    <section id="conversation" className="py-24 md:py-32 bg-[var(--color-bone)]">
      <SectionMarker number={number} label={t('marker.label')} meta={t('marker.meta')} />

      <Container width="wide">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">
          <div className="max-w-xl">
            <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.03em]">
              {t('headline')}
            </h2>
            <p className="font-display font-medium text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.5] text-[var(--color-ink-muted)] mt-6">
              {t('intro')}
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              className="w-full max-w-sm rounded-3xl bg-[var(--color-ink)] p-1.5 shadow-[0_24px_60px_-24px_rgba(13,15,1,0.25)]"
            >
              {/* WhatsApp-style header */}
              <div className="rounded-t-[20px] bg-[#075E54] px-4 py-3 flex items-center gap-3">
                <div className="w-[36px] h-[36px] rounded-full bg-[var(--color-caribbean-green)] flex items-center justify-center text-[var(--color-ink)] font-bold text-sm">
                  Au
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[14px] font-medium truncate">
                    {tChat('businessName')}
                  </p>
                  <p className="text-white/70 text-[11px] truncate">
                    {tChat('subtitle')} · {tChat('online')}
                  </p>
                </div>
              </div>

              {/* Chat body */}
              <div className="bg-[#ECE5DD] p-4 space-y-2.5 min-h-[420px]">
                {config.conversationTurns.map((turn, i) => (
                  <motion.div
                    key={turn.id}
                    initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1], delay: 0.6 + i * 0.18 }}
                    className={cn(
                      'flex',
                      turn.from === 'us' ? 'justify-end' : 'justify-start',
                    )}
                  >
                    <p
                      className={cn(
                        'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-[1.4]',
                        turn.from === 'us'
                          ? 'bg-[#DCF8C6] text-[var(--color-ink)] rounded-br-sm'
                          : 'bg-white text-[var(--color-ink)] rounded-bl-sm shadow-sm',
                      )}
                    >
                      {t(turn.id as Parameters<typeof t>[0])}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

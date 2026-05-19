'use client';
import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { Logo } from '@/components/primitives/Logo';
import { cn } from '@/lib/utils/cn';

/**
 * Floating centered pill nav with **scroll-direction-aware** collapse —
 * pattern lifted from andresmatos.framer.ai (and used by Linear, Vercel,
 * Arc to similar effect).
 *
 * State machine:
 *   · scrollY < EXPAND_THRESHOLD                       → expanded
 *   · scrolling DOWN past COLLAPSE_THRESHOLD           → collapsed
 *   · scrolling UP at any position                     → expanded
 *
 * The pill morphs width (spring), fades the link cluster + locale switcher
 * out, fades a "•••" indicator in. The CTA stays present always because it
 * is the primary conversion element on this site (the reference doesn't
 * keep one because it's a personal portfolio, but for B2B SaaS the CTA
 * must remain reachable).
 */

const EXPAND_THRESHOLD = 40; // below this, always expanded
const COLLAPSE_THRESHOLD = 80; // must pass this when scrolling down to collapse

export function Nav() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  // collapsedByScroll = the "should be collapsed" state derived from scroll.
  // The actually-rendered collapsed flag also factors in hover — when the
  // user hovers the collapsed pill we re-expand it temporarily so they can
  // see the full nav without scrolling back up.
  const [collapsedByScroll, setCollapsedByScroll] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const collapsed = collapsedByScroll && !isHovered;

  const lastY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = lastY.current;
    const delta = current - previous;

    // Ignore micro-jitter to avoid flicker on rubber-band scrolling.
    if (Math.abs(delta) < 4) return;

    const direction: 'down' | 'up' = delta > 0 ? 'down' : 'up';

    if (current < EXPAND_THRESHOLD) {
      setCollapsedByScroll(false);
    } else if (direction === 'down' && current > COLLAPSE_THRESHOLD) {
      setCollapsedByScroll(true);
    } else if (direction === 'up') {
      setCollapsedByScroll(false);
    }

    lastY.current = current;
  });

  const otherLocale = locale === 'en' ? 'es' : 'en';

  // Anchor links must point to the landing root from any inner page (about, privacy, ...).
  // On the landing itself, `/{locale}#xxx` still resolves to a same-page hash navigation.
  const landingHash = (hash: string) => `/${locale}${hash}`;

  // Slower, more graceful spring — less abrupt morph than a snappy stiff one.
  // The pill takes ~600-700ms to settle, matching the more luxurious feel of
  // the andresmatos.framer.ai reference.
  const springTransition = reducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 220, damping: 30, mass: 0.95 };

  // Apple-style cubic for the children — pairs cleanly with the spring without
  // fighting it.
  const easeOut = [0.32, 0.72, 0, 1] as const;

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none px-4 pt-4 md:pt-5"
      aria-label="Primary navigation"
    >
      <motion.div
        layout
        transition={springTransition}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={cn(
          'pointer-events-auto h-[56px] flex items-center gap-1 pl-2 pr-2',
          'rounded-full bg-[var(--color-bone)]/85 backdrop-blur-xl',
          'border border-[var(--color-ink-subtle)]',
          'shadow-[0_10px_40px_-12px_rgba(13,15,1,0.18)]',
        )}
      >
        {/* Logo — always visible. Sits in its own pill area on the left. */}
        <Link
          href="/"
          className="flex items-center pl-2 pr-3 h-full shrink-0"
          aria-label="Auphere"
        >
          <Logo height={22} priority />
        </Link>

        {/* Center cluster — swaps between full nav links (expanded) and an
            animated "•••" indicator (collapsed).
            The crossfade is parallel (no mode="wait"), and BOTH variants
            translate from the right on entry / to the right on exit. This
            sells the perception that the right side of the pill is unfolding
            (matches the andresmatos reference) while the logo on the left
            stays anchored. */}
        <div className="flex items-center justify-center min-w-0 overflow-hidden">
          <AnimatePresence initial={false}>
            {collapsed ? (
              <motion.div
                key="dots"
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 14 }}
                transition={{ duration: 0.32, ease: easeOut }}
                className="hidden md:flex items-center gap-[6px] px-3"
                aria-hidden
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-[6px] h-[6px] rounded-full bg-[var(--color-ink)]"
                    animate={
                      reducedMotion
                        ? { opacity: 0.7 }
                        : {
                            scale: [1, 1.45, 1],
                            opacity: [0.45, 1, 0.45],
                          }
                    }
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : {
                            duration: 1.3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.18,
                            repeatDelay: 0.3,
                          }
                    }
                  />
                ))}
              </motion.div>
            ) : (
              <motion.nav
                key="links"
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 28 }}
                transition={{ duration: 0.36, ease: easeOut }}
                aria-label="Sections"
                className="hidden md:flex items-center gap-6 text-[14px] text-[var(--color-ink-muted)] px-4 whitespace-nowrap"
              >
                <a href={landingHash('#how')} className="hover:text-[var(--color-ink)] transition-colors">
                  {t('howItWorks')}
                </a>
                <Link href="/use-cases" className="hover:text-[var(--color-ink)] transition-colors">
                  {t('useCases')}
                </Link>
                <a href={landingHash('#pricing')} className="hover:text-[var(--color-ink)] transition-colors">
                  {t('pricing')}
                </a>
                <a href={landingHash('#faq')} className="hover:text-[var(--color-ink)] transition-colors">
                  {t('faq')}
                </a>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>

        {/* Right side — locale switcher fades with the links, CTA stays. */}
        <div className="flex items-center gap-2 shrink-0">
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                key="locale"
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 18 }}
                transition={{ duration: 0.32, ease: easeOut }}
                className="hidden md:flex items-center"
              >
                <Link
                  href={pathname}
                  locale={otherLocale}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors px-2 whitespace-nowrap"
                  aria-label={`Switch to ${otherLocale.toUpperCase()}`}
                >
                  {locale.toUpperCase()}
                  <span className="text-[var(--color-ink-subtle)] mx-1">·</span>
                  {otherLocale.toUpperCase()}
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA — always visible, sits as a nested pill (Andres Matos pattern). */}
          <a
            href={landingHash('#book')}
            className={cn(
              'inline-flex items-center justify-center h-[40px] px-[18px]',
              'rounded-full font-medium text-[13px] tracking-tight whitespace-nowrap',
              'bg-[var(--color-ink)] text-[var(--color-bone)]',
              'hover:bg-[var(--color-bangladesh-green)]',
              'transition-[background-color,transform] duration-200 ease-out active:scale-[0.97]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-bangladesh-green)]',
            )}
          >
            {t('cta')}
          </a>
        </div>
      </motion.div>
    </header>
  );
}

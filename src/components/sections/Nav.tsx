'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, Link } from '@/i18n/navigation';
import { Logo } from '@/components/primitives/Logo';
import { cn } from '@/lib/utils/cn';
import { useAuphereGSAP, gsap, ScrollTrigger } from '@/lib/motion/gsap';

/**
 * Nav v3 (§6.0.1) — lineal horizontal Attio-style, no pill flotante.
 *
 * · Mega-menú (A-02): panel con opacidad+desplazamiento y columnas en
 *   stagger 0.04 (GSAP, ease auphere, 0.32 s; cierre 0.2 s). Cierra con
 *   Escape y al perder el foco; aria-expanded/aria-controls.
 * · Sticky condensado: un único ScrollTrigger alterna data-condensed y el
 *   CSS transiciona 72→56 px.
 * · Mobile: drawer full-screen con grupos en acordeón y CTA fijo abajo.
 * · "Precios" entra al nav cuando cierre el informe de pricing (Fase 6).
 */

type MenuId = 'platform' | 'solutions' | 'partners';

interface MenuItem {
  key: string;
  href: string;
}

const MENUS: Record<MenuId, MenuItem[]> = {
  platform: [
    { key: 'platformWhat', href: '/platform' },
    { key: 'platformSecurity', href: '/platform/security' },
    { key: 'platformTrust', href: '/trust' },
  ],
  solutions: [
    { key: 'solutionsSectors', href: '/use-cases' },
    { key: 'solutionsWhatsapp', href: '/whatsapp-ai-agent' },
  ],
  partners: [
    { key: 'partnersJoin', href: '/partners' },
    { key: 'partnersEmbedded', href: '/partners/embedded' },
    { key: 'partnersDocs', href: '/docs' },
  ],
};

const MENU_IDS: MenuId[] = ['platform', 'solutions', 'partners'];

export function Nav() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const otherLocale = locale === 'en' ? 'es' : 'en';
  const landingHash = (hash: string) => `/${locale}${hash}`;

  // ── Sticky condensado: un solo ScrollTrigger, solo alterna un atributo ──
  useAuphereGSAP(({ gsap: g }) => {
    const header = headerRef.current;
    if (!header) return;
    ScrollTrigger.create({
      start: 80,
      onToggle: (self) => {
        header.dataset.condensed = self.isActive ? 'true' : 'false';
      },
    });
    void g;
  });

  // ── Mega-menú: animación A-02 al abrir ──
  useAuphereGSAP(
    ({ reduced, gsap: g }) => {
      const panel = panelRef.current;
      if (!panel || !openMenu) return;
      if (reduced) {
        g.set(panel, { opacity: 1, y: 0 });
        return;
      }
      const items = panel.querySelectorAll('[data-menu-item]');
      g.fromTo(panel, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.32, ease: 'auphere' });
      g.fromTo(items, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.32, ease: 'auphere', stagger: 0.04 });
    },
    { dependencies: [openMenu] },
  );

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 160);
  }, []);
  const cancelClose = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  }, []);

  // Escape cierra menú y drawer; el drawer bloquea el scroll del body.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenu(null);
        setDrawerOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [drawerOpen]);

  // Cierra el menú al navegar (ajuste de estado derivado en render — patrón React).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenMenu(null);
    setDrawerOpen(false);
  }

  const menuLabel = (id: MenuId) =>
    id === 'platform' ? t('platform') : id === 'solutions' ? t('solutions') : t('partnersMenu');

  return (
    <header
      ref={headerRef}
      data-condensed="false"
      className="fixed top-0 inset-x-0 z-50 group/nav"
      aria-label="Primary navigation"
      onMouseLeave={scheduleClose}
    >
      <div
        className={cn(
          'relative bg-[var(--color-bone)]/90 backdrop-blur-xl border-b border-[var(--color-ink-subtle)]',
          'transition-[box-shadow] duration-300',
          'group-data-[condensed=true]/nav:shadow-[0_8px_30px_-12px_rgba(13,15,1,0.12)]',
        )}
      >
        <div
          className={cn(
            'mx-auto max-w-[1400px] px-4 md:px-8 flex items-center justify-between gap-4',
            'h-[64px] md:h-[72px] transition-[height] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
            'group-data-[condensed=true]/nav:h-[56px] motion-reduce:transition-none',
          )}
        >
          <Link href="/" className="flex items-center shrink-0" aria-label="Auphere">
            <Logo height={22} priority />
          </Link>

          {/* Desktop groups */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Sections">
            {MENU_IDS.map((id) => (
              <button
                key={id}
                type="button"
                aria-expanded={openMenu === id}
                aria-controls={`nav-panel-${id}`}
                onMouseEnter={() => {
                  cancelClose();
                  setOpenMenu(id);
                }}
                onClick={() => setOpenMenu((current) => (current === id ? null : id))}
                className={cn(
                  'flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[14px] transition-colors',
                  openMenu === id
                    ? 'text-[var(--color-ink)] bg-[var(--color-ink-faint)]'
                    : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]',
                )}
              >
                {menuLabel(id)}
                <svg
                  aria-hidden
                  viewBox="0 0 10 6"
                  className={cn('w-2.5 h-1.5 transition-transform duration-200', openMenu === id && 'rotate-180')}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                >
                  <path d="M1 1l4 4 4-4" />
                </svg>
              </button>
            ))}
            <Link
              href="/enterprise"
              className="px-3.5 py-2 rounded-full text-[14px] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
            >
              {t('enterprise')}
            </Link>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={pathname}
              locale={otherLocale}
              className="hidden md:block type-meta text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors px-2 whitespace-nowrap"
              aria-label={`Switch to ${otherLocale.toUpperCase()}`}
            >
              {locale.toUpperCase()}
              <span className="text-[var(--color-ink-subtle)] mx-1">·</span>
              {otherLocale.toUpperCase()}
            </Link>

            <a
              href={landingHash('#book')}
              className={cn(
                'inline-flex items-center justify-center h-[40px] px-[18px]',
                'rounded-full font-medium text-[14px] tracking-tight whitespace-nowrap',
                'bg-[var(--color-ink)] text-[var(--color-bone)] hover:bg-[var(--color-bangladesh-green)]',
                'transition-[background-color,transform] duration-200 ease-out active:scale-[0.97]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-bangladesh-green)]',
              )}
            >
              {t('cta')}
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--color-ink-subtle)] text-[var(--color-ink)]"
              aria-expanded={drawerOpen}
              aria-label={drawerOpen ? t('closeMenu') : t('openMenu')}
              onClick={() => setDrawerOpen((v) => !v)}
            >
              <svg viewBox="0 0 18 14" className="w-4 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                {drawerOpen ? <path d="M2 2l14 10M16 2L2 12" /> : <path d="M1 1h16M1 7h16M1 13h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* ── Mega-menú desktop ── */}
        {openMenu && (
          <div
            ref={panelRef}
            id={`nav-panel-${openMenu}`}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className="hidden lg:block absolute inset-x-0 top-full bg-[var(--color-bone)]/95 backdrop-blur-xl border-b border-[var(--color-ink-subtle)] shadow-[0_24px_60px_-24px_rgba(13,15,1,0.18)]"
          >
            <div className="mx-auto max-w-[1400px] px-8 py-8 grid grid-cols-3 gap-6">
              {MENUS[openMenu].map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  data-menu-item
                  className="group/item rounded-xl p-4 -m-1 hover:bg-[var(--color-ink-faint)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-bangladesh-green)]"
                >
                  <p className="font-display font-semibold text-[15px] tracking-[-0.01em] text-[var(--color-ink)] group-hover/item:text-[var(--color-bangladesh-green)] transition-colors">
                    {t(`menu.${item.key}.label` as Parameters<typeof t>[0])}
                  </p>
                  <p className="text-[14px] text-[var(--color-ink-muted)] mt-1 leading-snug">
                    {t(`menu.${item.key}.desc` as Parameters<typeof t>[0])}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Drawer mobile ── */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 top-[64px] bg-[var(--color-bone)] flex flex-col overflow-y-auto">
          <nav className="flex-1 px-6 py-6 flex flex-col gap-1" aria-label="Sections">
            {MENU_IDS.map((id) => (
              <MobileGroup key={id} label={menuLabel(id)} items={MENUS[id]} t={t} />
            ))}
            <Link
              href="/enterprise"
              className="py-4 border-b border-[var(--color-ink-subtle)] font-display font-semibold text-[18px] text-[var(--color-ink)]"
            >
              {t('enterprise')}
            </Link>
            <Link
              href={pathname}
              locale={otherLocale}
              className="py-4 type-meta text-[var(--color-ink-muted)]"
            >
              {locale.toUpperCase()} → {otherLocale.toUpperCase()}
            </Link>
          </nav>
          <div className="sticky bottom-0 p-5 bg-[var(--color-bone)] border-t border-[var(--color-ink-subtle)]">
            <a
              href={landingHash('#book')}
              className="flex items-center justify-center h-[52px] rounded-full font-medium text-[15px] bg-[var(--color-ink)] text-[var(--color-bone)] active:scale-[0.98] transition-transform"
            >
              {t('cta')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function MobileGroup({
  label,
  items,
  t,
}: {
  label: string;
  items: MenuItem[];
  t: ReturnType<typeof useTranslations<'nav'>>;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--color-ink-subtle)]">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 font-display font-semibold text-[18px] text-[var(--color-ink)]"
      >
        {label}
        <svg
          aria-hidden
          viewBox="0 0 10 6"
          className={cn('w-3 h-2 transition-transform duration-200', open && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="pb-4 flex flex-col gap-3">
            {items.map((item) => (
              <Link key={item.key} href={item.href} className="text-[15px] text-[var(--color-ink-muted)]">
                {t(`menu.${item.key}.label` as Parameters<typeof t>[0])}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

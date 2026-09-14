'use client';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Logo } from '@/components/primitives/Logo';
import { BurgerIcon, GlobeIcon } from '@/components/primitives/icons';
import { cn } from '@/lib/utils/cn';
import { track } from '@/lib/analytics';
import { AGENDA_HASH, LEGAL_SLUGS, PAGES_WITH_AGENDA } from '@/lib/site';

/**
 * Header píldora fijo (README §Componentes globales).
 *
 * · Píldora 1200 × 60 px, `rgba(3,34,33,.72)` + blur 20, borde .10.
 * · Izquierda logo bone 30 px; centro (≥1100 px) enlaces 15 px; derecha
 *   selector de idioma (listbox ES/EN), CTA «Agenda ahora» → `#agenda` y
 *   hamburguesa (<1100 px).
 * · Menú móvil: overlay `.96` blur 24, enlaces 24 px 500 con hairline y CTA
 *   de 54 px al pie. Escape cierra; el body no hace scroll mientras está abierto.
 * · El selector navega a la ruta equivalente del otro idioma y guarda la
 *   preferencia en `localStorage.au_lang`.
 */

const LANG_KEY = 'au_lang';

type Locale = 'es' | 'en';

function counterpartPath(pathname: string, target: Locale): string {
  // Las rutas legales tienen slug distinto por idioma; el resto es idéntico.
  for (const slugs of Object.values(LEGAL_SLUGS)) {
    if (pathname === `/${slugs.es}` || pathname === `/${slugs.en}`) return `/${slugs[target]}`;
  }
  return pathname;
}

export function SiteHeader() {
  const t = useTranslations('site.header');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const otherLocale: Locale = locale === 'es' ? 'en' : 'es';
  const listboxId = useId();
  const langRef = useRef<HTMLDivElement>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const home = `/${locale}`;
  const hash = (id: string) => `${home}#${id}`;
  const ctaHref = PAGES_WITH_AGENDA.has(pathname) ? AGENDA_HASH : `${home}${AGENDA_HASH}`;
  const otherHref = `/${otherLocale}${counterpartPath(pathname, otherLocale) === '/' ? '' : counterpartPath(pathname, otherLocale)}`;

  // Escape cierra ambos; el overlay bloquea el scroll del documento.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLangOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [menuOpen]);

  // Clic fuera cierra el selector de idioma.
  useEffect(() => {
    if (!langOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!langRef.current?.contains(event.target as Node)) setLangOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [langOpen]);

  // Cierra al navegar (estado derivado en render — patrón React).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setLangOpen(false);
    setMenuOpen(false);
  }

  const onLangPick = useCallback(
    (picked: Locale) => {
      try {
        window.localStorage.setItem(LANG_KEY, picked);
      } catch {
        /* almacenamiento no disponible: la navegación sigue funcionando */
      }
      if (picked !== locale) track('lang_switch', { from: locale, to: picked });
      setLangOpen(false);
    },
    [locale],
  );

  const onCta = useCallback(() => {
    track('cta_click', { section: 'header', page: pathname });
    setMenuOpen(false);
  }, [pathname]);

  const isCurrent = (route: string) => pathname === route;

  const navLink = (label: string, href: string, current = false) => (
    <a
      href={href}
      aria-current={current ? 'page' : undefined}
      className={cn(
        'whitespace-nowrap rounded-full px-[14px] py-2 text-[15px] transition-colors duration-200',
        current
          ? 'bg-[rgba(241,247,246,.08)] text-[var(--color-text)]'
          : 'text-[var(--color-text-2)] hover:bg-[rgba(241,247,246,.06)] hover:text-[var(--color-text)]',
      )}
    >
      {label}
    </a>
  );

  return (
    <>
      <header
        className={cn(
          'pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center',
          'px-4 pt-[14px] pb-[14px]',
          'max-tab:px-3 max-tab:pt-[calc(env(safe-area-inset-top,0px)+14px)] max-tab:pb-[10px]',
        )}
      >
        <div
          className={cn(
            'pointer-events-auto flex h-[60px] w-full max-w-[1200px] items-center justify-between gap-4',
            'rounded-full border border-[var(--color-line)] bg-[rgba(3,34,33,.72)] pl-5 pr-[10px] backdrop-blur-[20px]',
            'max-tab:h-[56px] max-tab:gap-2 max-tab:pl-[14px] max-tab:pr-2',
            'max-[420px]:gap-1.5 max-[420px]:pl-3 max-[420px]:pr-1.5',
          )}
        >
          <Link href="/" aria-label="Auphere" className="flex shrink-0 items-center">
            <Logo variant="bone" height={30} priority className="max-tab:!h-6" />
          </Link>

          <nav className="hidden items-center gap-1 nav:flex" aria-label={t('sections')}>
            {navLink(t('how'), hash('como'))}
            {navLink(t('skills'), hash('funciones'))}
            <Link
              href="/partners"
              aria-current={isCurrent('/partners') ? 'page' : undefined}
              className={cn(
                'whitespace-nowrap rounded-full px-[14px] py-2 text-[15px] transition-colors duration-200',
                isCurrent('/partners')
                  ? 'bg-[rgba(241,247,246,.08)] text-[var(--color-text)]'
                  : 'text-[var(--color-text-2)] hover:bg-[rgba(241,247,246,.06)] hover:text-[var(--color-text)]',
              )}
            >
              {t('partners')}
            </Link>
            <Link
              href="/enterprise"
              aria-current={isCurrent('/enterprise') ? 'page' : undefined}
              className={cn(
                'whitespace-nowrap rounded-full px-[14px] py-2 text-[15px] transition-colors duration-200',
                isCurrent('/enterprise')
                  ? 'bg-[rgba(241,247,246,.08)] text-[var(--color-text)]'
                  : 'text-[var(--color-text-2)] hover:bg-[rgba(241,247,246,.06)] hover:text-[var(--color-text)]',
              )}
            >
              {t('enterprise')}
            </Link>
          </nav>

          <div className="flex items-center gap-2 max-[420px]:gap-1.5">
            {/* Selector de idioma */}
            <div ref={langRef} className="relative">
              <button
                type="button"
                aria-label={t('language')}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                aria-controls={listboxId}
                onClick={() => setLangOpen((v) => !v)}
                className={cn(
                  'inline-flex size-[42px] items-center justify-center rounded-full border border-[var(--color-line-3)]',
                  'text-[rgba(241,247,246,.85)] transition-[border-color,color] duration-200',
                  'hover:border-[rgba(241,247,246,.4)] hover:text-[var(--color-text)]',
                  'max-[420px]:size-[38px]',
                )}
              >
                <GlobeIcon />
              </button>
              {langOpen && (
                <ul
                  id={listboxId}
                  role="listbox"
                  aria-label={t('language')}
                  className={cn(
                    'absolute right-0 top-[calc(100%+10px)] m-0 flex min-w-[160px] list-none flex-col gap-0.5 p-1.5',
                    'rounded-[14px] border border-[var(--color-line-2)] bg-[rgba(3,34,33,.96)] shadow-[var(--shadow-pop)] backdrop-blur-[20px]',
                    'motion-safe:animate-[g-up_.2s_var(--ease-out)_both]',
                  )}
                >
                  {(['es', 'en'] as const).map((code) => {
                    const active = code === locale;
                    return (
                      <li key={code}>
                        <a
                          role="option"
                          aria-selected={active}
                          href={active ? undefined : otherHref}
                          hrefLang={code}
                          lang={code}
                          onClick={() => onLangPick(code)}
                          className={cn(
                            'flex w-full items-center justify-between gap-3 rounded-[9px] px-3 py-2.5 text-left text-[15px] transition-colors',
                            active
                              ? 'bg-[var(--color-primary-tint)] text-[var(--color-primary)]'
                              : 'text-[rgba(241,247,246,.85)] hover:bg-[rgba(241,247,246,.06)] hover:text-[var(--color-text)]',
                          )}
                        >
                          <span>{code === 'es' ? t('languageEs') : t('languageEn')}</span>
                          <span className="text-[12px] text-[rgba(241,247,246,.5)]">{code.toUpperCase()}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <a
              href={ctaHref}
              onClick={onCta}
              className={cn(
                'btn btn-primary btn-nav',
                'hover:!shadow-[var(--shadow-cta-sm)]',
                'max-tab:h-10 max-tab:px-[14px] max-tab:text-[14px]',
                'max-[420px]:px-3 max-[420px]:text-[13px]',
              )}
            >
              {t('cta')}
            </a>

            <button
              type="button"
              aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen((v) => !v)}
              className={cn(
                'inline-flex size-[42px] items-center justify-center rounded-full border border-[var(--color-line-3)] nav:hidden',
                'max-[420px]:size-[38px]',
              )}
            >
              <BurgerIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t('menu')}
          className={cn(
            'fixed inset-0 z-40 flex flex-col gap-1.5 overflow-auto nav:hidden',
            'bg-[rgba(3,34,33,.96)] backdrop-blur-[24px]',
            'px-6 pb-8 pt-[calc(env(safe-area-inset-top,0px)+100px)]',
            'motion-safe:animate-[g-up_.3s_var(--ease-out)_both]',
          )}
        >
          <MobileLink href={home} onClick={() => setMenuOpen(false)} current={pathname === '/'}>
            {t('home')}
          </MobileLink>
          <MobileLink href={hash('funciones')} onClick={() => setMenuOpen(false)}>
            {t('features')}
          </MobileLink>
          <MobileLink href={hash('como')} onClick={() => setMenuOpen(false)}>
            {t('how')}
          </MobileLink>
          <MobileLink href={hash('precio')} onClick={() => setMenuOpen(false)}>
            {t('pricing')}
          </MobileLink>
          <MobileLink href={`${home}/partners`} onClick={() => setMenuOpen(false)} current={isCurrent('/partners')}>
            {t('partners')}
          </MobileLink>
          <MobileLink href={`${home}/enterprise`} onClick={() => setMenuOpen(false)} current={isCurrent('/enterprise')}>
            {t('enterprise')}
          </MobileLink>
          <MobileLink href={hash('faq')} onClick={() => setMenuOpen(false)}>
            {t('faq')}
          </MobileLink>
          <a href={ctaHref} onClick={onCta} className="btn btn-primary mt-auto h-[54px] shrink-0 text-[16px]">
            {t('cta')}
          </a>
        </div>
      )}
    </>
  );
}

function MobileLink({
  href,
  current,
  onClick,
  children,
}: {
  href: string;
  current?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={current ? 'page' : undefined}
      className={cn(
        'shrink-0 border-b border-[var(--color-line)] px-2 py-4 text-[24px] font-medium',
        current ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)]',
      )}
    >
      {children}
    </a>
  );
}

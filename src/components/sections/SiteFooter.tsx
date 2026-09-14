import { useLocale, useTranslations } from 'next-intl';
import { Logo } from '@/components/primitives/Logo';
import { SocialIcon } from '@/components/primitives/icons';
import { CONTACT_EMAIL, SOCIAL_PROFILES, legalPath } from '@/lib/site';

/**
 * Footer global (README §Componentes globales): marca + redes, Páginas,
 * Recursos, Legal y Contacto. En móvil las columnas se apilan centradas.
 */
export function SiteFooter() {
  const t = useTranslations('site.footer');
  const locale = useLocale();
  const home = `/${locale}`;

  return (
    <footer className="border-t border-[rgba(241,247,246,.08)] pt-16 pb-10 max-tab:pt-12 max-tab:pb-8">
      <div className="container-site">
        <div
          className={
            'grid grid-cols-1 gap-10 max-tab:justify-items-center max-tab:gap-8 max-tab:text-center ' +
            'tab:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_repeat(4,minmax(0,1fr))]'
          }
        >
          <div className="min-w-0 tab:col-span-2 lg:col-span-1">
            <Logo variant="bone" height={28} className="max-tab:mx-auto" />
            <p className="mt-4 max-w-[34ch] text-[15px] leading-[1.55] text-[rgba(241,247,246,.62)] max-tab:mx-auto">
              {t('tagline')}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2.5 max-tab:justify-center" aria-label={t('social')}>
              {SOCIAL_PROFILES.map((profile) => (
                <li key={profile.id}>
                  <a
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={profile.label}
                    className={
                      'flex size-10 items-center justify-center rounded-full border border-[var(--color-line-3)] ' +
                      'text-[rgba(241,247,246,.8)] transition-[border-color,color] duration-200 ' +
                      'hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                    }
                  >
                    <SocialIcon id={profile.id} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn title={t('pages')}>
            <FooterLink href={home}>{t('home')}</FooterLink>
            <FooterLink href={`${home}/partners`}>{t('partners')}</FooterLink>
            <FooterLink href={`${home}/enterprise`}>{t('enterprise')}</FooterLink>
          </FooterColumn>

          <FooterColumn title={t('resources')}>
            <FooterLink href={`${home}#funciones`}>{t('skills')}</FooterLink>
            <FooterLink href={`${home}#como`}>{t('how')}</FooterLink>
          </FooterColumn>

          <FooterColumn title={t('legal')}>
            <FooterLink href={legalPath(locale, 'privacy')}>{t('privacy')}</FooterLink>
            <FooterLink href={legalPath(locale, 'terms')}>{t('terms')}</FooterLink>
            <FooterLink href={legalPath(locale, 'security')}>{t('security')}</FooterLink>
          </FooterColumn>

          <FooterColumn title={t('contact')}>
            <FooterLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</FooterLink>
            <FooterLink href={`${home}#agenda`}>{t('book')}</FooterLink>
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3 border-t border-[rgba(241,247,246,.08)] pt-6 text-center text-[13px] text-[rgba(241,247,246,.5)]">
          <span>{t('rights')}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="mb-3.5 text-[14px] font-semibold text-[var(--color-text)]">{title}</p>
      <ul className="flex flex-col gap-2.5 text-[15px] text-[rgba(241,247,246,.7)] max-tab:items-center">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a href={href} className="transition-colors duration-200 hover:text-[var(--color-primary)]">
        {children}
      </a>
    </li>
  );
}

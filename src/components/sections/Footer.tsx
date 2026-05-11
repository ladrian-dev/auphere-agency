import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { Logo } from '@/components/primitives/Logo';
import { Link } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-ink-subtle)] py-16 md:py-20">
      <Container width="wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5">
            <Logo height={36} />
            <p className="text-[15px] text-[var(--color-ink-muted)] mt-5 max-w-sm leading-relaxed">
              {t('tagline')}
            </p>
            <div className="flex gap-3 mt-6">
              <SocialLink
                href="https://linkedin.com/company/somos-auphere"
                label="LinkedIn"
              >
                <LinkedInIcon />
              </SocialLink>
              <SocialLink
                href="https://instagram.com/somos.auphere"
                label="Instagram"
              >
                <InstagramIcon />
              </SocialLink>
              <SocialLink
                href="https://tiktok.com/@somos.auphere"
                label="TikTok"
              >
                <TikTokIcon />
              </SocialLink>
            </div>
          </div>

          <FooterColumn title={t('product.title')} className="md:col-span-2">
            <FooterLink href="#how">{t('product.how')}</FooterLink>
            <FooterLink href="#pricing">{t('product.pricing')}</FooterLink>
            {/* <FooterLink href="#cases">{t('product.cases')}</FooterLink> — re-enable with Cases section */}
            <FooterLink href="#faq">{t('product.faq')}</FooterLink>
          </FooterColumn>

          <FooterColumn title={t('company.title')} className="md:col-span-2">
            <FooterLink href="#book">{t('company.contact')}</FooterLink>
            <FooterLink href={`/${locale}/about`}>{t('company.about')}</FooterLink>
          </FooterColumn>

          <FooterColumn title={t('legal.title')} className="md:col-span-3">
            <FooterLink href={`/${locale}/privacy`}>{t('legal.privacy')}</FooterLink>
            <FooterLink href={`/${locale}/terms`}>{t('legal.terms')}</FooterLink>
            <FooterLink href={`/${locale}/trust`}>{t('legal.trust')}</FooterLink>
          </FooterColumn>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--color-ink-subtle)] text-[13px] text-[var(--color-ink-muted)]">
          <p>© {year} Auphere</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)] mb-4">
        {title}
      </p>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  // External or anchor links use plain <a>; same-locale routes can also use <a> safely.
  return (
    <li>
      <a
        href={href}
        className="text-[15px] text-[var(--color-ink)] hover:text-[var(--color-bangladesh-green)] transition-colors"
      >
        {children}
      </a>
    </li>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="w-[40px] h-[40px] shrink-0 rounded-full border border-[var(--color-ink-subtle)] flex items-center justify-center text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink-dim)] transition-colors"
    >
      {children}
    </a>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[16px] h-[16px]" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S0 4.881 0 3.5C0 2.12 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.27 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.48 3.04 5.48 6.99V22h-4.56v-6.83c0-1.63-.03-3.73-2.27-3.73-2.27 0-2.62 1.77-2.62 3.6V22H7.49V8z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-[16px] h-[16px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[16px] h-[16px]" fill="currentColor" aria-hidden>
      <path d="M19.5 8.4a6.4 6.4 0 0 1-3.8-1.2v7.6a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.7a2.9 2.9 0 1 0 2 2.8V2h2.7a3.7 3.7 0 0 0 3.8 3.7v2.7Z" />
    </svg>
  );
}

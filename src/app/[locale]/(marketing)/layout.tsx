import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SiteHeader } from '@/components/sections/SiteHeader';
import { SiteFooter } from '@/components/sections/SiteFooter';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * Shell de las páginas heredadas (v3, superficie clara). Comparten el header
 * píldora y el footer del rediseño, pero su contenido sigue leyendo sobre
 * bone hasta que se rediseñen, así que el `main` fija esa superficie.
 */
export default async function MarketingLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <SiteHeader solid />
      <main id="main" className="surface-light">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

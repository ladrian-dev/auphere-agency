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
 * Shell del rediseño (Home, Partners, Enterprise, legales): header píldora
 * fijo, contenido sobre el fondo profundo y footer global.
 */
export default async function SiteLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}

import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { GradientLine } from "@/components/primitives/GradientLine";

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function MarketingLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <GradientLine position="top" />
      <Nav />
      <main id="main">{children}</main>
      <Footer />
      <GradientLine position="bottom" />
    </>
  );
}

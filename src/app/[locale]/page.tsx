import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale, type Locale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Nav } from '@/components/sections/Nav';
import { Hero } from '@/components/sections/Hero';
import { HowWeWork } from '@/components/sections/HowWeWork';
import { PullQuote } from '@/components/sections/PullQuote';
// import { Cases } from '@/components/sections/Cases'; // TODO: re-enable once we have a real case to publish
import { WhyAuphere } from '@/components/sections/WhyAuphere';
import { Pricing } from '@/components/sections/Pricing';
import { Qualifier } from '@/components/sections/Qualifier';
import { Faq } from '@/components/sections/Faq';
import { FaqJsonLd } from '@/components/sections/FaqJsonLd';
import { getFaqItems } from '@/components/sections/faq-utils';
import { FinalCta } from '@/components/sections/FinalCta';
import { Footer } from '@/components/sections/Footer';
import { GradientLine } from '@/components/primitives/GradientLine';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  // FAQ items resolved server-side so we can inject FAQPage JSON-LD with content
  const tFaq = await getTranslations({ locale: locale as Locale, namespace: 'faq' });
  const faqItems = getFaqItems((key) => tFaq(key as Parameters<typeof tFaq>[0]));

  return (
    <>
      <GradientLine position="top" />
      <Nav />
      <main id="main">
        <Hero />
        <HowWeWork />
        <PullQuote />
        {/* <Cases /> — temporarily hidden, will re-enable when first real case is approved */}
        <WhyAuphere />
        <Pricing />
        <Qualifier />
        <FaqJsonLd items={faqItems} />
        <Faq items={faqItems} />
        <FinalCta />
      </main>
      <Footer />
      <GradientLine position="bottom" />
    </>
  );
}

import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale, type Locale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Nav } from '@/components/sections/Nav';
import { Hero } from '@/components/sections/Hero';
import { StepPin } from '@/components/sections/StepPin';
import { AudienceSwitch } from '@/components/sections/AudienceSwitch';
import { CapabilitiesBento } from '@/components/sections/CapabilitiesBento';
import { PullQuote } from '@/components/sections/PullQuote';
// import { Cases } from '@/components/sections/Cases'; // TODO: re-enable once we have a real case to publish
import { WhyAuphere } from '@/components/sections/WhyAuphere';
import { Qualifier } from '@/components/sections/Qualifier';
import { Faq } from '@/components/sections/Faq';
import { FaqJsonLd } from '@/components/sections/FaqJsonLd';
import { getFaqItems } from '@/components/sections/faq-utils';
import { FinalCta } from '@/components/sections/FinalCta';
import { Footer } from '@/components/sections/Footer';
import { GradientLine } from '@/components/primitives/GradientLine';
import { HomeNarrative, NarrativeAct } from '@/components/motion/narrative/HomeNarrative';

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
        {/* §6.2 — Los cuatro actos comparten un solo plano que se reconfigura al
            bajar (ver components/motion/narrative). Desde `xl` el plano ocupa la
            mitad derecha y el copy se retira solo; por debajo, las secciones se
            comportan como siempre. */}
        <HomeNarrative>
          <NarrativeAct state="tracks">
            <AudienceSwitch />
          </NarrativeAct>
          <NarrativeAct state="capability">
            <CapabilitiesBento />
          </NarrativeAct>
          <NarrativeAct state="timeline">
            <StepPin />
          </NarrativeAct>
          <NarrativeAct state="isolation">
            <WhyAuphere />
          </NarrativeAct>
        </HomeNarrative>
        <PullQuote />
        {/* <Cases /> — temporarily hidden, will re-enable when first real case is approved */}
        {/* Precios fuera de la web hasta que cierre el informe de pricing 2026-08.
            El modelo comercial (build fee cerrado + cuota mensual) vive en el FAQ. */}
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

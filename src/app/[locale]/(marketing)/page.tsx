import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale, type Locale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Hero } from '@/components/sections/Hero';
import { StepPin } from '@/components/sections/StepPin';
import { AudienceSwitch } from '@/components/sections/AudienceSwitch';
import { CapabilitiesBento } from '@/components/sections/CapabilitiesBento';
import { PullQuote } from '@/components/sections/PullQuote';
import { WhyAuphere } from '@/components/sections/WhyAuphere';
import { Qualifier } from '@/components/sections/Qualifier';
import { Faq } from '@/components/sections/Faq';
import { FaqJsonLd } from '@/components/sections/FaqJsonLd';
import { getFaqItems } from '@/components/sections/faq-utils';
import { FinalCta } from '@/components/sections/FinalCta';
import { HomeNarrative, NarrativeAct } from '@/components/motion/narrative/HomeNarrative';

interface Props {
  params: Promise<{ locale: string }>;
}

/**
 * Home v3 (heredada). Se sustituye por la home del rediseño en el paso 2;
 * mientras tanto vive bajo el shell global nuevo (header píldora + footer).
 */
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const tFaq = await getTranslations({ locale: locale as Locale, namespace: 'faq' });
  const faqItems = getFaqItems((key) => tFaq(key as Parameters<typeof tFaq>[0]));

  return (
    <>
      <Hero />
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
      <Qualifier />
      <FaqJsonLd items={faqItems} />
      <Faq items={faqItems} />
      <FinalCta />
    </>
  );
}

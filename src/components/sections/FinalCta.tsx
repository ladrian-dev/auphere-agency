import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { CalEmbed } from './CalEmbed';
import { CtaHalo } from '@/components/motion/CtaHalo';

export function FinalCta() {
  const t = useTranslations('finalCta');

  return (
    <section
      id="book"
      className="relative section-y surface-dark overflow-hidden"
    >
      <Container width="default" className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <Eyebrow variant="dark">{t('eyebrow')}</Eyebrow>
          <h2 className="type-h2 text-[var(--color-bone)] mt-6">
            {t('headline')}
            <span className="block font-accent italic text-[var(--color-caribbean-green)] mt-2">
              {t('headlineAccent')}
            </span>
          </h2>
          <p className="type-intro text-[var(--color-bone)]/75 mt-5">
            {t('subheadline')}
          </p>
        </div>

        <div className="relative">
          <CtaHalo />
          <div className="relative">
            <CalEmbed />
          </div>
        </div>

        <p className="text-center mt-8 text-[14px] text-[var(--color-bone)]/60">
          {t('microcopy')}
        </p>
      </Container>

      {/* Subtle dot grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, var(--color-bone) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
    </section>
  );
}

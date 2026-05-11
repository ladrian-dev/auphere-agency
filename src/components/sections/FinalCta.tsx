import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { CalEmbed } from './CalEmbed';

export function FinalCta() {
  const t = useTranslations('finalCta');

  return (
    <section
      id="book"
      className="relative py-20 md:py-28 surface-dark overflow-hidden"
    >
      <Container width="default" className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <Eyebrow variant="dark">{t('eyebrow')}</Eyebrow>
          <h2 className="font-display font-bold text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-[-0.03em] text-[var(--color-bone)] mt-6">
            {t('headline')}{' '}
            <span className="font-accent italic text-[var(--color-caribbean-green)]">
              {t('headlineAccent')}
            </span>
          </h2>
          <p className="font-display font-medium text-[clamp(1.05rem,1.8vw,1.375rem)] leading-[1.4] text-[var(--color-bone)]/70 mt-5">
            {t('subheadline')}
          </p>
        </div>

        <CalEmbed />

        <p className="text-center mt-8 text-[13px] text-[var(--color-bone)]/60">
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

import { useTranslations } from 'next-intl';
import { RevealText } from './RevealText';

/**
 * La solución (README §Home 3): una frase centrada de clamp(24px,3.2vw,42px)
 * que se revela palabra a palabra al hacer scroll.
 */
export function Solution() {
  const t = useTranslations('home.solution');
  return (
    <section className="section-y">
      <div className="container-site">
        <p className="type-eyebrow text-center">{t('eyebrow')}</p>
        <RevealText
          text={t('text')}
          className="mx-auto mt-6 max-w-[30ch] text-center text-[clamp(24px,3.2vw,42px)] font-medium leading-[1.25] tracking-[-0.02em] text-[var(--color-text)] [text-wrap:balance]"
        />
      </div>
    </section>
  );
}

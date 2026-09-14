import { useTranslations } from 'next-intl';
import type { LegalKey } from '@/lib/site';

const ITEMS: Record<LegalKey, readonly string[]> = {
  privacy: ['s01', 's02', 's03', 's04', 's05', 's06', 's07', 's08'],
  terms: ['s01', 's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09'],
  security: ['s01', 's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09'],
};

/**
 * Página legal (README §Legal): un solo `article` de 72ch, H1 de artículo,
 * entradilla, fecha y una lista numerada de secciones con H2 de 20 px y
 * texto 16/1.6. Alineado a la izquierda también en móvil (excepción
 * explícita a la regla de centrado).
 */
export function LegalArticle({ page }: { page: LegalKey }) {
  const t = useTranslations('legal');
  const tp = useTranslations(`legal.${page}`);
  // Las claves se componen en tiempo de ejecución; el tipo estricto no puede seguirlas.
  const key = (k: string) => k as Parameters<typeof tp>[0];

  return (
    <article className="pt-[clamp(140px,18vh,180px)] pb-[clamp(64px,8vw,120px)] text-left max-tab:pt-[120px]">
      <div className="container-site">
        <header className="max-w-[720px]">
          <p className="type-eyebrow">{t('eyebrow')}</p>
          <h1 className="type-h1-article mt-3.5">{tp('title')}</h1>
          <p className="type-lead mt-[18px]">{tp('lead')}</p>
          <p className="mt-3.5 text-[14px] text-[rgba(241,247,246,.5)]">{t('updated')}</p>
        </header>
        <ol className="mt-14 flex max-w-[72ch] flex-col border-t border-[var(--color-line)] max-tab:mt-10">
          {ITEMS[page].map((k, i) => (
            <li key={k} className="grid grid-cols-[48px_minmax(0,1fr)] gap-4 border-b border-[var(--color-line)] py-7 max-tab:grid-cols-[40px_minmax(0,1fr)]">
              <span className="pt-1 text-[14px] font-semibold text-[var(--color-primary)]">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h2 className="text-[20px] font-semibold leading-[1.25] tracking-[-0.01em]">{tp(key(`items.${k}.title`))}</h2>
                <p className="mt-2.5 text-[16px] leading-[1.6] text-[rgba(241,247,246,.75)] [text-wrap:pretty]">{tp(key(`items.${k}.body`))}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}

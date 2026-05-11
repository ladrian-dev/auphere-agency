'use client';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-[var(--color-bone)] text-[var(--color-ink)] px-6">
        <div className="text-center max-w-md">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-status-danger)]">
            Algo se rompió
          </p>
          <h1 className="font-display font-bold text-4xl tracking-[-0.04em] mt-4">
            Pero no es tu culpa.
          </h1>
          <p className="text-[var(--color-ink-muted)] mt-4">
            Recargamos y vemos qué pasa. Si vuelve a fallar, escríbenos a{' '}
            <a className="underline" href="mailto:contacto@auphere.com">contacto@auphere.com</a>.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 mt-8 rounded-full bg-[var(--color-ink)] text-[var(--color-bone)] px-6 py-3 font-medium hover:bg-[var(--color-bangladesh-green)] transition-colors"
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}

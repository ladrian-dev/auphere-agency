import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-[var(--color-bone)] text-[var(--color-ink)] px-6">
        <div className="text-center max-w-md">
          <p className="type-meta text-[var(--color-ink-muted)]">
            [404] · Not found
          </p>
          <h1 className="font-display font-bold text-5xl tracking-[-0.04em] mt-4">
            Esta página no existe.
          </h1>
          <p className="text-[var(--color-ink-muted)] mt-4">
            La que buscas se ha movido o nunca ha existido. Te llevamos de vuelta al inicio.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-8 rounded-full bg-[var(--color-ink)] text-[var(--color-bone)] px-6 py-3 font-medium hover:bg-[var(--color-bangladesh-green)] transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </body>
    </html>
  );
}

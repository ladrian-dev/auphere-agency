import { deployEnv } from '@/lib/deployment';

/**
 * Sello de entorno. Solo aparece fuera de producción.
 *
 * Existe para que nadie confunda `landing-staging.auphere.com` con la web real:
 * comparten diseño, dominio de segundo nivel y contenido. Sin una marca visible,
 * alguien acaba enseñando staging en una llamada de ventas o reportando como bug
 * algo que en producción ya está arreglado.
 *
 * Va abajo a la izquierda para no tapar el CTA del nav ni el del hero, y con
 * `pointer-events-none` para no interceptar clics.
 */
export function EnvironmentBadge() {
  const env = deployEnv();
  if (env === 'production') return null;

  return (
    <div
      className="pointer-events-none fixed bottom-3 left-3 z-[60] select-none"
      // El lector de pantalla lo anuncia una vez: es contexto útil, no ruido.
      role="status"
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-status-warning)]/50 bg-[var(--color-ink)]/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-status-warning)] backdrop-blur-sm">
        <span
          aria-hidden
          className="inline-block size-1.5 rounded-full bg-[var(--color-status-warning)]"
        />
        {env === 'staging' ? 'Staging · no es producción' : 'Local'}
      </span>
    </div>
  );
}

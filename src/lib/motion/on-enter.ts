'use client';

/**
 * Dispara `callback` la primera vez que `el` entra en pantalla.
 *
 * Existe para sustituir a `scrollTrigger: { start: 'top 85%', once: true }` en
 * TODA entrada que empiece ocultando contenido (`opacity: 0`).
 *
 * El motivo es un fallo real, no una preferencia (auditoría 2026-08-09 §F-2):
 * con ScrollTrigger, los seis `[NN] SECTION MARKER` de la home se quedaban
 * invisibles de forma permanente — recorrida la página entera, seguían a
 * `opacity: 0`. ScrollTrigger depende de estar sincronizado con Lenis y de un
 * `refresh()` que no siempre llega (anclas, restauración de scroll, hidratación
 * tardía, cambios de alto por fuentes). IntersectionObserver no depende de nada
 * de eso.
 *
 * Reglas de uso:
 *  · Entradas de una sola vez (revelar algo) → este helper.
 *  · Animación ligada al progreso del scroll (`scrub`, barras, parallax) →
 *    ScrollTrigger, que es para lo que sirve.
 *
 * Devuelve la función de limpieza; hay que devolverla desde el callback de
 * `useAuphereGSAP`.
 */
export function onEnter(
  el: Element | null | undefined,
  callback: () => void,
  options: { rootMargin?: string; failsafeMs?: number } = {},
): () => void {
  const { rootMargin = '0px 0px -10% 0px', failsafeMs = 10000 } = options;

  let fired = false;
  const run = () => {
    if (fired) return;
    fired = true;
    callback();
  };

  if (!el || typeof IntersectionObserver === 'undefined') {
    run();
    return () => {};
  }

  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        run();
        io.disconnect();
      }
    },
    { rootMargin },
  );
  io.observe(el);

  // Red de seguridad: preferimos perder la animación antes que perder el
  // contenido. Si en `failsafeMs` el observer no ha disparado, se muestra igual.
  const failsafe = window.setTimeout(run, failsafeMs);

  return () => {
    io.disconnect();
    window.clearTimeout(failsafe);
  };
}

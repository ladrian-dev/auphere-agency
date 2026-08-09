'use client';

/**
 * §9.3 — instrumentación Plausible (sin cookies). El script se inyecta en el
 * layout raíz solo en producción; aquí, el helper tipado de eventos.
 * Si Plausible no está cargado, track() es un no-op silencioso.
 */

type EventName =
  | 'cta_click'
  | 'calc_interact'
  | 'pricing_toggle'
  | 'plan_view'
  | 'guarantee_table_view'
  | 'doc_download'
  | 'faq_open'
  | 'vertical_view'
  | 'lang_switch'
  | 'booking_complete'
  | 'partner_apply_submit';

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number> }) => void;
  }
}

export function track(event: EventName, props?: Record<string, string | number>): void {
  if (typeof window === 'undefined' || typeof window.plausible !== 'function') return;
  window.plausible(event, props ? { props } : undefined);
}

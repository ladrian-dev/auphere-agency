/**
 * Datos globales del sitio compartidos entre header, footer, metadatos y
 * JSON-LD. Una sola fuente: si cambia una red o un email, cambia en todas
 * partes a la vez.
 */

export const CONTACT_EMAIL = 'contacto@auphere.com';

export type SocialId = 'linkedin' | 'instagram' | 'x' | 'bluesky' | 'facebook';

export interface SocialProfile {
  id: SocialId;
  label: string;
  href: string;
}

/** Las cinco redes del pie (README §Footer), en su orden de aparición. */
export const SOCIAL_PROFILES: readonly SocialProfile[] = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/auphere/' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/somos.auphere/' },
  { id: 'x', label: 'X', href: 'https://x.com/auphere' },
  { id: 'bluesky', label: 'Bluesky', href: 'https://bsky.app/profile/auphere.bsky.social' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/auphere/' },
] as const;

/**
 * Rutas legales por idioma. Los slugs ES son en español (README §Estructura);
 * cada página comprueba el idioma y devuelve 404 en el otro.
 */
export type LegalKey = 'privacy' | 'terms' | 'security';

export const LEGAL_SLUGS: Record<LegalKey, Record<'es' | 'en', string>> = {
  privacy: { es: 'privacidad', en: 'privacy' },
  terms: { es: 'terminos', en: 'terms' },
  security: { es: 'seguridad', en: 'security' },
};

export function legalPath(locale: string, key: LegalKey): string {
  const lang = locale === 'es' ? 'es' : 'en';
  return `/${lang}/${LEGAL_SLUGS[key][lang]}`;
}

/** Ancla de la sección de reserva. Idéntica en Home, Partners y Enterprise. */
export const AGENDA_HASH = '#agenda';

/** Páginas que tienen su propio panel de reserva al pie. */
export const PAGES_WITH_AGENDA = new Set(['/', '/partners', '/enterprise']);

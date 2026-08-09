/**
 * /partners/embedded — contenido tipado (action-plan-v3 §6.5, decisión D-5).
 * Su comprador es un director de producto, no una agencia. La página se
 * publica con el patrón de fechas de /enterprise: las seis piezas de API
 * son WP-46 del plan técnico (no existen hoy) y se dicen con fecha.
 * Primer comprador del track: Amacrux.
 */
import type { Localized } from './enterprise';

export const embeddedMeta = {
  title: {
    es: 'Embedded · IA dentro de tu producto, vía API',
    en: 'Embedded · AI inside your product, via API',
  },
  description: {
    es: 'Integra agentes de IA operados 24/7 dentro de tu SaaS o plataforma: tu marca, tu factura, nuestra infraestructura. El contrato técnico completo — webhooks firmados, OpenAPI, handoff, consumo por cliente — publicado con su tabla de fechas.',
    en: 'Embed AI agents operated 24/7 inside your SaaS or platform: your brand, your invoice, our infrastructure. The full technical contract — signed webhooks, OpenAPI, handoff, per-customer usage — published with its dated table.',
  },
} as const;

export const embeddedHero = {
  eyebrow: { es: 'PARTNERS · EMBEDDED', en: 'PARTNERS · EMBEDDED' },
  headline: {
    es: 'IA dentro de tu producto. Tu marca, tu factura, nuestra infraestructura.',
    en: 'AI inside your product. Your brand, your invoice, our infrastructure.',
  },
  subheadline: {
    es: 'Para directores de producto de SaaS, ERPs verticales y plataformas de reservas: la capa de agentes sin montar un equipo de IA. Esta página es el contrato técnico — con fechas reales, no con demos.',
    en: 'For product leaders at SaaS companies, vertical ERPs and booking platforms: the agent layer without building an AI team. This page is the technical contract — with real dates, not demos.',
  },
  ctaPrimary: { es: 'Hablar con ingeniería', en: 'Talk to engineering' },
  ctaSecondary: { es: 'Ver el programa de partners', en: 'See the partner program' },
  microcopy: {
    es: 'Respuesta de un ingeniero, no de un SDR. 48 h laborables.',
    en: 'An engineer replies, not an SDR. 48 business hours.',
  },
} as const;

/** El contrato técnico — las seis piezas de WP-46, con fecha (patrón /enterprise). */
export const apiPieces = [
  {
    name: { es: 'Webhooks salientes firmados', en: 'Signed outbound webhooks' },
    detail: {
      es: 'HMAC, reintentos con backoff y catálogo de eventos publicado. Tu producto se entera de todo lo que hace el agente.',
      en: 'HMAC, retries with backoff and a published event catalog. Your product knows everything the agent does.',
    },
  },
  {
    name: { es: 'Especificación OpenAPI del connector', en: 'OpenAPI spec of the connector' },
    detail: {
      es: 'El contrato del connector con tu producto — el 70% del trabajo de integración, especificado antes de escribir código.',
      en: 'The connector contract with your product — 70% of the integration work, specified before writing code.',
    },
  },
  {
    name: { es: 'API de lectura de conversaciones', en: 'Conversation read API' },
    detail: {
      es: 'Muestra las conversaciones del agente dentro de tu propia UI, con tu diseño.',
      en: 'Render the agent’s conversations inside your own UI, in your own design.',
    },
  },
  {
    name: { es: 'Evento y endpoint de handoff a humano', en: 'Human-handoff event and endpoint' },
    detail: {
      es: 'El escalado a persona cae dentro de tu producto — tu inbox, tus agentes, tu flujo.',
      en: 'Escalation to a person lands inside your product — your inbox, your agents, your flow.',
    },
  },
  {
    name: { es: 'API de consumo por cliente final', en: 'Per-customer usage API' },
    detail: {
      es: 'Cuánto consume cada cliente tuyo, para tu facturación y tus márgenes.',
      en: 'How much each of your customers consumes, for your billing and your margins.',
    },
  },
  {
    name: { es: 'Tope de gasto por cliente final', en: 'Per-customer spend cap' },
    detail: {
      es: 'Límite duro por cliente: ningún tenant tuyo puede generarte una factura sorpresa.',
      en: 'A hard per-customer limit: no tenant of yours can hand you a surprise bill.',
    },
  },
] as const;

export const apiPiecesDate = {
  es: 'Q1 2027 · WP-46 del roadmap técnico, con fase asignada',
  en: 'Q1 2027 · WP-46 on the technical roadmap, phase assigned',
} as const;

export const embeddedHonesty = {
  headline: { es: 'La verdad primero', en: 'The truth first' },
  body: {
    es: 'Ninguna de las seis piezas existe hoy como API pública — por eso cada una lleva fecha, igual que la tabla de garantías de /enterprise. Lo que sí existe hoy: la plataforma multi-tenant que las servirá (aislamiento por RLS, versionado con aprobación, evals), y un primer partner de diseño integrándose con nosotros. Si tu timeline encaja con el nuestro, entras con voz en el diseño de la API.',
    en: 'None of the six pieces exists today as a public API — which is why each carries a date, just like the guarantee table at /enterprise. What does exist today: the multi-tenant platform that will serve them (RLS isolation, approval-gated versioning, evals), and a first design partner integrating with us. If your timeline matches ours, you get a voice in the API design.',
  },
} as const;

export const embeddedExtras = [
  {
    title: { es: 'Curva de precio hasta 500 clientes', en: 'Price curve to 500 customers' },
    body: {
      es: 'Direccional y por tramos: el precio por cliente baja con el volumen. Las cifras se abren en la llamada de ingeniería — la economía completa del canal está en revisión de pricing y no publicamos números que puedan cambiar.',
      en: 'Directional and tiered: per-customer price drops with volume. Figures open up in the engineering call — full channel economics are under pricing review and we do not publish numbers that may change.',
    },
  },
  {
    title: { es: 'Sandbox aislado de producción', en: 'Sandbox isolated from production' },
    body: {
      es: 'Entorno de pruebas con claves de test que no tocan producción — prerequisito de WP-46, con su misma fecha. Hasta entonces, la integración de diseño se hace acompañada por ingeniería.',
      en: 'A test environment whose test keys never touch production — a WP-46 prerequisite, sharing its date. Until then, design integrations run hand-in-hand with engineering.',
    },
  },
  {
    title: { es: 'Versionado y deprecación publicados', en: 'Published versioning and deprecation' },
    body: {
      es: 'La API tendrá política de versiones y ventanas de deprecación por escrito, y límites de tasa con números — un director de producto no integra contra una API sin contrato de cambio.',
      en: 'The API ships with a written versioning policy, deprecation windows and rate limits with numbers — no product leader integrates against an API without a change contract.',
    },
  },
] as const;

export const embeddedCta = {
  headline: {
    es: '¿Integrarías IA si no tuvieras que operarla?',
    en: 'Would you embed AI if you did not have to operate it?',
  },
  body: {
    es: 'Cuéntanos tu producto y tu timeline. Si hay encaje, la primera llamada es con el ingeniero que está construyendo la API — y tu caso influye en su diseño.',
    en: 'Tell us your product and your timeline. If there is a fit, the first call is with the engineer building the API — and your case shapes its design.',
  },
} as const;

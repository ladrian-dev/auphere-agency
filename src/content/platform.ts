/**
 * /platform y /platform/security — contenido tipado (action-plan-v3 §6.6).
 * La página que hace que las otras tres tengan sentido: qué es, exactamente,
 * la cosa que operamos. Todo verificado contra claims.ts.
 */
import type { Localized } from './enterprise';

export const platformMeta = {
  title: {
    es: 'Plataforma · Qué es exactamente lo que operamos',
    en: 'Platform · What exactly it is that we operate',
  },
  description: {
    es: 'El ciclo de vida completo de una conversación en la plataforma Auphere: canales reales, 10 capacidades en producción, versionado con aprobación, evals continuos y aislamiento verificable. Sin roadmap disfrazado de producto.',
    en: "The full lifecycle of a conversation on the Auphere platform: real channels, 10 capabilities in production, approval-gated versioning, continuous evals and verifiable isolation. No roadmap dressed up as product.",
  },
} as const;

export const platformHero = {
  eyebrow: { es: 'PLATAFORMA · AUPHERE', en: 'PLATFORM · AUPHERE' },
  headline: { es: 'Esto es, exactamente, lo que operamos.', en: 'This is, exactly, what we operate.' },
  subheadline: {
    es: 'Una conversación real atraviesa el sistema así: entra por el canal, se clasifica, usa herramientas, responde — y escala a una persona cuando debe. Todo lo de esta página está en producción hoy.',
    en: 'A real conversation crosses the system like this: it enters through the channel, gets classified, uses tools, responds — and escalates to a person when it should. Everything on this page is in production today.',
  },
  ctaPrimary: { es: 'Reservar diagnóstico · 30 min', en: 'Book a diagnostic · 30 min' },
  ctaSecondary: { es: 'Seguridad y aislamiento →', en: 'Security & isolation →' },
} as const;

/** A-05 — las cinco paradas del scroll narrativo sobre el orquestador. */
export const lifecycleStops = [
  {
    title: { es: 'Entra por el canal', en: 'It enters through the channel' },
    body: {
      es: 'WhatsApp, Instagram o TikTok — texto, audio o foto. El agente entiende los tres formatos: transcribe la nota de voz, lee la imagen, responde en el idioma del cliente.',
      en: 'WhatsApp, Instagram or TikTok — text, audio or photo. The agent understands all three: it transcribes the voice note, reads the image, replies in the customer’s language.',
    },
  },
  {
    title: { es: 'Se clasifica', en: 'It gets classified' },
    body: {
      es: 'Intención, contexto y memoria del cliente: la conversación de hoy sabe lo que pasó el mes pasado. Cada mensaje se enruta a la skill correcta de su vertical.',
      en: 'Intent, context and customer memory: today’s conversation knows what happened last month. Every message routes to the right vertical skill.',
    },
  },
  {
    title: { es: 'Usa herramientas', en: 'It uses tools' },
    body: {
      es: 'Calendario, CRM, pagos — y si tu software no tiene API, una sesión de navegador que opera el panel como lo haría una persona. Cada agente lleva una whitelist explícita: lo que no está en la lista, no se ejecuta.',
      en: 'Calendar, CRM, payments — and if your software has no API, a browser session operates the panel as a person would. Every agent carries an explicit whitelist: what is not on it does not execute.',
    },
  },
  {
    title: { es: 'Responde — y se mide', en: 'It responds — and gets measured' },
    body: {
      es: 'Cada conversación relevante pasa por un juez automático con rúbricas por vertical: ¿resolvió?, ¿debía escalar? Los fallos alimentan el ciclo de mejora del mes.',
      en: 'Every relevant conversation passes an automated judge with per-vertical rubrics: did it resolve? should it have escalated? Failures feed the monthly improvement cycle.',
    },
  },
  {
    title: { es: 'Escala a humano cuando debe', en: 'It escalates to a human when it should' },
    body: {
      es: 'Tres disparadores — fuera de alcance, petición explícita, confianza baja — y el handoff cae en un inbox nominal de tu equipo con el contexto completo. Activado de serie. Es también lo que exige la Ley 10/2025.',
      en: 'Three triggers — out of scope, explicit request, low confidence — and the handoff lands in your team’s named inbox with full context. Enabled by default. It is also what Ley 10/2025 requires.',
    },
  },
] as const;

/** Las 10 capacidades de §5, cada una con "qué significa para ti". */
export const platformCapabilities = [
  {
    claimId: 'production-24-7',
    name: { es: 'Producción 24/7 multicanal', en: '24/7 multichannel production' },
    meaning: { es: 'Tu agente no tiene horario ni vacaciones; tus clientes tampoco esperan.', en: 'Your agent has no schedule and no holidays; your customers stop waiting.' },
  },
  {
    claimId: 'audio-vision',
    name: { es: 'Audio y visión', en: 'Audio and vision' },
    meaning: { es: 'Los audios y fotos que ya te mandan, entendidos sin pedir “escríbelo mejor”.', en: 'The voice notes and photos they already send, understood without asking them to type.' },
  },
  {
    claimId: 'vertical-skills',
    name: { es: '10 skills de vertical', en: '10 vertical skills' },
    meaning: { es: 'Salud, claims, pre/post-operatorio, escalado: comportamiento específico de tu sector, no un prompt genérico.', en: 'Health, claims, pre/post-op, escalation: sector-specific behavior, not a generic prompt.' },
  },
  {
    claimId: 'continuous-evals',
    name: { es: 'Evals continuos con juez', en: 'Continuous evals with a judge' },
    meaning: { es: 'La calidad no se supone: se mide contra rúbricas en conversaciones reales.', en: 'Quality is not assumed: it is measured against rubrics on real conversations.' },
  },
  {
    claimId: 'end-customer-memory',
    name: { es: 'Memoria por cliente final', en: 'Per-customer memory' },
    meaning: { es: 'Lo único de esta lista que tu cliente percibe directamente: le recuerdan.', en: 'The one thing on this list your customer directly feels: being remembered.' },
  },
  {
    claimId: 'browser-automation',
    name: { es: 'Automatización por navegador', en: 'Browser automation' },
    meaning: { es: 'Tu software legacy sin API deja de ser el motivo por el que “no se puede”.', en: 'Your API-less legacy software stops being the reason it “can’t be done”.' },
  },
  {
    claimId: 'versioning-staged-active',
    name: { es: 'Versionado STAGED→ACTIVE', en: 'STAGED→ACTIVE versioning' },
    meaning: { es: 'Apruebas cada versión antes de promoverla; rollback y actor auditados.', en: 'You approve every version before promotion; rollback and actor audited.' },
  },
  {
    claimId: 'rls-isolation',
    name: { es: 'Aislamiento por RLS', en: 'RLS isolation' },
    meaning: { es: 'Tus datos aislados por la base de datos, no por la buena fe del código.', en: 'Your data isolated by the database, not by well-meaning code.' },
  },
  {
    claimId: 'whatsapp-hygiene',
    name: { es: 'Higiene del canal WhatsApp', en: 'WhatsApp channel hygiene' },
    meaning: { es: 'La reputación de tu número ante Meta, vigilada como parte del servicio.', en: 'Your number’s standing with Meta, watched as part of the service.' },
  },
  {
    claimId: 'owner-backchannel',
    name: { es: 'Backchannel del dueño', en: 'Owner backchannel' },
    meaning: { es: 'Línea directa por WhatsApp con el equipo que opera — no un ticket.', en: 'A direct WhatsApp line to the operating team — not a ticket.' },
  },
] as const;

export const platformChannels = {
  headline: { es: 'Canales reales, con nombre', en: 'Real channels, by name' },
  live: [
    { name: 'WhatsApp', note: { es: 'API oficial de Meta, con higiene de número', en: 'Official Meta API, with number hygiene' } },
    { name: 'Instagram', note: { es: 'DMs con el mismo cerebro y la misma memoria', en: 'DMs with the same brain and memory' } },
    { name: 'TikTok', note: { es: 'Mensajería de negocio', en: 'Business messaging' } },
  ],
  dated: [
    {
      name: { es: 'Voz en tiempo real', en: 'Real-time voice' },
      note: { es: 'En el roadmap técnico con fase asignada; la respuesta en audio a notas de voz llega antes', en: 'On the technical roadmap with an assigned phase; audio replies to voice notes land earlier' },
    },
  ],
} as const;

export const platformIntegrations = {
  headline: { es: 'Integraciones', en: 'Integrations' },
  body: {
    es: 'Calendarios (Google Calendar y los de tu vertical: Booksy, Treatwell, Fresha…), CRMs, pagos y tu propio backoffice vía API. Y la regla que elimina la objeción de siempre: si tu sistema no tiene API, el agente lo usa igual, por navegador.',
    en: 'Calendars (Google Calendar plus your vertical’s: Booksy, Treatwell, Fresha…), CRMs, payments and your own backoffice via API. And the rule that kills the usual objection: if your system has no API, the agent uses it anyway, through the browser.',
  },
} as const;

/** /platform/security */
export const securityMeta = {
  title: {
    es: 'Seguridad de la plataforma · El paquete de aislamiento',
    en: 'Platform security · The isolation package',
  },
  description: {
    es: 'Los 9 controles de aislamiento de Auphere con su mecanismo: RLS impuesto por la base de datos, whitelist en dos puntos, auditoría bajo impersonación, fallo cerrado. El artefacto técnico para tu equipo de seguridad.',
    en: 'Auphere’s 9 isolation controls with their mechanism: database-enforced RLS, two-point whitelist, impersonation-aware audit, failing closed. The technical artifact for your security team.',
  },
} as const;

export const securityHero = {
  eyebrow: { es: 'PLATAFORMA · SEGURIDAD', en: 'PLATFORM · SECURITY' },
  headline: { es: 'El paquete de aislamiento, control por control.', en: 'The isolation package, control by control.' },
  subheadline: {
    es: 'Escrito para el equipo de seguridad que va a evaluar esto — no para marketing. Cada control con su mecanismo; la evidencia, bajo NDA en la revisión de arquitectura.',
    en: 'Written for the security team that will evaluate this — not for marketing. Each control with its mechanism; the evidence, under NDA in the architecture review.',
  },
} as const;

export const securitySections = {
  dataModel: {
    title: { es: 'Modelo de datos multi-tenant', en: 'Multi-tenant data model' },
    body: {
      es: 'Particionado a nivel de fila en la base de datos. El contexto de tenant se impone por transacción con SET LOCAL ROLE: el código de aplicación no puede aceptar un tenant_id de un caller, por diseño. Los tests de aislamiento son bloqueantes: si fallan, el despliegue no sale.',
      en: 'Row-level partitioning in the database. Tenant context is enforced per transaction with SET LOCAL ROLE: application code cannot accept a tenant_id from a caller, by design. Isolation tests are blocking: if they fail, the deployment does not ship.',
    },
  },
  credentials: {
    title: { es: 'Manejo de credenciales', en: 'Credential handling' },
    body: {
      es: 'Secretos en gestor dedicado con rotación en calendario; cuentas nominales con MFA por hardware; credenciales de vida corta; acceso restringido a los ingenieros del engagement, con todo acceso logueado.',
      en: 'Secrets in a dedicated manager with scheduled rotation; named accounts with hardware MFA; short-lived credentials; access restricted to the engineers on the engagement, with every access logged.',
    },
  },
  noTraining: {
    title: { es: 'Política de no-entrenamiento', en: 'No-training policy' },
    body: {
      es: 'APIs de modelo zero-retention. Los datos de tus conversaciones nunca se usan para entrenar modelos que vendamos a otros. Está en el DPA — es contractual, no una nota de blog.',
      en: 'Zero-retention model APIs. Your conversation data is never used to train models sold to others. It is in the DPA — contractual, not a blog note.',
    },
  },
  questionnaire: {
    title: { es: 'Cuestionario de seguridad', en: 'Security questionnaire' },
    body: {
      es: 'Cuestionario estándar respondido y listo para tu equipo — pídelo y lo tienes antes de la primera llamada. La lista de subencargados, con región y propósito, está publicada en la política de privacidad.',
      en: 'A standard questionnaire answered and ready for your team — ask and you have it before the first call. The sub-processor list, with region and purpose, is published in the privacy policy.',
    },
  },
} as const;

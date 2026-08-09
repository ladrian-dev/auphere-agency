/**
 * LA LEY DEL PROYECTO (action-plan-v3 §5).
 *
 * Ninguna afirmación comercial entra en la web sin una fila aquí. Cada claim
 * declara su estado real contra el código de producción (PLAN-TECNICO-V2):
 *
 *  - `live`    → es cierto hoy; se puede afirmar sin matices.
 *  - `dated`   → NO es cierto hoy; solo se puede publicar CON FECHA usando
 *                `publishAs` (patrón "qué se cumple hoy · qué llega y cuándo").
 *  - `blocked` → no se menciona en ninguna superficie pública. El script
 *                scripts/check-claims.mjs falla el build si un
 *                `forbiddenPattern` aparece en messages/ o src/content/.
 *
 * Cambiar un estado aquí es una decisión de producto, no de copy.
 */

export type ClaimStatus = 'live' | 'dated' | 'blocked';

export interface Claim {
  id: string;
  /** La promesa, en interno — qué se está afirmando exactamente. */
  promise: string;
  status: ClaimStatus;
  /** Qué la desbloquea: fase / WP de PLAN-TECNICO-V2 o decisión de negocio. */
  gate?: string;
  /** Para `live`: dónde está la evidencia (código, auditoría, doc). */
  evidence?: string;
  /** Para `dated`: la única forma permitida de publicarla (con fecha). */
  publishAs?: { es: string; en: string };
  /** Regex (case-insensitive) que NO puede aparecer en messages/ ni en
   *  src/content/ mientras el claim no sea `live`. */
  forbiddenPatterns?: string[];
  /** Archivos (relativos a la raíz) donde un claim `dated` SÍ puede
   *  discutirse — porque lo hace con su fecha (patrón tabla de honestidad).
   *  No aplica a `blocked`: bloqueado es bloqueado en todas partes. */
  allowedFiles?: string[];
}

export const CLAIMS: readonly Claim[] = [
  // ───────────────────────────── LIVE ─────────────────────────────
  {
    id: 'production-24-7',
    promise: 'Agente en producción 24/7, multicanal (WhatsApp · Instagram · voz)',
    status: 'live',
    evidence: 'nexus runtime en producción; webhooks meta',
  },
  {
    id: 'channel-tiktok',
    promise: 'TikTok como canal de entrada del agente',
    status: 'dated',
    gate: 'Pendiente de producción — decisión de producto 2026-08-09',
    // Donde el canal aparece con nombre va etiquetado como pendiente, nunca
    // listado junto a los que sí están en producción.
    publishAs: {
      es: 'TikTok · pronto',
      en: 'TikTok · soon',
    },
    allowedFiles: ['messages/es.json', 'messages/en.json'],
  },
  {
    id: 'audio-vision',
    promise: 'Entiende audios (Whisper) e imágenes que envía el cliente final',
    status: 'live',
    evidence: 'MediaProcessor en worker',
  },
  {
    id: 'vertical-skills',
    promise: '10 skills de vertical en producción (salud, claims, pre/post-op, escalado…)',
    status: 'live',
    evidence: 'catálogo de skills del runtime',
  },
  {
    id: 'continuous-evals',
    promise: 'Evals continuos con juez (grader) y rúbricas por vertical',
    status: 'live',
    evidence: 'grade_outcome en el grafo',
  },
  {
    id: 'end-customer-memory',
    promise: 'Memoria por cliente final entre conversaciones',
    status: 'live',
    evidence: '_current_customer + checkpoints',
  },
  {
    id: 'browser-automation',
    promise: 'Automatiza software sin API vía sesión de navegador',
    status: 'live',
    evidence: 'headless browser sessions (vendor UI)',
  },
  {
    id: 'versioning-staged-active',
    promise: 'Versionado STAGED→ACTIVE con aprobación, rollback y actor auditado',
    status: 'live',
    evidence: 'audit_log + promoción en dos pasos',
  },
  {
    id: 'rls-isolation',
    promise: 'Aislamiento por RLS + whitelist verificada en dos puntos + auditoría bajo impersonación',
    status: 'live',
    evidence: 'SET LOCAL ROLE; tests de aislamiento bloqueantes',
  },
  {
    id: 'whatsapp-hygiene',
    promise: 'Vigilancia de la calidad del número de WhatsApp ante Meta',
    status: 'live',
    evidence: 'monitoreo de quality rating del BSP',
  },
  {
    id: 'owner-backchannel',
    promise: 'Backchannel del dueño por WhatsApp (línea directa con el equipo que opera)',
    status: 'live',
    evidence: 'owner_channel_flow',
  },
  {
    id: 'human-escalation',
    promise: 'Escalado a humano con contexto completo, activado de serie (3 disparadores)',
    status: 'live',
    evidence: 'handoff a inbox nominal',
  },
  {
    id: 'art50-disclosure',
    promise: 'El agente se identifica como IA desde el primer mensaje (art. 50 Reglamento IA)',
    status: 'live',
    evidence: 'divulgación por canal; postura publicada en /trust §06',
  },
  {
    id: 'dpa-before-data',
    promise: 'DPA firmado antes de que fluyan datos reales',
    status: 'live',
    evidence: 'proceso de onboarding',
  },
  {
    id: 'eu-residency-default',
    promise: 'Runtime de producción hospedado en la UE por defecto',
    status: 'live',
    evidence: '/trust §01 (con excepciones listadas en /privacy)',
  },

  // ───────────────────────────── DATED ─────────────────────────────
  {
    id: 'data-deletion-verifiable',
    promise: 'Borrado total verificable (GDPR art. 17) — tenant.delete con cascada',
    status: 'dated',
    gate: 'PLAN-TECNICO-V2 · WP-07 (Fase 0, media jornada)',
    publishAs: {
      es: 'Borrado verificable de todos tus datos — disponible Q4 2026',
      en: 'Verifiable deletion of all your data — available Q4 2026',
    },
    forbiddenPatterns: ['borramos todos tus datos', 'delete all your data', 'borrado total e inmediato'],
  },
  {
    id: 'sla-availability',
    promise: 'SLA de disponibilidad 99,5% mensual con créditos',
    status: 'dated',
    gate: 'Instrumentación Fase 0 técnica (WP-01…06) + redacción contractual',
    publishAs: {
      es: 'SLA 99,5% con créditos — disponible desde Q4 2026',
      en: '99.5% SLA with service credits — available from Q4 2026',
    },
    forbiddenPatterns: ['SLA de disponibilidad', 'availability SLA', '99[.,]\\d\\s?%\\s?(de\\s)?(disponibilidad|uptime|availability)?'],
    allowedFiles: ['src/content/enterprise.ts'],
  },
  {
    id: 'resolution-guarantee',
    promise: 'Garantía de resolución 50-60% (definición de resolución verificada, no containment)',
    status: 'dated',
    gate: 'Fase 0 técnica: medición real de resolución',
    publishAs: {
      es: 'Garantía de resolución 50-60% — disponible desde Q4 2026',
      en: '50-60% resolution guarantee — available from Q4 2026',
    },
  },
  {
    id: 'dedicated-queue-tier',
    promise: 'Cola dedicada por tier (aislamiento de ruido entre tenants)',
    status: 'dated',
    gate: 'PLAN-TECNICO-V2 · Fase 1',
    publishAs: {
      es: 'Cola dedicada por tier — Q4 2026',
      en: 'Dedicated queue per tier — Q4 2026',
    },
  },
  {
    id: 'monthly-data-report',
    promise: 'Informe mensual con datos reales (latencia, resolución, escalados)',
    status: 'dated',
    gate: 'Fase 0 técnica: panel + SLIs (WP-05)',
    publishAs: {
      es: 'Informe mensual con datos de operación — desde Q4 2026',
      en: 'Monthly report with operations data — from Q4 2026',
    },
  },
  {
    id: 'eu-only-processing',
    promise: 'Procesamiento EU-only garantizado sin excepciones de proveedor',
    status: 'dated',
    gate: 'PLAN-TECNICO-V2 · Fase 3 (infraestructura)',
    publishAs: {
      es: 'Residencia UE sin excepciones — Fase de infraestructura, 2027',
      en: 'EU residency without exceptions — infrastructure phase, 2027',
    },
  },
  {
    id: 'soc2',
    promise: 'SOC 2 (Type I primero) con auditor contratado',
    status: 'dated',
    gate: 'Decisión de negocio (mes 4 del plan comercial); auditor sin contratar',
    publishAs: {
      es: 'SOC 2 en el roadmap de certificación; cuestionario de seguridad y controles bajo NDA',
      en: 'SOC 2 on our certification roadmap; security questionnaire and controls under NDA',
    },
    forbiddenPatterns: ['SOC 2 (Type [12I]+ )?(en curso|in progress)', 'SOC 2 certified', 'certificados? SOC 2'],
  },
  {
    id: 'sso',
    promise: 'SSO para clientes enterprise',
    status: 'dated',
    gate: 'Sin fase asignada — decidir en revisión de arquitectura',
    publishAs: { es: 'SSO — en evaluación, fecha en la revisión de arquitectura', en: 'SSO — under evaluation, date set in the architecture review' },
  },
  {
    id: 'partner-console',
    promise: 'Consola de partners (partners.auphere.com) con sandbox y promoción de versiones',
    status: 'dated',
    gate: 'PLAN-TECNICO-V2 · WP-42 (Fase 4, semanas 16-20)',
    publishAs: {
      es: 'Consola de partners — mes 5 del programa',
      en: 'Partner console — month 5 of the program',
    },
  },
  {
    id: 'embedded-api',
    promise: 'Las seis piezas de API de Embedded (webhooks firmados, OpenAPI, lectura, handoff, consumo, tope de gasto)',
    status: 'dated',
    gate: 'PLAN-TECNICO-V2 · WP-46 (Fase 4, semanas 20-26)',
    publishAs: {
      es: 'API pública de integración — tabla de fechas en /partners/embedded',
      en: 'Public integration API — dated table at /partners/embedded',
    },
  },
  {
    id: 'voice-channel',
    promise: 'Canal de voz en tiempo real (recepcionista telefónica)',
    status: 'dated',
    gate: 'PLAN-TECNICO-V2 · WP-31…33 (Fase 4). Nota: la respuesta en audio a notas de voz es WP-31 (semanas 14-16); la voz en tiempo real llega después',
    publishAs: {
      es: 'Voz en tiempo real — segunda mitad del roadmap 2026-27',
      en: 'Real-time voice — second half of the 2026-27 roadmap',
    },
  },

  // ──────────────────────────── BLOCKED ────────────────────────────
  {
    id: 'client-dashboard',
    promise: 'Dashboard de cliente con métricas en vivo',
    status: 'blocked',
    gate: 'PLAN-TECNICO-V2 · Fase 4 (ADR-009). Mientras: backchannel + informe',
    forbiddenPatterns: ['tu dashboard', 'your dashboard', 'nuestro dashboard', 'our dashboard', 'dashboard de cliente', 'client dashboard'],
  },
  {
    id: 'cost-per-conversation-live',
    promise: 'Coste por conversación visible/facturable',
    status: 'blocked',
    gate: 'PLAN-TECNICO-V2 · Fase 2 (usage_records; tokens hoy no persistidos)',
    forbiddenPatterns: ['coste por conversaci[oó]n', 'cost per (handled )?conversation'],
  },
  {
    id: 'prompt-caching-savings',
    promise: 'El prompt caching reduce tu coste',
    status: 'blocked',
    gate: 'llm_cache_read_ratio medido (WP-05); eficacia sin verificar',
    forbiddenPatterns: ['prompt caching', 'cach[eé] de prompts'],
  },
  {
    id: 'web-widget',
    promise: 'Widget web embebible para el cliente final',
    status: 'blocked',
    gate: 'PLAN-TECNICO-V2 · WP-34 (Fase 4, semanas 23-26)',
    forbiddenPatterns: ['widget (web|embebible)', 'web widget', 'embeddable widget'],
  },
  {
    id: 'rag-vector-search',
    promise: 'RAG / búsqueda vectorial',
    status: 'blocked',
    gate: 'No existe (cero uso de pgvector). No prometer nunca sin código',
    forbiddenPatterns: ['\\bRAG\\b', 'b[uú]squeda vectorial', 'vector search', 'pgvector'],
  },
  {
    id: 'pricing-v2',
    promise: 'Precios nuevos (Direct v2, suelo Enterprise, economía del canal)',
    status: 'blocked',
    gate: 'Informe de pricing 2026-08: unidad definida · consumo medido · consumo facturable',
    // Sin patrones — la vigilancia es humana: ninguna cifra nueva de precio
    // fuera del bloque publicado hoy en la home.
  },
] as const;

const byId = new Map(CLAIMS.map((c) => [c.id, c]));

export function getClaim(id: string): Claim {
  const claim = byId.get(id);
  if (!claim) throw new Error(`Unknown claim id: ${id} — every commercial statement needs a row in claims.ts`);
  return claim;
}

export function getClaims(ids: readonly string[]): Claim[] {
  return ids.map((id) => getClaim(id));
}

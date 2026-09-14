/**
 * /enterprise — contenido tipado (rediseño AIaaS 2026-09, README §Enterprise).
 * El copy ES/EN vive en el mismo objeto: imposible desincronizar idiomas.
 * Toda garantía tiene fila en claims.ts; las que no están `live` se publican
 * solo con su fecha (`when`), nunca como si existieran hoy. Este archivo está
 * en `allowedFiles` del claim `sla-availability`, por eso la cifra vive aquí
 * y no en messages/.
 */

export interface Localized {
  es: string;
  en: string;
}

export interface GuaranteeRow {
  /** Fila de claims.ts que gobierna esta garantía. */
  claimId: string;
  label: Localized;
  /** Matiz opcional mostrado bajo la etiqueta. */
  note?: Localized;
  /** Para claims no-live: la fecha con la que se publica (badge). */
  when?: Localized;
}

export interface IsolationControl {
  name: Localized;
  mechanism: Localized;
}

export interface Step {
  label: Localized;
  title: Localized;
  body: Localized;
}

export const enterpriseMeta = {
  title: {
    es: 'Enterprise · Agentes de IA con el control y los SLAs que necesitas',
    en: 'Enterprise · AI agents with the control and the SLAs you need',
  },
  description: {
    es: 'Integración con tus sistemas, aislamiento de datos impuesto por la base de datos, soporte dedicado y garantías por escrito. El detalle técnico que tu equipo de seguridad va a pedir, ya publicado.',
    en: 'Integration with your systems, data isolation enforced by the database, dedicated support and written guarantees. The technical detail your security team will ask for, already published.',
  },
} as const;

export const enterpriseHero = {
  eyebrow: { es: 'Enterprise', en: 'Enterprise' },
  line1: { es: 'Agentes de IA con el control', en: 'AI agents with the control' },
  line2: { es: 'y los SLAs que necesitas.', en: 'and the SLAs you need.' },
  lead: {
    es: 'Integración con tus sistemas, aislamiento de datos impuesto por la base de datos, soporte dedicado y garantías por escrito. El detalle técnico que tu equipo de seguridad va a pedir, ya publicado.',
    en: 'Integration with your systems, data isolation enforced by the database, dedicated support and written guarantees. The technical detail your security team will ask for, already published.',
  },
  cta: { es: 'Habla con ventas', en: 'Talk to sales' },
} as const;

/** 02 — Garantías y SLAs: lo que cumplimos hoy y lo que firmamos con fecha. */
export const guarantees = {
  eyebrow: { es: 'Garantías y SLAs', en: 'Guarantees and SLAs' },
  title: { es: 'Lo que cumplimos hoy y lo que firmamos.', en: 'What we deliver today and what we sign.' },
  lead: {
    es: 'Lo que está con fecha va al contrato con fecha, y con derecho de terminación sin penalización si no se cumple.',
    en: 'Anything dated goes into the contract with its date, and with the right to terminate without penalty if it is not met.',
  },
  today: { es: 'Hoy', en: 'Today' },
  dated: { es: 'Con fecha', en: 'Dated' },
} as const;

export const guaranteeRows: readonly GuaranteeRow[] = [
  {
    claimId: 'dpa-before-data',
    label: { es: 'DPA firmado antes de que fluyan datos', en: 'DPA signed before any data flows' },
  },
  {
    claimId: 'rls-isolation',
    label: { es: 'Aislamiento por RLS con tests bloqueantes', en: 'RLS isolation with blocking tests' },
    note: {
      es: 'Impuesto por la base de datos, no por confianza en el código',
      en: 'Enforced by the database, not by trust in the code',
    },
  },
  {
    claimId: 'human-escalation',
    label: { es: 'Escalado a humano siempre disponible', en: 'Human handoff always available' },
  },
  {
    claimId: 'art50-disclosure',
    label: {
      es: 'El agente se identifica como IA desde el primer mensaje',
      en: 'The agent identifies itself as AI from the first message',
    },
  },
  {
    claimId: 'versioning-staged-active',
    label: {
      es: 'Cada versión aprobada antes de promoverse, con rollback auditado',
      en: 'Every version approved before promotion, with audited rollback',
    },
  },
  {
    claimId: 'data-deletion-verifiable',
    label: { es: 'Borrado verificable (GDPR art. 17)', en: 'Verifiable deletion (GDPR art. 17)' },
    when: { es: 'Q4 2026', en: 'Q4 2026' },
  },
  {
    claimId: 'sla-availability',
    label: { es: 'SLA 99,5 % con créditos', en: '99.5% SLA with credits' },
    when: { es: 'Q4 2026', en: 'Q4 2026' },
  },
  {
    claimId: 'resolution-guarantee',
    label: { es: 'Garantía de resolución 50-60 %', en: '50–60% resolution guarantee' },
    note: {
      es: 'Con definición de resolución verificada, no containment',
      en: 'With a verified definition of resolution, not containment',
    },
    when: { es: 'Q4 2026', en: 'Q4 2026' },
  },
  {
    claimId: 'dedicated-queue-tier',
    label: { es: 'Cola dedicada por tier', en: 'Dedicated queue per tier' },
    when: { es: 'Q4 2026', en: 'Q4 2026' },
  },
  {
    claimId: 'monthly-data-report',
    label: { es: 'Informe mensual con datos de operación', en: 'Monthly report with operating data' },
    when: { es: 'Q4 2026', en: 'Q4 2026' },
  },
  {
    claimId: 'soc2',
    label: { es: 'SOC 2', en: 'SOC 2' },
    note: {
      es: 'En el roadmap de certificación; cuestionario de seguridad y controles bajo NDA',
      en: 'On the certification roadmap; security questionnaire and controls under NDA',
    },
  },
  {
    claimId: 'sso',
    label: { es: 'SSO', en: 'SSO' },
    note: {
      es: 'En evaluación; la fecha se fija en la revisión de arquitectura',
      en: 'Under evaluation; the date is set in the architecture review',
    },
  },
] as const;

/** 03 — Seguridad y control: nueve controles de aislamiento. */
export const isolation = {
  eyebrow: {
    es: 'Seguridad y control · nueve controles de aislamiento',
    en: 'Security and control · nine isolation controls',
  },
  title: { es: 'Aislamiento impuesto por la base de datos.', en: 'Isolation enforced by the database.' },
  measureTitle: { es: 'Cómo se mide.', en: 'How it is measured.' },
  measureBody: {
    es: 'Cada conversación relevante pasa por un juez automático con rúbricas por vertical: ¿resolvió?, ¿debía escalar?, ¿escaló a tiempo? Los fallos alimentan el ciclo de mejora del mes.',
    en: "Every relevant conversation goes through an automatic judge with per-vertical rubrics: did it resolve? should it have escalated? did it escalate in time? Failures feed the month's improvement cycle.",
  },
} as const;

export const isolationControls: readonly IsolationControl[] = [
  {
    name: { es: 'Aislamiento impuesto por la base de datos', en: 'Isolation enforced by the database' },
    mechanism: {
      es: 'RLS con SET LOCAL ROLE por transacción: el código no puede elegir el tenant aunque quiera.',
      en: 'RLS with SET LOCAL ROLE per transaction: the code cannot pick the tenant even if it tried.',
    },
  },
  {
    name: { es: 'Whitelist de herramientas en dos puntos', en: 'Tool whitelist at two points' },
    mechanism: {
      es: 'Lista explícita por agente, verificada en dos puntos del runtime. Lo que no está, no se ejecuta.',
      en: 'Explicit list per agent, checked at two points of the runtime. What is not listed does not run.',
    },
  },
  {
    name: { es: 'Auditoría con actor real bajo impersonación', en: 'Audit with the real actor under impersonation' },
    mechanism: {
      es: 'Cuando un operador actúa «como» un tenant, el registro guarda quién era de verdad.',
      en: 'When an operator acts “as” a tenant, the log records who they really were.',
    },
  },
  {
    name: { es: 'Vigilancia de aislamiento en ejecución', en: 'Runtime isolation monitoring' },
    mechanism: {
      es: 'Un watcher convierte violaciones en alertas con destinatario, no en logs que nadie lee.',
      en: 'A watcher turns violations into alerts with an owner, not logs nobody reads.',
    },
  },
  {
    name: { es: 'Sin CORS por diseño', en: 'No CORS by design' },
    mechanism: {
      es: 'La API no expone superficie para peticiones de navegador de orígenes arbitrarios.',
      en: 'The API exposes no surface for browser requests from arbitrary origins.',
    },
  },
  {
    name: { es: 'Webhooks con HMAC y fallo cerrado', en: 'HMAC webhooks, fail closed' },
    mechanism: {
      es: 'Toda entrada firmada se verifica, si falla, se rechaza.',
      en: 'Every signed input is verified; if it fails, it is rejected.',
    },
  },
  {
    name: { es: 'Despliegue con fallo cerrado', en: 'Fail-closed deployment' },
    mechanism: {
      es: 'Si los tests de aislamiento fallan, el despliegue no sale. Es un gate del pipeline.',
      en: 'If the isolation tests fail, the deployment does not ship. It is a pipeline gate.',
    },
  },
  {
    name: { es: 'Idempotencia en dos niveles', en: 'Idempotency at two levels' },
    mechanism: {
      es: 'Reintentos de webhook y de cola no duplican efectos: deduplicación en entrada y ejecución.',
      en: 'Webhook and queue retries never duplicate effects: deduplication on input and execution.',
    },
  },
  {
    name: { es: 'Sin agrupación entre clientes', en: 'No batching across clients' },
    mechanism: {
      es: 'Las llamadas al modelo nunca mezclan contexto de clientes distintos.',
      en: 'Model calls never mix context from different clients.',
    },
  },
] as const;

/** 04 — Despliegue a medida: piloto acotado, escala por fases. */
export const deployment = {
  eyebrow: { es: 'Despliegue a medida', en: 'Tailored deployment' },
  title: { es: 'Piloto acotado. Escala por fases.', en: 'Bounded pilot. Scale in phases.' },
  lead: {
    es: 'Para las primeras 3-5 cuentas desplegamos exactamente lo que existe, y lo demás va al contrato con fecha y derecho de terminación.',
    en: 'For the first 3–5 accounts we deploy exactly what exists; everything else goes into the contract with a date and the right to terminate.',
  },
  items: [
    {
      es: 'Piloto acotado con alcance y precio cerrados por escrito',
      en: 'Bounded pilot with scope and price fixed in writing',
    },
    {
      es: 'Garantías por fases con fechas contractuales y derecho de terminación sin penalización',
      en: 'Phased guarantees with contractual dates and a no-penalty termination right',
    },
    {
      es: 'Prioridad directa sobre el roadmap para lo que pida tu seguridad',
      en: 'Direct priority on the roadmap for what your security team asks for',
    },
    {
      es: 'Compromiso escrito de caso público con métricas cuando el piloto cumpla',
      en: 'Written commitment to a public case study with metrics once the pilot delivers',
    },
  ] as readonly Localized[],
  priceTitle: { es: 'Precio.', en: 'Price.' },
  priceBody: {
    es: 'Depende de volumen, canales, integraciones y garantías. Sale de la revisión de arquitectura con desglose por escrito.',
    en: 'Depends on volume, channels, integrations and guarantees. It comes out of the architecture review with a written breakdown.',
  },
} as const;

/** Cuatro pasos («Paso 1…4», nunca semanas). */
export const deploymentSteps: readonly Step[] = [
  {
    label: { es: 'Paso 1', en: 'Step 1' },
    title: { es: 'Revisión de arquitectura', en: 'Architecture review' },
    body: {
      es: '30 minutos con el ingeniero que opera la plataforma. Sales con un go/no-go honesto y, si es go, el borrador del blueprint.',
      en: '30 minutes with the engineer who runs the platform. You leave with an honest go/no-go and, if go, the draft blueprint.',
    },
  },
  {
    label: { es: 'Paso 2', en: 'Step 2' },
    title: { es: 'Seguridad y DPA', en: 'Security and DPA' },
    body: {
      es: 'Cuestionario respondido, DPA firmado, reparto de responsabilidad por escrito. Ningún dato real toca el sistema antes.',
      en: 'Questionnaire answered, DPA signed, responsibilities split in writing. No real data touches the system before that.',
    },
  },
  {
    label: { es: 'Paso 3', en: 'Step 3' },
    title: { es: 'Configuración y evals', en: 'Configuration and evals' },
    body: {
      es: 'Integraciones, skills de vertical, rúbricas propias. Cada versión requiere tu aprobación explícita.',
      en: 'Integrations, vertical skills, your own rubrics. Every version requires your explicit approval.',
    },
  },
  {
    label: { es: 'Paso 4', en: 'Step 4' },
    title: { es: 'Producción acotada, escala', en: 'Bounded production, then scale' },
    body: {
      es: 'Go-live sobre un segmento, medición contra el blueprint y ampliación por fases con criterios de salida.',
      en: 'Go-live on one segment, measurement against the blueprint and phased expansion with exit criteria.',
    },
  },
] as const;

/** 05 — Habla con ventas (#agenda). */
export const sales = {
  title: { es: 'Trae a seguridad a la primera llamada.', en: 'Bring security to the first call.' },
  lead: {
    es: '30 minutos con el ingeniero que opera la plataforma, no con un comercial. Arquitectura, integración con tus sistemas, cumplimiento y un go/no-go honesto.',
    en: '30 minutes with the engineer who runs the platform, not a salesperson. Architecture, integration with your systems, compliance and an honest go/no-go.',
  },
} as const;

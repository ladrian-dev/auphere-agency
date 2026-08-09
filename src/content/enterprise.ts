/**
 * /enterprise — contenido tipado (action-plan-v3 §6.3, patrón §11.2).
 * El copy ES/EN vive en el mismo objeto: imposible desincronizar idiomas.
 * Toda afirmación aquí tiene fila en claims.ts — la tabla de garantías se
 * resuelve contra ella en build.
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
}

export interface IsolationControl {
  name: Localized;
  mechanism: Localized;
}

export interface FaqItem {
  q: Localized;
  a: Localized;
}

export const enterpriseMeta = {
  title: {
    es: 'Enterprise · Agentes de IA con garantías por escrito',
    en: 'Enterprise · AI agents with written guarantees',
  },
  description: {
    es: 'El 40% de los proyectos de agentes se cancela antes de producción. Auphere opera el tramo donde los demás fallan: aislamiento verificable, cumplimiento art. 50 y Ley 10/2025, y una tabla de garantías con fechas — no promesas.',
    en: '40% of agent projects are cancelled before production. Auphere operates the stretch where others fail: verifiable isolation, EU AI Act Article 50 compliance, and a guarantee table with dates — not promises.',
  },
} as const;

export const enterpriseHero = {
  eyebrow: { es: 'ENTERPRISE · INFRAESTRUCTURA DE IA OPERADA', en: 'ENTERPRISE · OPERATED AI INFRASTRUCTURE' },
  headline: {
    es: 'El 40% de los proyectos de agentes se cancela antes de producción.',
    en: '40% of agent projects are cancelled before they reach production.',
  },
  subheadline: {
    es: 'Nosotros vivimos de que el tuyo no. Garantías por escrito, cumplimiento por diseño y el detalle técnico que tu equipo de seguridad va a pedir — publicado, no prometido.',
    en: 'Our business is making sure yours is not. Written guarantees, compliance by design, and the technical detail your security team will ask for — published, not promised.',
  },
  ctaPrimary: { es: 'Revisión de arquitectura · 45 min con un ingeniero', en: 'Architecture review · 45 min with an engineer' },
  ctaSecondary: { es: 'Pedir el cuestionario de seguridad', en: 'Request the security questionnaire' },
  microcopy: {
    es: 'Hablas con el ingeniero que opera la plataforma, no con un comercial.',
    en: 'You talk to the engineer who operates the platform, not a salesperson.',
  },
} as const;

/** 02 — La tabla de honestidad. El orden es el de lectura del comprador. */
export const guaranteeRows: readonly GuaranteeRow[] = [
  {
    claimId: 'eu-residency-default',
    label: { es: 'Residencia UE por defecto', en: 'EU residency by default' },
    note: {
      es: 'Excepciones de proveedor listadas en la política de privacidad; EU-only sin excepciones tiene fecha propia',
      en: 'Vendor exceptions listed in the privacy policy; EU-only without exceptions has its own date',
    },
  },
  {
    claimId: 'dpa-before-data',
    label: { es: 'DPA firmado antes de que fluyan datos', en: 'DPA signed before any data flows' },
  },
  {
    claimId: 'rls-isolation',
    label: { es: 'Aislamiento por RLS con tests bloqueantes', en: 'RLS isolation with blocking tests' },
    note: {
      es: 'Impuesto por la base de datos, no por confianza en el código',
      en: 'Enforced by the database, not by trusting application code',
    },
  },
  {
    claimId: 'human-escalation',
    label: { es: 'Escalado a humano siempre disponible', en: 'Human escalation always available' },
  },
  {
    claimId: 'art50-disclosure',
    label: { es: 'Divulgación de IA (art. 50) por diseño', en: 'AI disclosure (Article 50) by design' },
  },
  {
    claimId: 'versioning-staged-active',
    label: { es: 'Cada versión aprobada antes de promoverse, con rollback auditado', en: 'Every version approved before promotion, with audited rollback' },
  },
  {
    claimId: 'data-deletion-verifiable',
    label: { es: 'Borrado verificable (GDPR art. 17)', en: 'Verifiable deletion (GDPR art. 17)' },
  },
  {
    claimId: 'sla-availability',
    label: { es: 'SLA 99,5% con créditos', en: '99.5% SLA with service credits' },
  },
  {
    claimId: 'resolution-guarantee',
    label: { es: 'Garantía de resolución 50-60%', en: '50-60% resolution guarantee' },
    note: {
      es: 'Con definición de resolución verificada — no containment',
      en: 'Using verified resolution — not containment',
    },
  },
  {
    claimId: 'dedicated-queue-tier',
    label: { es: 'Cola dedicada por tier', en: 'Dedicated queue per tier' },
  },
  {
    claimId: 'monthly-data-report',
    label: { es: 'Informe mensual con datos de operación', en: 'Monthly report with operations data' },
  },
  {
    claimId: 'soc2',
    label: { es: 'SOC 2', en: 'SOC 2' },
  },
  {
    claimId: 'sso',
    label: { es: 'SSO', en: 'SSO' },
  },
] as const;

export const guaranteeFootnote = {
  es: 'Lo que está con fecha va al contrato con fecha — y con derecho de terminación sin penalización si no se cumple.',
  en: 'Anything with a date goes into the contract with that date — and with a no-penalty termination right if we miss it.',
} as const;

/** 03 — Cumplimiento. El bloque más fresco del mercado. */
export const complianceItems = [
  {
    title: { es: 'Art. 50 del Reglamento europeo de IA — aplicable desde el 2-ago-2026', en: 'EU AI Act Article 50 — applicable since Aug 2, 2026' },
    body: {
      es: 'Obliga a que el usuario sepa que habla con una IA, como deber de diseño del proveedor. Todo agente de Auphere se identifica como IA desde el primer mensaje, en todos los canales — y lo publicamos como postura, no como disculpa: lo que la gente valora no es que parezca humano, es que le resuelva.',
      en: 'It requires users to know they are talking to an AI, as a design obligation on the provider. Every Auphere agent identifies itself as AI from the first message, on every channel — and we publish that as a stance, not an apology: what people value is not that it seems human, it is that it solves their problem.',
    },
  },
  {
    title: { es: 'Code of Practice on Transparency of AI-generated Content', en: 'Code of Practice on Transparency of AI-generated Content' },
    body: {
      es: 'En proceso de adhesión ante la AI Office (agosto 2026). De los vendors enterprise del segmento que hemos auditado, ninguno lo exhibe todavía.',
      en: 'Signature in progress with the AI Office (August 2026). Of the enterprise vendors we have audited in this segment, none displays it yet.',
    },
  },
  {
    title: { es: 'Ley 10/2025 (España) — 28-dic-2026', en: 'Ley 10/2025 (Spain) — Dec 28, 2026' },
    body: {
      es: 'Desde esa fecha, todo bot de atención al cliente de una empresa grande o de servicios básicos debe ofrecer atención humana desde el menú inicial y en cualquier momento. El escalado a humano de Auphere viene activado de serie: tu agente cumple el art. 8.2 antes de la fecha.',
      en: 'From that date, any customer-service bot at a large company or basic-services provider in Spain must offer human assistance from the first menu and at any point. Auphere ships human escalation enabled by default: your agent complies with art. 8.2 ahead of the deadline.',
    },
  },
  {
    title: { es: 'Reparto de responsabilidad, por escrito', en: 'Responsibility split, in writing' },
    body: {
      es: 'Quién es proveedor y quién desplegador a efectos del Reglamento, qué firma cada parte y qué documentación te entregamos para tu propio expediente de cumplimiento. Va en el contrato, no en una llamada.',
      en: 'Who is provider and who is deployer under the Act, what each party signs, and what documentation we hand you for your own compliance file. It goes in the contract, not in a call.',
    },
  },
  {
    title: { es: 'Extraterritorialidad', en: 'Extraterritoriality' },
    body: {
      es: 'Si el output del agente se usa en la UE, el Reglamento aplica aunque tu empresa no esté en la UE. Lo mapeamos contigo en la revisión de arquitectura.',
      en: "If the agent's output is used in the EU, the Act applies even if your company is not established in the EU. We map it with you in the architecture review.",
    },
  },
] as const;

/** 04 — Los 9 controles de aislamiento (núcleo también de /platform/security). */
export const isolationControls: readonly IsolationControl[] = [
  {
    name: { es: 'Aislamiento impuesto por la base de datos', en: 'Database-enforced isolation' },
    mechanism: {
      es: 'RLS con SET LOCAL ROLE por transacción: el código de aplicación no puede elegir el tenant aunque quiera. Un bug de aplicación no cruza datos.',
      en: 'RLS with SET LOCAL ROLE per transaction: application code cannot choose the tenant even if it tries. An application bug cannot cross data.',
    },
  },
  {
    name: { es: 'Whitelist de herramientas en dos puntos', en: 'Tool whitelist at two independent points' },
    mechanism: {
      es: 'Cada agente lleva una lista explícita de herramientas permitidas, verificada en dos puntos independientes del runtime. Lo que no está en la lista no se ejecuta.',
      en: 'Every agent carries an explicit list of allowed tools, verified at two independent points of the runtime. What is not on the list does not execute.',
    },
  },
  {
    name: { es: 'Auditoría con actor real bajo impersonación', en: 'Audit trail with the real actor under impersonation' },
    mechanism: {
      es: 'Cuando un operador actúa "como" un tenant, el registro de auditoría guarda quién era de verdad. La impersonación nunca borra la identidad.',
      en: 'When an operator acts "as" a tenant, the audit log records who they really were. Impersonation never erases identity.',
    },
  },
  {
    name: { es: 'Vigilancia de aislamiento en ejecución', en: 'Runtime isolation watching' },
    mechanism: {
      es: 'Un watcher observa violaciones de aislamiento en producción y las convierte en alertas con destinatario, no en logs que nadie lee.',
      en: 'A watcher observes isolation violations in production and turns them into alerts with a named recipient, not logs nobody reads.',
    },
  },
  {
    name: { es: 'Sin CORS por diseño', en: 'No CORS by design' },
    mechanism: {
      es: 'La API no acepta peticiones de navegador de orígenes arbitrarios porque no expone superficie para ello. Menos superficie, menos clases de ataque.',
      en: 'The API does not accept browser requests from arbitrary origins because it exposes no surface for it. Less surface, fewer attack classes.',
    },
  },
  {
    name: { es: 'Webhooks con HMAC y fallo cerrado', en: 'Webhooks with HMAC, failing closed' },
    mechanism: {
      es: 'Toda entrada firmada se verifica; si la verificación falla, el mensaje se rechaza. Nunca "se procesa igual y ya veremos".',
      en: 'Every signed input is verified; if verification fails, the message is rejected. Never "process it anyway and see".',
    },
  },
  {
    name: { es: 'Despliegue con fallo cerrado', en: 'Deployment failing closed' },
    mechanism: {
      es: 'Si los tests de aislamiento fallan, el despliegue no sale. El aislamiento no es una convención del equipo: es un gate del pipeline.',
      en: 'If isolation tests fail, the deployment does not ship. Isolation is not a team convention: it is a pipeline gate.',
    },
  },
  {
    name: { es: 'Idempotencia en dos niveles', en: 'Idempotency at two levels' },
    mechanism: {
      es: 'Reintentos de webhook y de cola no duplican efectos: la deduplicación existe en la entrada y en la ejecución.',
      en: 'Webhook and queue retries do not duplicate effects: deduplication exists at intake and at execution.',
    },
  },
  {
    name: { es: 'Sin agrupación de peticiones entre clientes', en: 'No cross-customer request batching' },
    mechanism: {
      es: 'Las llamadas al proveedor de modelo no agrupan contexto de clientes distintos. El contexto de tu cliente viaja solo.',
      en: 'Calls to the model provider never batch context from different customers. Your customer’s context travels alone.',
    },
  },
] as const;

/** 05 — Cómo se mide. */
export const measurement = {
  headline: { es: 'Cómo se mide — evals continuos, no fe', en: 'How it is measured — continuous evals, not faith' },
  body: {
    es: 'Cada conversación relevante pasa por un juez automático con rúbricas por vertical: ¿resolvió?, ¿debía escalar?, ¿escaló a tiempo? Los fallos alimentan el ciclo de mejora del mes. El informe mensual con datos de operación (latencia, resolución, escalados) tiene fecha en la tabla de arriba — hasta entonces, revisamos contigo los resultados de evals en cada ciclo.',
    en: 'Every relevant conversation passes through an automated judge with per-vertical rubrics: did it resolve? should it have escalated? did it escalate in time? Failures feed the monthly improvement cycle. The monthly operations report (latency, resolution, escalations) has a date in the table above — until then, we review eval results with you every cycle.',
  },
} as const;

/** 06 — Precio ⏸ gated (informe-pricing-2026-08). */
export const pricingGated = {
  headline: { es: 'Precio', en: 'Pricing' },
  body: {
    es: 'El precio enterprise depende de volumen, canales, integraciones y garantías contractuales. Sale de la revisión de arquitectura, con desglose por escrito — no hay tarifa oculta que "se negocia": hay un blueprint con números.',
    en: 'Enterprise pricing depends on volume, channels, integrations and contractual guarantees. It comes out of the architecture review, itemised in writing — there is no hidden rate to "negotiate": there is a blueprint with numbers.',
  },
} as const;

/** 07 — Programa de diseño de lanzamiento. */
export const launchProgram = {
  headline: { es: 'Programa de diseño de lanzamiento', en: 'Launch design program' },
  intro: {
    es: 'Para las primeras 3-5 cuentas enterprise, vendemos exactamente lo que existe — y el resto con fecha contractual. A cambio de entrar antes, entras mejor:',
    en: 'For the first 3-5 enterprise accounts we sell exactly what exists — and the rest with a contractual date. In exchange for being early, you get in on better terms:',
  },
  items: [
    {
      es: 'Piloto acotado con alcance y precio cerrados por escrito en la revisión de arquitectura — no un contrato completo a ciegas',
      en: 'A scoped pilot with scope and price fixed in writing at the architecture review — not a blind full contract',
    },
    {
      es: 'Garantías por fases con fechas contractuales, y derecho de terminación sin penalización si una fecha no se cumple',
      en: 'Phased guarantees with contractual dates, and a no-penalty termination right if a date slips',
    },
    {
      es: 'Prioridad directa sobre el roadmap: lo que tu seguridad pida con fundamento, se planifica con fase y fecha',
      en: 'Direct priority on the roadmap: what your security team asks for with cause gets planned with a phase and a date',
    },
    {
      es: 'Compromiso escrito de caso público con métricas cuando el piloto cumpla sus objetivos — es parte del trato',
      en: 'A written commitment to a public case study with metrics once the pilot hits its targets — it is part of the deal',
    },
  ],
} as const;

/** 08 — Proceso de implantación. */
export const processWeeks = [
  {
    period: { es: 'Semana 1', en: 'Week 1' },
    title: { es: 'Revisión de arquitectura', en: 'Architecture review' },
    body: {
      es: '45 minutos con el ingeniero que opera la plataforma. Mapa de canales, integraciones, requisitos de seguridad y cumplimiento. Sales con un go/no-go honesto y, si es go, con el borrador del blueprint.',
      en: '45 minutes with the engineer who operates the platform. Map of channels, integrations, security and compliance requirements. You leave with an honest go/no-go and, if go, a draft blueprint.',
    },
  },
  {
    period: { es: 'Semanas 1-2', en: 'Weeks 1-2' },
    title: { es: 'Seguridad y DPA', en: 'Security and DPA' },
    body: {
      es: 'Cuestionario de seguridad respondido, DPA firmado, reparto de responsabilidad art. 50 por escrito. Ningún dato real toca el sistema antes de esto.',
      en: 'Security questionnaire answered, DPA signed, Article 50 responsibility split in writing. No real data touches the system before this.',
    },
  },
  {
    period: { es: 'Semanas 2-6', en: 'Weeks 2-6' },
    title: { es: 'Configuración y evals', en: 'Configuration and evals' },
    body: {
      es: 'Integraciones, skills de vertical, rúbricas de evaluación propias. Revisas cada sprint; cada versión requiere tu aprobación explícita antes de promoverse.',
      en: 'Integrations, vertical skills, your own evaluation rubrics. You review every sprint; every version requires your explicit approval before promotion.',
    },
  },
  {
    period: { es: 'Semanas 6-8', en: 'Weeks 6-8' },
    title: { es: 'Producción acotada → escala', en: 'Scoped production → scale' },
    body: {
      es: 'Go-live sobre un segmento acotado, medición contra las métricas del blueprint, y ampliación por fases con criterios de salida en cada una.',
      en: 'Go-live on a scoped segment, measurement against the blueprint metrics, and phased expansion with exit criteria at each step.',
    },
  },
] as const;

/** 09 — FAQ enterprise (12-15 · FAQPage schema). */
export const enterpriseFaq: readonly FaqItem[] = [
  {
    q: { es: '¿Cómo aisláis los datos de cada cliente?', en: 'How do you isolate each customer’s data?' },
    a: {
      es: 'Particionado a nivel de fila impuesto por la base de datos (RLS con SET LOCAL ROLE): el código de aplicación no puede elegir tenant. Encima, whitelist de herramientas verificada en dos puntos, auditoría con actor real bajo impersonación y tests de aislamiento que bloquean el despliegue si fallan. El detalle completo, control por control, está en esta misma página y en /trust.',
      en: 'Row-level partitioning enforced by the database (RLS with SET LOCAL ROLE): application code cannot choose a tenant. On top, a tool whitelist verified at two points, an audit trail with the real actor under impersonation, and isolation tests that block deployment if they fail. The full control-by-control detail is on this page and at /trust.',
    },
  },
  {
    q: { es: '¿Mis datos entrenan modelos para otros?', en: 'Does my data train models for others?' },
    a: {
      es: 'No. Usamos APIs de modelo zero-retention y los datos de tus conversaciones nunca se usan para entrenar modelos que vendamos a terceros. Está en el DPA, no en una promesa de marketing.',
      en: 'No. We use zero-retention model APIs and your conversation data is never used to train models sold to anyone else. It is in the DPA, not in a marketing promise.',
    },
  },
  {
    q: { es: '¿Dónde viven los datos?', en: 'Where does the data live?' },
    a: {
      es: 'Runtime de producción hospedado en la UE por defecto. Los proveedores sin región UE están listados en la política de privacidad con su región y propósito. El procesamiento EU-only sin excepciones tiene fecha propia en la tabla de garantías.',
      en: 'Production runtime hosted in the EU by default. Vendors without an EU region are listed in the privacy policy with their region and purpose. EU-only processing without exceptions has its own date in the guarantee table.',
    },
  },
  {
    q: { es: '¿Podéis borrar todos nuestros datos si nos vamos?', en: 'Can you delete all our data if we leave?' },
    a: {
      es: 'El borrado verificable de extremo a extremo (GDPR art. 17) está en la tabla de garantías con fecha — es un trabajo de media jornada ya planificado en el roadmap técnico, no un "sí" de comercial. Hasta esa fecha, el compromiso contractual es el borrado bajo solicitud con verificación manual.',
      en: 'End-to-end verifiable deletion (GDPR art. 17) is in the guarantee table with a date — it is already planned in the technical roadmap, not a sales "yes". Until that date, the contractual commitment is deletion on request with manual verification.',
    },
  },
  {
    q: { es: '¿Tenéis SLA?', en: 'Do you have an SLA?' },
    a: {
      es: 'El SLA de disponibilidad del 99,5% con créditos está en la tabla de garantías con fecha, porque no publicamos un SLA que aún no podemos medir con datos. Lo que sí existe hoy: compromiso de respuesta a incidentes por contrato y monitoreo 24/7 por el equipo que construyó la plataforma.',
      en: 'The 99.5% availability SLA with credits is in the guarantee table with a date, because we do not publish an SLA we cannot yet measure with data. What exists today: a contractual incident-response commitment and 24/7 monitoring by the team that built the platform.',
    },
  },
  {
    q: { es: '¿SOC 2? ¿ISO 42001?', en: 'SOC 2? ISO 42001?' },
    a: {
      es: 'SOC 2 está en el roadmap de certificación y aún no ha empezado — lo decimos así de claro porque "en curso" sin auditor contratado es humo. Mientras tanto: cuestionario de seguridad respondido, controles documentados uno a uno y acceso bajo NDA a la evidencia. ISO 42001 es objetivo a 12-18 meses.',
      en: 'SOC 2 is on the certification roadmap and has not started yet — we say it that plainly because "in progress" without a contracted auditor is smoke. Meanwhile: an answered security questionnaire, controls documented one by one, and NDA access to the evidence. ISO 42001 is a 12-18 month goal.',
    },
  },
  {
    q: { es: '¿Cómo cumplís el art. 50 del Reglamento de IA?', en: 'How do you comply with AI Act Article 50?' },
    a: {
      es: 'Divulgación por diseño: el agente se identifica como IA desde el primer mensaje en todos los canales, con el texto exacto publicado en /trust. No construimos agentes que se hagan pasar por humanos, y rechazamos configuraciones que lo pidan. El reparto proveedor/desplegador va por escrito en el contrato.',
      en: 'Disclosure by design: the agent identifies itself as AI from the first message on every channel, with the exact wording published at /trust. We do not build agents that pass as human, and we decline configurations that ask for it. The provider/deployer split goes into the contract in writing.',
    },
  },
  {
    q: { es: '¿Y la Ley 10/2025 española?', en: 'What about Spain’s Ley 10/2025?' },
    a: {
      es: 'Desde el 28-dic-2026 obliga a ofrecer atención humana desde el menú inicial y en cualquier momento. El escalado a humano de Auphere viene activado de serie con tres disparadores y contexto completo: tu agente cumple antes de la fecha. Tenemos una guía dedicada en /es/ley-10-2025-atencion-cliente.',
      en: 'From Dec 28, 2026 it requires offering human assistance from the first menu and at any time. Auphere ships human escalation enabled by default with three triggers and full context: your agent complies ahead of the deadline. There is a dedicated guide at /es/ley-10-2025-atencion-cliente.',
    },
  },
  {
    q: { es: '¿Quién opera esto y qué pasa si esa persona no está?', en: 'Who operates this, and what if that person is unavailable?' },
    a: {
      es: 'Un equipo de ingeniería pequeño con acceso nominal por engagement — la misma gente que construyó la plataforma. La operación está automatizada con alertas con destinatario y runbooks; la continuidad contractual (acceso, documentación, reversibilidad) se pacta por escrito en el contrato enterprise.',
      en: 'A small engineering team with named access per engagement — the same people who built the platform. Operations are automated with owned alerts and runbooks; contractual continuity (access, documentation, reversibility) is agreed in writing in the enterprise contract.',
    },
  },
  {
    q: { es: '¿Cómo sabemos que el agente funciona — de verdad, no en demo?', en: 'How do we know the agent works — really, not in a demo?' },
    a: {
      es: 'Evals continuos con juez automático y rúbricas por vertical sobre conversaciones reales, no benchmarks de laboratorio. Definimos contigo qué cuenta como resolución (no containment), y revisamos los resultados en cada ciclo. La garantía de resolución con número entra con fecha, cuando se pueda medir — está en la tabla.',
      en: 'Continuous evals with an automated judge and per-vertical rubrics over real conversations, not lab benchmarks. We define with you what counts as resolution (not containment), and review results every cycle. The numeric resolution guarantee lands with a date, once measurable — it is in the table.',
    },
  },
  {
    q: { es: '¿Qué pasa cuando el agente no sabe o no debe responder?', en: 'What happens when the agent does not know or should not answer?' },
    a: {
      es: 'Escala a una persona con el contexto completo. Tres disparadores: fuera del alcance contratado, petición explícita de humano, o confianza por debajo del umbral. El handoff cae en un inbox humano nominal — WhatsApp del equipo, Slack, email o tu CRM.',
      en: 'It escalates to a person with full context. Three triggers: outside the contracted scope, an explicit request for a human, or confidence below threshold. The handoff lands in a named human inbox — your team’s WhatsApp, Slack, email or your CRM.',
    },
  },
  {
    q: { es: '¿Cuánto cuesta?', en: 'How much does it cost?' },
    a: {
      es: 'Depende de volumen, canales, integraciones y garantías contractuales. Sale de la revisión de arquitectura con desglose por escrito. Si necesitas una cifra antes de una llamada de 45 minutos con un ingeniero, probablemente aún no somos tu proveedor — y también te lo diremos.',
      en: 'It depends on volume, channels, integrations and contractual guarantees. It comes out of the architecture review, itemised in writing. If you need a number before a 45-minute call with an engineer, we are probably not your vendor yet — and we will tell you that too.',
    },
  },
  {
    q: { es: '¿Podemos empezar pequeño?', en: 'Can we start small?' },
    a: {
      es: 'Sí — es exactamente el diseño del programa de lanzamiento: piloto acotado con alcance y precio cerrados, criterios de salida definidos antes de empezar, y ampliación por fases solo si los números del piloto lo justifican.',
      en: 'Yes — that is exactly the launch program design: a scoped pilot with fixed scope and price, exit criteria defined before starting, and phased expansion only if the pilot numbers justify it.',
    },
  },
  {
    q: { es: '¿Qué necesitáis de nuestro equipo?', en: 'What do you need from our team?' },
    a: {
      es: 'Un owner de negocio para decisiones de alcance, acceso de integración a los sistemas que el agente debe usar, y a tu equipo de seguridad en la semana 1-2 — preferimos sus preguntas al principio, no en la firma. La operación diaria es nuestra, no vuestra.',
      en: 'A business owner for scope decisions, integration access to the systems the agent must use, and your security team in weeks 1-2 — we prefer their questions at the start, not at signature. Day-to-day operations are ours, not yours.',
    },
  },
] as const;

export const enterpriseFaqHeader = {
  label: { es: 'FAQ Enterprise', en: 'Enterprise FAQ' },
  meta: { es: 'Las que hace tu equipo de seguridad', en: 'The ones your security team asks' },
  headline: { es: 'Respuestas planas, sin comercial delante.', en: 'Plain answers, no salesperson in the room.' },
  intro: {
    es: 'Si tu pregunta no está, va directa al ingeniero: contacto@auphere.com.',
    en: 'If your question is not here, it goes straight to the engineer: contacto@auphere.com.',
  },
} as const;

export const enterpriseFinalCta = {
  headline: { es: 'Trae a tu equipo de seguridad. Mejor en la primera llamada que en la última.', en: 'Bring your security team. Better on the first call than the last.' },
  body: {
    es: '45 minutos con el ingeniero que opera la plataforma. Arquitectura, cumplimiento, garantías y un go/no-go honesto.',
    en: '45 minutes with the engineer who operates the platform. Architecture, compliance, guarantees, and an honest go/no-go.',
  },
  contactName: 'Luis Adrian Matos',
  contactRole: { es: 'Ingeniería · Auphere', en: 'Engineering · Auphere' },
  contactEmail: 'contacto@auphere.com',
} as const;

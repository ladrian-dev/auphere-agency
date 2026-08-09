/**
 * /partners — contenido tipado (action-plan-v3 §6.4, patrón §11.2).
 * Política de precio del canal: se publica la cuota de entrada de Referral
 * ($0, cierto hoy), el resto de la economía queda ⏸ gated hasta que cierre
 * el informe de pricing. La calculadora (A-11) está construida pero NO se
 * despliega hasta tener tramos cerrados.
 */
import type { Localized } from './enterprise';

export interface PartnerTrack {
  id: 'referral' | 'reseller' | 'embedded';
  verb: Localized;
  name: Localized;
  forWho: Localized;
  body: Localized;
  cta: Localized;
  href: string;
}

export interface DeliverableRow {
  label: Localized;
  status: 'today' | 'dated';
  dateText?: Localized;
}

export const partnersMeta = {
  title: {
    es: 'Partners · Vende IA mañana. La plataforma la operamos nosotros',
    en: 'Partners · Sell AI tomorrow. We operate the platform',
  },
  description: {
    es: 'Programa de partners de Auphere: revende o integra agentes de IA operados 24/7 bajo tu marca. Tú pones el cliente; nosotros la infraestructura, la operación y las garantías. $0 de entrada en Referral.',
    en: "Auphere partner program: resell or embed AI agents operated 24/7 under your brand. You bring the customer; we bring the infrastructure, operations and guarantees. $0 entry for Referral.",
  },
} as const;

export const partnersHero = {
  eyebrow: { es: 'PARTNERS · AUPHERE NETWORK', en: 'PARTNERS · AUPHERE NETWORK' },
  headline: { es: 'Vende IA mañana. La plataforma la operamos nosotros.', en: 'Sell AI tomorrow. We operate the platform.' },
  subheadline: {
    es: 'Tú pones el cliente. Nosotros ponemos la infraestructura, la operación 24/7 y las garantías. Sin construir un equipo de IA, sin madrugadas de guardia.',
    en: 'You bring the customer. We bring the infrastructure, 24/7 operations and the guarantees. No AI team to build, no 3 a.m. pager.',
  },
  ctaPrimary: { es: 'Aplicar al programa', en: 'Apply to the program' },
  ctaSecondary: { es: 'Ver las tres vías', en: 'See the three tracks' },
  ctaTertiary: { es: 'Documentación de la API', en: 'API documentation' },
  microcopy: {
    es: 'Respuesta en 48 h laborables, de una persona con nombre.',
    en: 'Reply within 48 business hours, from a person with a name.',
  },
} as const;

/** 02 — Selector de tres vías con verbos (patrón Zendesk/Cognigy). */
export const partnerTracks: readonly PartnerTrack[] = [
  {
    id: 'referral',
    verb: { es: 'Recomienda', en: 'Refer' },
    name: { es: 'Referral', en: 'Referral' },
    forWho: { es: 'Consultores y profesionales con cartera', en: 'Consultants and professionals with a client base' },
    body: {
      es: 'Presentas al cliente, nosotros cerramos y operamos, tú cobras comisión recurrente. $0 de entrada. La forma de probar el programa sin comprometerte.',
      en: 'You introduce the client, we close and operate, you earn a recurring commission. $0 entry. The way to try the program with zero commitment.',
    },
    cta: { es: 'Aplicar como Referral', en: 'Apply as Referral' },
    href: '#apply',
  },
  {
    id: 'reseller',
    verb: { es: 'Revende', en: 'Resell' },
    name: { es: 'Reseller', en: 'Reseller' },
    forWho: { es: 'Agencias, integradores y MSPs', en: 'Agencies, integrators and MSPs' },
    body: {
      es: 'Vendes bajo tu marca y a tu precio de lista, gestionas la relación, y la plataforma, la operación y las garantías son nuestras. El cliente es tuyo — también en el contrato.',
      en: 'You sell under your brand at your list price and own the relationship; the platform, operations and guarantees are ours. The customer is yours — in the contract too.',
    },
    cta: { es: 'Aplicar como Reseller', en: 'Apply as Reseller' },
    href: '#apply',
  },
  {
    id: 'embedded',
    verb: { es: 'Integra', en: 'Embed' },
    name: { es: 'Embedded', en: 'Embedded' },
    forWho: { es: 'Productos SaaS, ERPs verticales, plataformas', en: 'SaaS products, vertical ERPs, platforms' },
    body: {
      es: 'IA dentro de tu producto vía API: tu marca, tu factura, nuestra infraestructura. Página propia con el contrato técnico y su tabla de fechas.',
      en: 'AI inside your product via API: your brand, your invoice, our infrastructure. It has its own page with the technical contract and its dated table.',
    },
    cta: { es: 'Ver Embedded →', en: 'See Embedded →' },
    href: '/partners/embedded',
  },
] as const;

/** 03 — Los tres números ⏸ gated: solo lo cierto hoy. */
export const economicsGated = {
  headline: { es: 'La economía, sin teatro', en: 'The economics, no theater' },
  entryFee: {
    label: { es: 'Entrada en Referral', en: 'Referral entry fee' },
    value: '$0',
    note: { es: 'Cierto hoy, sin condiciones escondidas', en: 'True today, no hidden conditions' },
  },
  gatedBody: {
    es: 'El punto de equilibrio, los tramos por volumen y el precio unitario se abren en la primera llamada, con la hoja delante y tus números — no publicamos una aritmética que enseñe el suelo de negociación de nuestros partners. Lo que sí te decimos ya: el modelo está diseñado para que ganes dinero desde el primer cliente, y el precio por cliente baja por tramos.',
    en: 'The break-even point, volume tiers and unit pricing open up in the first call, with the sheet in front of you and your numbers — we do not publish arithmetic that exposes our partners’ negotiation floor. What we will tell you now: the model is designed so you make money from your first client, and per-client pricing drops by tier.',
  },
} as const;

/** 05 — Qué recibes y cuándo (un partner fundador tolera el mes 5 si se lo dices; no tolera descubrirlo). */
export const deliverables: readonly DeliverableRow[] = [
  {
    label: { es: 'Onboarding técnico y materiales de venta co-branded', en: 'Technical onboarding and co-branded sales materials' },
    status: 'today',
  },
  {
    label: { es: 'Ingeniería en la implantación de tus primeros clientes', en: 'Engineering on your first client rollouts' },
    status: 'today',
  },
  {
    label: { es: 'Backchannel directo con el equipo que opera (WhatsApp/Slack)', en: 'Direct backchannel with the operating team (WhatsApp/Slack)' },
    status: 'today',
  },
  {
    label: { es: 'Registro de oportunidad por escrito (protege tu deal)', en: 'Written deal registration (protects your deal)' },
    status: 'today',
  },
  {
    label: { es: 'Consola de partners: prompts, sandbox, versiones, consumo por cliente', en: 'Partner console: prompts, sandbox, versions, per-client usage' },
    status: 'dated',
    dateText: { es: 'Mes 5 del programa — en el roadmap técnico con fase asignada', en: 'Month 5 of the program — in the technical roadmap with an assigned phase' },
  },
  {
    label: { es: 'Conector MCP: ajusta los agentes de tus clientes desde tu propio Claude', en: 'MCP connector: tune your clients’ agents from your own Claude' },
    status: 'dated',
    dateText: { es: 'Con la consola — ni Retell ni Vapi lo ofrecen', en: 'Ships with the console — neither Retell nor Vapi offers this' },
  },
] as const;

/** 06 — Co-branded, superficie por superficie. */
export const cobranding = {
  headline: { es: 'Tu marca y la nuestra, superficie por superficie', en: 'Your brand and ours, surface by surface' },
  yours: {
    title: { es: 'Tu marca — lo que ve tu cliente', en: 'Your brand — what your customer sees' },
    items: [
      { es: 'El agente y todos sus canales (WhatsApp, Instagram, voz)', en: 'The agent and all its channels (WhatsApp, Instagram, voice)' },
      { es: 'Propuestas, materiales y precio de venta', en: 'Proposals, materials and sale price' },
      { es: 'La relación comercial y la factura (Reseller)', en: 'The commercial relationship and the invoice (Reseller)' },
    ],
  },
  ours: {
    title: { es: 'Marca Auphere — lo contractual y de cumplimiento', en: 'Auphere brand — contractual and compliance surfaces' },
    items: [
      { es: 'DPA y documentación de seguridad', en: 'DPA and security documentation' },
      { es: 'Divulgación art. 50: bajo marca blanca, el reseller pasa a ser proveedor a efectos del Reglamento — la cláusula lo deja claro y te protege', en: 'Article 50 disclosure: under white label, the reseller becomes the provider under the Act — the clause makes it explicit and protects you' },
      { es: 'Garantías de operación y sus fechas', en: 'Operational guarantees and their dates' },
    ],
  },
} as const;

/** 07 — Soporte: qué haces tú, qué hacemos nosotros. */
export const supportSplit = {
  you: {
    title: { es: 'Tú', en: 'You' },
    items: [
      { es: 'La relación con tu cliente y la primera línea ("¿puede el agente hacer X?")', en: 'Your client relationship and first line ("can the agent do X?")' },
      { es: 'El contexto del negocio: qué flujos importan, qué tono, qué reglas', en: 'Business context: which flows matter, which tone, which rules' },
      { es: 'La venta y la expansión de tu cartera', en: 'Selling and growing your book' },
    ],
  },
  us: {
    title: { es: 'Nosotros', en: 'Us' },
    items: [
      { es: 'Operación 24/7, incidentes y su resolución — con compromiso de respuesta de partner por contrato', en: '24/7 operations, incidents and their resolution — with a contractual partner response commitment' },
      { es: 'Configuración, integraciones, evals y ciclo de mejora', en: 'Configuration, integrations, evals and the improvement cycle' },
      { es: 'Escalados técnicos de tus clientes, contigo en copia', en: 'Technical escalations from your clients, with you in the loop' },
    ],
  },
} as const;

/** 08 — Tiers: solo Node publicado hasta tener 5 partners (patrón Parloa). */
export const tiers = {
  headline: { es: 'Empiezas en Node', en: 'You start at Node' },
  body: {
    es: 'Node es el tier de entrada del programa: economía completa, soporte de ingeniería y materiales co-branded. Los tiers superiores (Hub · Core) existen y se abren por volumen y certificación — publicaremos sus condiciones cuando el programa tenga masa crítica, no antes.',
    en: 'Node is the entry tier: full economics, engineering support and co-branded materials. The upper tiers (Hub · Core) exist and unlock by volume and certification — we will publish their terms when the program has critical mass, not before.',
  },
} as const;

/** 09 — Proceso con tiempos honestos. */
export const partnerProcess = [
  {
    period: { es: '48 h', en: '48 h' },
    title: { es: 'Aplicación y respuesta', en: 'Application and reply' },
    body: {
      es: 'Formulario de 8 campos. Te responde una persona con nombre, no un autoresponder. Si no hay encaje, también te lo decimos.',
      en: 'An 8-field form. A named person replies, not an autoresponder. If there is no fit, we say that too.',
    },
  },
  {
    period: { es: 'Semana 1', en: 'Week 1' },
    title: { es: 'Llamada de economía', en: 'Economics call' },
    body: {
      es: 'Tramos, punto de equilibrio y contrato sobre la mesa, con tus números. Sales sabiendo exactamente qué ganas con tu cartera actual.',
      en: 'Tiers, break-even and contract on the table, with your numbers. You leave knowing exactly what your current book earns.',
    },
  },
  {
    period: { es: 'Semanas 2-14', en: 'Weeks 2-14' },
    title: { es: 'Primer cliente en producción', en: 'First client in production' },
    body: {
      es: 'El paso que más retrasa es la verificación de Meta Business del cliente — no depende de nosotros y puede tardar semanas. De aplicación a primer cliente operando: 10-14 semanas reales, no un "<21 días" que luego se incumple.',
      en: "The slowest step is the client's Meta Business verification — outside our control and can take weeks. From application to first operating client: a real 10-14 weeks, not a '<21 days' that gets missed.",
    },
  },
  {
    period: { es: 'Continuo', en: 'Ongoing' },
    title: { es: 'Operación y expansión', en: 'Operations and expansion' },
    body: {
      es: 'Nosotros operamos; tú vendes. Revisión conjunta de cartera cada mes: qué clientes van bien, dónde hay expansión, qué aprende el programa.',
      en: 'We operate; you sell. Joint book review every month: which clients are healthy, where expansion lives, what the program learns.',
    },
  },
] as const;

/** 10 — Las preguntas contractuales que ningún programa responde (§9.4). */
export const partnersFaq = [
  {
    q: { es: '¿De quién es el cliente?', en: 'Who owns the customer?' },
    a: {
      es: 'Tuyo. En Reseller, el contrato comercial es entre tú y tu cliente; nosotros firmamos contigo. El registro de oportunidad por escrito impide que Auphere venda directo a un cliente que tú registraste. Y no hacemos outbound sobre carteras de partners: está en el contrato.',
      en: 'Yours. In Reseller, the commercial contract is between you and your client; we contract with you. Written deal registration prevents Auphere from selling direct to a client you registered. And we do not run outbound on partner books: it is in the contract.',
    },
  },
  {
    q: { es: 'Si me voy, ¿me llevo los datos de mis clientes?', en: 'If I leave, do I take my clients’ data?' },
    a: {
      es: 'Sí. Los datos de las conversaciones de tus clientes son de tus clientes; a la salida se exportan en formato estándar y se borran de nuestra plataforma según el DPA. La reversibilidad está pactada por escrito antes de empezar, no negociada al salir.',
      en: 'Yes. Your clients’ conversation data belongs to your clients; on exit it is exported in a standard format and deleted from our platform per the DPA. Reversibility is agreed in writing before starting, not negotiated on the way out.',
    },
  },
  {
    q: { es: '¿Puedo migrar a otro proveedor después?', en: 'Can I migrate to another provider later?' },
    a: {
      es: 'Puedes. Prompts, flujos y datos exportables; sin permanencia más allá del ciclo de facturación pactado. Nuestro lock-in preferido es que la operación sea tan buena que no quieras irte — no una cláusula.',
      en: 'You can. Prompts, flows and data are exportable; no lock-in beyond the agreed billing cycle. Our preferred lock-in is operations so good you do not want to leave — not a clause.',
    },
  },
  {
    q: { es: '¿Y si Auphere cierra?', en: 'What if Auphere shuts down?' },
    a: {
      es: 'Cláusula de continuidad: preaviso contractual, exportación completa de datos y configuraciones, y documentación técnica suficiente para migrar. Es la pregunta que nadie hace en la demo y todos deberían hacer en el contrato.',
      en: 'Continuity clause: contractual notice, full export of data and configurations, and enough technical documentation to migrate. It is the question nobody asks in the demo and everyone should ask in the contract.',
    },
  },
  {
    q: { es: 'Si el agente falla con mi cliente, ¿quién responde?', en: 'If the agent fails my client, who answers for it?' },
    a: {
      es: 'Ante tu cliente, tú — es tu marca. Ante ti, nosotros: compromiso de respuesta a incidentes por contrato, backchannel directo con el equipo que opera, y postmortem sin culpa de cualquier incidente material. Tu exposición está acotada por escrito.',
      en: 'To your client, you — it is your brand. To you, us: a contractual incident-response commitment, a direct backchannel with the operating team, and a blameless postmortem for any material incident. Your exposure is bounded in writing.',
    },
  },
  {
    q: { es: '¿Y si mi cliente no paga?', en: 'What if my client does not pay?' },
    a: {
      es: 'En Reseller el riesgo de cobro es tuyo (facturas tú); el contrato define la ventana de gracia y la suspensión coordinada del servicio — nunca cortamos a tu cliente sin avisarte a ti primero. En Referral facturamos nosotros y el riesgo es nuestro.',
      en: 'In Reseller, collection risk is yours (you invoice); the contract defines the grace window and coordinated service suspension — we never cut off your client without telling you first. In Referral we invoice and the risk is ours.',
    },
  },
  {
    q: { es: '¿Vais a venderle directo a mis clientes?', en: 'Will you sell direct to my clients?' },
    a: {
      es: 'No. Registro de oportunidad por escrito y prohibición contractual de outbound sobre tu cartera. Además el partner vende a precio de lista: no existe el incentivo de "Auphere más barato por detrás".',
      en: 'No. Written deal registration and a contractual ban on outbound over your book. Partners sell at list price: there is no "cheaper direct from Auphere" backdoor incentive.',
    },
  },
  {
    q: { es: '¿Quién es el proveedor a efectos del art. 50?', en: 'Who is the provider under Article 50?' },
    a: {
      es: 'Bajo marca blanca, tú — el Reglamento mira la marca con la que el sistema llega al mercado. Por eso la divulgación de IA viene activada de serie y no es desactivable, y la cláusula de canal reparte las obligaciones por escrito. Es protección, no burocracia.',
      en: 'Under white label, you — the Act looks at the brand under which the system reaches the market. That is why AI disclosure ships enabled and cannot be turned off, and the channel clause splits obligations in writing. It is protection, not bureaucracy.',
    },
  },
  {
    q: { es: 'Facturación, IVA y tipo de cambio', en: 'Invoicing, VAT and currency' },
    a: {
      es: 'Reseller: nos facturas/te facturamos en EUR o USD según tu jurisdicción, con IVA/impuestos según tu país; tú facturas a tu cliente como quieras. Referral: comisión liquidada mensualmente contra factura tuya. El detalle fiscal exacto va en la llamada de economía.',
      en: 'Reseller: we invoice each other in EUR or USD depending on your jurisdiction, taxes per your country; you invoice your client however you like. Referral: commission settled monthly against your invoice. Exact tax detail is covered in the economics call.',
    },
  },
  {
    q: { es: '¿Cuál es mi margen exacto?', en: 'What is my exact margin?' },
    a: {
      es: 'Se define en la llamada según tramo y volumen — no lo publicamos porque publicar la aritmética completa enseñaría el suelo de negociación de todos los partners. Lo que sí es público: $0 de entrada en Referral, precio de lista para el partner, y un modelo diseñado para ganar desde el primer cliente.',
      en: 'Defined in the call by tier and volume — we do not publish it because full arithmetic would expose every partner’s negotiation floor. What is public: $0 Referral entry, list-price selling for partners, and a model designed to earn from the first client.',
    },
  },
] as const;

export const partnersFaqHeader = {
  label: { es: 'FAQ de partners', en: 'Partner FAQ' },
  meta: { es: 'Las contractuales, no las cómodas', en: 'The contractual ones, not the comfortable ones' },
  headline: { es: 'Las nueve preguntas que otros programas esquivan.', en: 'The nine questions other programs dodge.' },
  intro: {
    es: 'Si falta la tuya: contacto@auphere.com — respuesta de una persona con nombre.',
    en: 'If yours is missing: contacto@auphere.com — a named person replies.',
  },
} as const;

/** 11 — Formulario. */
export const applyForm = {
  headline: { es: 'Aplica al programa', en: 'Apply to the program' },
  intro: {
    es: '8 campos, 2 minutos. Con menos de 3 clientes potenciales te proponemos empezar por Referral; con 3 o más, llamada de Reseller con la economía sobre la mesa.',
    en: 'Eight fields, two minutes. With fewer than 3 potential clients we will suggest starting as Referral; with 3+, a Reseller call with the economics on the table.',
  },
  fields: {
    name: { es: 'Nombre y apellidos', en: 'Full name' },
    email: { es: 'Email de trabajo', en: 'Work email' },
    company: { es: 'Empresa / marca', en: 'Company / brand' },
    website: { es: 'Web o LinkedIn', en: 'Website or LinkedIn' },
    clients: { es: '¿A cuántos clientes podrías ofrecérselo en 6 meses?', en: 'How many clients could you offer this to in 6 months?' },
    vertical: { es: 'Vertical principal de tu cartera', en: 'Main vertical of your book' },
    country: { es: 'País', en: 'Country' },
    notes: { es: '¿Algo que debamos saber? (opcional)', en: 'Anything we should know? (optional)' },
  },
  clientOptions: [
    { value: '0-2', label: { es: '0-2', en: '0-2' } },
    { value: '3-10', label: { es: '3-10', en: '3-10' } },
    { value: '11-50', label: { es: '11-50', en: '11-50' } },
    { value: '50+', label: { es: 'Más de 50', en: 'More than 50' } },
  ],
  verticalOptions: [
    { value: 'health', label: { es: 'Salud y clínicas', en: 'Health and clinics' } },
    { value: 'beauty', label: { es: 'Belleza y bienestar', en: 'Beauty and wellness' } },
    { value: 'hospitality', label: { es: 'Hostelería y reservas', en: 'Hospitality and bookings' } },
    { value: 'retail', label: { es: 'Retail y e-commerce', en: 'Retail and e-commerce' } },
    { value: 'services', label: { es: 'Servicios profesionales', en: 'Professional services' } },
    { value: 'software', label: { es: 'Software / SaaS', en: 'Software / SaaS' } },
    { value: 'other', label: { es: 'Otro', en: 'Other' } },
  ],
  submit: { es: 'Enviar aplicación', en: 'Submit application' },
  sending: { es: 'Enviando…', en: 'Sending…' },
  success: {
    es: 'Recibida. Te respondemos en 48 h laborables — una persona, no un autoresponder.',
    en: 'Received. We reply within 48 business hours — a person, not an autoresponder.',
  },
  error: {
    es: 'No se pudo enviar. Escríbenos directo: contacto@auphere.com',
    en: 'Could not send. Write to us directly: contacto@auphere.com',
  },
  validation: {
    required: { es: 'Obligatorio', en: 'Required' },
    email: { es: 'Email no válido', en: 'Invalid email' },
  },
} as const;

export const partnersFinalCta = {
  headline: { es: 'El programa es joven. Eso es exactamente la oportunidad.', en: 'The program is young. That is exactly the opportunity.' },
  body: {
    es: 'Los primeros partners entran con acceso directo a ingeniería, condiciones de fundador y voz en el roadmap. Cuando publiquemos los tiers completos, esa ventana se cierra.',
    en: 'The first partners get direct engineering access, founder terms and a voice on the roadmap. When we publish the full tiers, that window closes.',
  },
} as const;

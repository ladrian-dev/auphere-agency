/**
 * Páginas de regulación (action-plan-v3 §6.9 y §6.10).
 * /es/ley-10-2025-atencion-cliente — ES only, la de mayor intención comercial.
 * /eu-ai-act-article-50 — EN+ES, imán AEO + enterprise.
 * Patrón answer-first (§8.4): cada bloque arranca con una respuesta autónoma.
 */
import type { Localized } from './enterprise';

export const LEY_DEADLINE_ISO = '2026-12-28T00:00:00+01:00';
export const BOE_URL = 'https://www.boe.es/buscar/act.php?id=BOE-A-2025-26698';

export const leyMeta = {
  title: 'Ley 10/2025: tu bot debe ofrecer un humano desde el 28-dic-2026',
  description:
    'La Ley 10/2025 obliga desde el 28 de diciembre de 2026 a que los bots de atención al cliente ofrezcan atención humana desde el menú inicial y en cualquier momento. A quién aplica, qué exige exactamente, los tres errores típicos y cómo cumplirla con un agente que ya lo hace.',
} as const;

export const leyHero = {
  eyebrow: 'LEY 10/2025 · ATENCIÓN AL CLIENTE',
  headline: 'Desde el 28 de diciembre de 2026, tu bot tiene que ofrecer un humano.',
  sub: 'Ley 10/2025, artículo 8.2. Si tu empresa tiene más de 250 empleados, factura más de 50 M€ o presta un servicio básico, te aplica.',
  daysLabel: 'días para la fecha',
  cta: 'Revisión de cumplimiento · 45 min',
  ctaSecondary: 'Ver el texto en el BOE',
} as const;

/** 02 — ¿Te aplica? Test de 4 preguntas, client-side, sin formulario. */
export const applicabilityTest = {
  headline: '¿Te aplica?',
  intro: 'Cuatro preguntas, resultado inmediato. No guardamos nada.',
  questions: [
    '¿Tu empresa tiene 250 empleados o más?',
    '¿Facturáis más de 50 M€ al año (o vuestro balance supera 43 M€)?',
    '¿Prestáis un servicio básico de interés general (agua, energía, transporte, telecomunicaciones, servicios financieros, postales, audiovisuales)?',
    '¿Usáis (o vais a usar) un bot, IVR o asistente automático en la atención al cliente?',
  ],
  verdictApplies:
    'Te aplica. Si a cualquiera de las tres primeras respondiste sí y usáis atención automatizada, el artículo 8.2 te obliga desde el 28-dic-2026: atención humana ofrecida desde el menú inicial y accesible en cualquier momento de la conversación.',
  verdictMaybe:
    'Probablemente no te obliga por tamaño — pero el mercado sí: tus clientes grandes exigirán a sus proveedores el mismo estándar, y la atención humana accesible convierte mejor en cualquier tamaño.',
  note: 'Criterios del ámbito subjetivo: ≥250 empleados, >50 M€ de facturación o >43 M€ de balance, y todos los prestadores de servicios básicos con independencia del tamaño.',
} as const;

/** 03 — Qué obliga exactamente (answer-first). */
export const leyObligations = {
  headline: 'Qué obliga, exactamente',
  answer:
    'Tres cosas: que el menú inicial ofrezca la opción de hablar con una persona; que el cliente pueda pedir un humano en cualquier momento de la interacción con el bot y sea transferido; y que la atención personalizada llegue en un tiempo medio inferior a 3 minutos para el 95% de las solicitudes.',
  items: [
    {
      title: 'Humano en el menú inicial',
      body: 'La opción de atención personalizada no puede estar escondida en el nivel 4 del árbol. Desde el primer menú, el cliente debe poder elegir persona.',
    },
    {
      title: 'Humano en cualquier momento',
      body: 'Si el cliente se lo pide al bot a mitad de conversación, la transferencia a una persona debe producirse — no un bucle de "¿en qué más puedo ayudarte?".',
    },
    {
      title: '3 minutos de media, 95% de los casos',
      body: 'Para servicios básicos, la atención personalizada tiene un objetivo de tiempo: media inferior a 3 minutos en el 95% de las solicitudes de atención.',
    },
  ],
} as const;

/** 04 — Los tres errores típicos. */
export const leyMistakes = {
  headline: 'Qué NO es suficiente',
  items: [
    {
      title: 'Un "escribe AGENTE" enterrado en la FAQ',
      body: 'La ley pide la opción desde el menú inicial y en cualquier momento. Un comando oculto que hay que adivinar no es una opción ofrecida.',
    },
    {
      title: 'Un formulario de contacto como "atención humana"',
      body: 'Derivar a un formulario con respuesta en 72 h no es transferir a una persona. La atención personalizada tiene objetivo de minutos, no de días.',
    },
    {
      title: 'Apagar el bot fuera de horario sin alternativa',
      body: 'Si el canal automatizado está activo 24/7, la vía hacia una persona también tiene que estar definida — aunque sea con callback comprometido al abrir el horario de atención.',
    },
  ],
} as const;

/** 05 — Cómo lo cumple un agente de Auphere (todo claims live). */
export const leyCompliance = {
  headline: 'Cómo lo cumple un agente de Auphere — hoy, no en un roadmap',
  answer:
    'El escalado a humano viene activado de serie en todo agente de Auphere: tres disparadores (petición explícita, fuera de alcance, confianza baja), transferencia con el contexto completo de la conversación, y entrega en un inbox nominal de tu equipo — WhatsApp, Slack, email o tu CRM.',
  items: [
    {
      title: 'Tres disparadores, no uno',
      body: 'El cliente que pide una persona la obtiene — y también el caso que el agente no debe resolver y la conversación donde su confianza baja del umbral. La ley pide el primero; la operación seria exige los tres.',
    },
    {
      title: 'Contexto completo en el handoff',
      body: 'Tu equipo recibe la conversación entera, no un "cliente enfadado en línea 2". El cliente no repite su historia: ese es el 80% de la frustración que la ley intenta eliminar.',
    },
    {
      title: 'Y el art. 50 europeo, de paso',
      body: 'Desde agosto de 2026, el Reglamento europeo de IA exige que el usuario sepa que habla con una IA. Todo agente de Auphere se identifica como IA desde el primer mensaje — cumples las dos normas con el mismo diseño.',
    },
  ],
} as const;

/** 07 — Checklist (inline — sin muros, §8.4.8). */
export const leyChecklist = {
  headline: 'Checklist de cumplimiento',
  intro: 'Publicada entera, sin formulario. Si quieres el PDF para tu expediente, pídelo y te lo mandamos.',
  items: [
    'El menú inicial de tu bot ofrece explícitamente hablar con una persona',
    'Pedir un humano funciona en cualquier punto de la conversación, no solo al inicio',
    'La transferencia lleva el contexto completo (el cliente no repite)',
    'Hay un objetivo de tiempo medido para la atención personalizada (<3 min de media, 95%)',
    'El circuito está definido también fuera de horario (callback comprometido)',
    'El bot se identifica como IA desde el primer mensaje (art. 50 del Reglamento europeo)',
    'Todo lo anterior está documentado por si un consumidor o la autoridad lo pide',
  ],
  requestPdf: 'Pedir el checklist en PDF',
} as const;

export const leyFaq = [
  {
    q: '¿Desde cuándo es exigible?',
    a: 'El grueso de la Ley 10/2025 de servicios de atención a la clientela entra en aplicación el 28 de diciembre de 2026. La obligación de atención humana desde el menú inicial y en cualquier momento (art. 8.2) es exigible desde esa fecha.',
  },
  {
    q: '¿A quién aplica exactamente?',
    a: 'A empresas con 250 o más empleados, o más de 50 M€ de facturación anual, o más de 43 M€ de balance — y a todos los prestadores de servicios básicos de interés general (agua, energía, transporte, telecomunicaciones, servicios financieros, postales, audiovisuales) con independencia de su tamaño.',
  },
  {
    q: '¿Prohíbe usar bots de atención al cliente?',
    a: 'No. Regula cómo usarlos: el bot puede atender, pero la vía hacia una persona debe estar ofrecida desde el menú inicial y disponible en cualquier momento. Un agente bien diseñado cumple la ley y además resuelve la mayoría de casos sin necesitar el escalado.',
  },
  {
    q: '¿Qué pasa si no cumplo?',
    a: 'El régimen sancionador de la ley prevé multas que escalan con la gravedad y la reincidencia, y el incumplimiento en servicios básicos se considera especialmente grave. Pero el coste real suele llegar antes: reclamaciones, arbitraje de consumo y churn de clientes que no encuentran una persona.',
  },
  {
    q: 'Mi bot actual no sabe escalar. ¿Cuánto se tarda en cumplir?',
    a: 'Con un agente de Auphere, el escalado a humano viene activado de serie — el trabajo es la configuración a tu operación (equipo receptor, horarios, umbrales), que forma parte de la implantación normal de 2 a 6 semanas. Llegas antes de la fecha con margen.',
  },
  {
    q: '¿Esto tiene que ver con el Reglamento europeo de IA?',
    a: 'Son normas distintas que se solapan en el mismo diseño: la Ley 10/2025 (española) exige poder llegar a un humano; el art. 50 del Reglamento europeo (aplicable desde agosto de 2026) exige que el usuario sepa que habla con una IA. Un agente que se identifica como IA y escala a una persona cumple ambas.',
  },
] as const;

export const leyCta = {
  headline: 'Faltan meses, no años. Y tu bot actual probablemente no cumple.',
  body: 'Revisión de cumplimiento de 45 minutos con un ingeniero: auditamos tu flujo actual contra el art. 8.2, te decimos qué falta, y sales con un plan — trabajes con nosotros o no.',
} as const;

/* ══════════════════════════ /eu-ai-act-article-50 ══════════════════════════ */

export const art50Meta = {
  title: {
    es: 'Art. 50 del Reglamento de IA: tu chatbot debe decir que es una IA',
    en: 'EU AI Act Article 50: your chatbot must disclose it is an AI',
  },
  description: {
    es: 'Desde el 2 de agosto de 2026, el artículo 50 del Reglamento europeo de IA obliga a que las personas sepan que interactúan con una IA. Qué exige, a quién, qué pasa con la marca blanca y cómo cumplirlo por diseño.',
    en: 'Since August 2, 2026, Article 50 of the EU AI Act requires people to know they are interacting with an AI. What it demands, who it binds, how white-label changes it, and how to comply by design.',
  },
} as const;

export const art50Hero = {
  eyebrow: { es: 'REGLAMENTO EUROPEO DE IA · ART. 50', en: 'EU AI ACT · ARTICLE 50' },
  headline: {
    es: 'Sí: tu chatbot tiene que decir que es una IA.',
    en: 'Yes: your chatbot has to say it is an AI.',
  },
  sub: {
    es: 'Aplicable desde el 2 de agosto de 2026. La respuesta corta a "do chatbots have to disclose they are AI in the EU" es sí — y el deber es de diseño, no un disclaimer en los términos.',
    en: 'Applicable since August 2, 2026. The short answer to "do chatbots have to disclose they are AI in the EU" is yes — and it is a design duty, not a disclaimer in your terms.',
  },
} as const;

/** Answer-first blocks (40-60 palabras, citables fuera de contexto). */
export const art50Blocks = [
  {
    title: { es: 'Qué exige el artículo 50', en: 'What Article 50 requires' },
    answer: {
      es: 'Los sistemas de IA destinados a interactuar con personas deben diseñarse de modo que la persona sepa que interactúa con una IA, salvo que resulte evidente por el contexto. Para un chatbot de atención al cliente, eso significa identificarse como IA desde el primer contacto — no tras la tercera pregunta.',
      en: 'AI systems intended to interact with people must be designed so the person knows they are interacting with an AI, unless it is obvious from context. For a customer-service chatbot, that means identifying as AI from first contact — not after the third question.',
    },
  },
  {
    title: { es: 'A quién obliga', en: 'Who it binds' },
    answer: {
      es: 'El deber de diseño recae en el proveedor del sistema. Si el sistema llega al mercado bajo tu marca — marca blanca incluida — el proveedor a efectos del Reglamento eres tú. Y si el output se usa en la UE, aplica aunque tu empresa no esté establecida en la UE.',
      en: 'The design duty falls on the provider of the system. If the system reaches the market under your brand — white label included — you are the provider for the purposes of the Act. And if the output is used in the EU, it applies even if your company is not established in the EU.',
    },
  },
  {
    title: { es: 'Desde cuándo y qué riesgo hay', en: 'Since when, and what is at risk' },
    answer: {
      es: 'Las obligaciones de transparencia del art. 50 son aplicables desde el 2 de agosto de 2026. El régimen sancionador del Reglamento prevé multas significativas, pero el riesgo inmediato es contractual y comercial: los compradores enterprise ya preguntan por el art. 50 en sus cuestionarios de proveedores.',
      en: 'The transparency obligations of Article 50 apply since August 2, 2026. The Act provides for significant fines, but the immediate risk is contractual and commercial: enterprise buyers already ask about Article 50 in their vendor questionnaires.',
    },
  },
  {
    title: { es: 'Por qué cumplirlo convierte mejor', en: 'Why complying converts better' },
    answer: {
      es: 'La evidencia de operación real va en contra del mito: lo que la gente valora de un agente no es que parezca humano, es que resuelva. Identificarse como IA y ofrecer una persona a un toque genera más confianza — y más conversión — que la ambigüedad.',
      en: 'Real-world operation goes against the myth: what people value in an agent is not that it seems human, it is that it solves their problem. Identifying as AI and offering a person one tap away builds more trust — and more conversion — than ambiguity.',
    },
  },
  {
    title: { es: 'Cómo se cumple por diseño', en: 'How to comply by design' },
    answer: {
      es: 'Divulgación en el primer mensaje de cada canal (en voz, al inicio de la llamada), sin opción de desactivarla; escalado a humano siempre disponible; y el reparto de responsabilidad proveedor/desplegador por escrito en el contrato. Así es como lo construye Auphere de serie — la postura completa está publicada en /trust.',
      en: 'Disclosure in the first message of every channel (on voice, at the start of the call), with no off switch; human escalation always available; and the provider/deployer responsibility split in writing in the contract. That is how Auphere builds it by default — the full posture is published at /trust.',
    },
  },
] as const;

export const art50Faq = [
  {
    q: { es: '¿Basta con ponerlo en los términos y condiciones?', en: 'Is putting it in the terms and conditions enough?' },
    a: {
      es: 'No. El art. 50 es un deber de diseño del sistema: la persona debe saberlo al interactuar, no poder descubrirlo si lee un documento legal. La divulgación va en la conversación.',
      en: 'No. Article 50 is a system design duty: the person must know while interacting, not be able to find out if they read a legal document. The disclosure goes in the conversation.',
    },
  },
  {
    q: { es: 'Vendo un chatbot con marca blanca. ¿Quién responde?', en: 'I sell a white-label chatbot. Who is liable?' },
    a: {
      es: 'El Reglamento mira la marca con la que el sistema llega al mercado: bajo marca blanca, el reseller pasa a ser proveedor a efectos del art. 50. Por eso en el programa de partners de Auphere la divulgación viene activada de serie y no es desactivable, y la cláusula de canal reparte las obligaciones por escrito.',
      en: 'The Act looks at the brand under which the system reaches the market: under white label, the reseller becomes the provider for Article 50 purposes. That is why in Auphere’s partner program the disclosure ships enabled and cannot be turned off, and the channel clause splits the obligations in writing.',
    },
  },
  {
    q: { es: '¿Aplica a las llamadas de voz con IA?', en: 'Does it apply to AI voice calls?' },
    a: {
      es: 'Sí. En voz, la divulgación se hace al inicio de la llamada. Las voces neurales realistas hacen la divulgación más necesaria, no menos.',
      en: 'Yes. On voice, disclosure happens at the start of the call. Realistic neural voices make disclosure more necessary, not less.',
    },
  },
  {
    q: { es: '¿Y si mi empresa no está en la UE?', en: 'What if my company is not in the EU?' },
    a: {
      es: 'Si el output del sistema se utiliza en la UE, el Reglamento aplica con independencia de dónde esté establecido el proveedor. La extraterritorialidad es explícita.',
      en: 'If the system’s output is used in the EU, the Act applies regardless of where the provider is established. The extraterritoriality is explicit.',
    },
  },
  {
    q: { es: '¿Se relaciona con la Ley 10/2025 española?', en: 'How does it relate to Spain’s Ley 10/2025?' },
    a: {
      es: 'Se complementan: el art. 50 exige que el usuario sepa que habla con una IA; la Ley 10/2025 exige (desde el 28-dic-2026) poder llegar a una persona desde el menú inicial y en cualquier momento. Un agente que se identifica como IA y escala a humano cumple las dos con el mismo diseño.',
      en: 'They complement each other: Article 50 requires the user to know they are talking to an AI; Spain’s Ley 10/2025 requires (from Dec 28, 2026) being able to reach a person from the first menu and at any time. An agent that identifies as AI and escalates to a human satisfies both with one design.',
    },
  },
] as const;

export const art50Cta = {
  headline: { es: '¿Tu agente actual cumple el art. 50?', en: 'Does your current agent comply with Article 50?' },
  body: {
    es: 'Los agentes de Auphere se identifican como IA de serie y escalan a humano siempre. Si el tuyo no, la revisión de 45 minutos te dice exactamente qué falta.',
    en: 'Auphere agents identify as AI by default and always escalate to a human. If yours does not, the 45-minute review tells you exactly what is missing.',
  },
  cta: { es: 'Revisión de cumplimiento · 45 min', en: 'Compliance review · 45 min' },
} as const;

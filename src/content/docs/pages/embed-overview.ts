import type { DocPage } from '../types';

export const embedOverview: DocPage = {
  slug: ['embed'],
  group: 'start',
  en: {
    title: 'Overview',
    description:
      'Auphere Embed lets your SaaS platform offer WhatsApp agents and template broadcasts to your own clients — without handling WhatsApp credentials or rebuilding messaging infrastructure.',
    blocks: [
      {
        kind: 'p',
        text: 'Auphere Embed is a JavaScript SDK (`@auphere/embed`) that you install in your web application. It adds two capabilities for **each of your clients**, directly inside your product:',
      },
      {
        kind: 'list',
        items: [
          '**Connect WhatsApp** — a self-serve flow where your client links their own WhatsApp Business number to their Auphere agent, powered by Meta Embedded Signup.',
          '**Broadcasts** — a campaign modal where your client sends approved WhatsApp templates with dynamic variables to a list of recipients you provide.',
        ],
      },
      {
        kind: 'callout',
        tone: 'note',
        title: 'Who this is for',
        text: 'Auphere Embed is built for **partners**: SaaS platforms that want to offer WhatsApp automation to their own customers. If you are a single business looking for an AI agent, [book a call](/#book) instead — no integration required.',
      },
      { kind: 'h2', id: 'mental-model', text: 'Mental model' },
      {
        kind: 'p',
        text: 'Every concept in your platform maps to one concept in Auphere. You never handle Auphere internals — you always speak in terms of your own identifiers.',
      },
      {
        kind: 'table',
        head: ['In your platform', 'In Auphere'],
        rows: [
          ['Your platform (the partner)', 'A partner account with a secret API key (`ak_live_…`)'],
          ['A client / business in your product', 'An isolated workspace, referenced only by **your** id (`external_client_ref`)'],
          ["The client's WhatsApp", "A WhatsApp Business Cloud API channel owned by that client"],
          ["The client's AI agent", 'An agent cloned from your partner blueprint at provisioning time'],
          ['Bulk reminders / notifications', 'A template broadcast to N recipients'],
        ],
      },
      { kind: 'h2', id: 'architecture', text: 'How it works' },
      {
        kind: 'p',
        text: 'The SDK is a thin loader. It renders nothing itself beyond a fullscreen iframe overlay served from `embed.auphere.com` — the same pattern used by Stripe Connect and Plaid Link. This buys you three guarantees:',
      },
      {
        kind: 'list',
        items: [
          '**No credentials in your bundle.** Your page only ever holds a 15-minute session token scoped to a single client. WhatsApp and Auphere credentials never leave our origin.',
          '**Zero-redeploy updates.** The modal UI lives on our origin, so we ship fixes and improvements without you touching `package.json`.',
          '**Isolation by construction.** Each client is an isolated workspace. The workspace is selected server-side when the token is minted — a browser can never point a session at someone else’s data.',
        ],
      },
      {
        kind: 'p',
        text: 'The integration has exactly two moving parts on your side: a **backend endpoint** that exchanges your secret API key for short-lived session tokens, and the **frontend SDK** that mounts the widget with those tokens.',
      },
      { kind: 'h2', id: 'next-steps', text: 'Next steps' },
      {
        kind: 'list',
        ordered: true,
        items: [
          'Follow the [Quickstart](/docs/embed/quickstart) — from API key to a working broadcast button.',
          'Learn how to [provision clients](/docs/embed/provisioning) when they sign up in your product.',
          'Read the [security model](/docs/embed/security) before going to production.',
        ],
      },
    ],
  },
  es: {
    title: 'Introducción',
    description:
      'Auphere Embed permite a tu plataforma SaaS ofrecer agentes de WhatsApp y campañas de plantillas a tus propios clientes — sin manejar credenciales de WhatsApp ni reconstruir infraestructura de mensajería.',
    blocks: [
      {
        kind: 'p',
        text: 'Auphere Embed es un SDK de JavaScript (`@auphere/embed`) que instalas en tu aplicación web. Añade dos capacidades para **cada uno de tus clientes**, directamente dentro de tu producto:',
      },
      {
        kind: 'list',
        items: [
          '**Conectar WhatsApp** — un flujo self-serve donde tu cliente vincula su propio número de WhatsApp Business a su agente de Auphere, con Meta Embedded Signup.',
          '**Campañas (broadcasts)** — un modal donde tu cliente envía plantillas aprobadas de WhatsApp con variables dinámicas a una lista de destinatarios que tú provees.',
        ],
      },
      {
        kind: 'callout',
        tone: 'note',
        title: 'Para quién es',
        text: 'Auphere Embed está pensado para **partners**: plataformas SaaS que quieren ofrecer automatización de WhatsApp a sus propios clientes. Si eres un negocio individual buscando un agente de IA, mejor [reserva una llamada](/#book) — no necesitas integrar nada.',
      },
      { kind: 'h2', id: 'mental-model', text: 'Modelo mental' },
      {
        kind: 'p',
        text: 'Cada concepto de tu plataforma corresponde a un concepto en Auphere. Nunca manejas internos de Auphere — siempre hablas en términos de tus propios identificadores.',
      },
      {
        kind: 'table',
        head: ['En tu plataforma', 'En Auphere'],
        rows: [
          ['Tu plataforma (el partner)', 'Una cuenta de partner con una API key secreta (`ak_live_…`)'],
          ['Un cliente / negocio de tu producto', 'Un workspace aislado, referenciado solo por **tu** id (`external_client_ref`)'],
          ['El WhatsApp del cliente', 'Un canal de WhatsApp Business Cloud API propio de ese cliente'],
          ['El agente de IA del cliente', 'Un agente clonado de tu blueprint de partner al provisionar'],
          ['Recordatorios / avisos masivos', 'Un broadcast de plantilla a N destinatarios'],
        ],
      },
      { kind: 'h2', id: 'architecture', text: 'Cómo funciona' },
      {
        kind: 'p',
        text: 'El SDK es un loader fino. No renderiza nada por sí mismo más allá de un overlay de iframe a pantalla completa servido desde `embed.auphere.com` — el mismo patrón que usan Stripe Connect y Plaid Link. Eso te da tres garantías:',
      },
      {
        kind: 'list',
        items: [
          '**Cero credenciales en tu bundle.** Tu página solo maneja un token de sesión de 15 minutos limitado a un único cliente. Las credenciales de WhatsApp y de Auphere nunca salen de nuestro origen.',
          '**Actualizaciones sin redeploy.** La UI del modal vive en nuestro origen: publicamos mejoras y fixes sin que toques tu `package.json`.',
          '**Aislamiento por construcción.** Cada cliente es un workspace aislado. El workspace se elige del lado del servidor al emitir el token — un navegador nunca puede apuntar una sesión a los datos de otro.',
        ],
      },
      {
        kind: 'p',
        text: 'La integración tiene exactamente dos piezas de tu lado: un **endpoint en tu backend** que intercambia tu API key secreta por tokens de sesión efímeros, y el **SDK en tu frontend** que monta el widget con esos tokens.',
      },
      { kind: 'h2', id: 'next-steps', text: 'Siguientes pasos' },
      {
        kind: 'list',
        ordered: true,
        items: [
          'Sigue el [Quickstart](/docs/embed/quickstart) — de la API key a un botón de campañas funcionando.',
          'Aprende a [provisionar clientes](/docs/embed/provisioning) cuando se dan de alta en tu producto.',
          'Lee el [modelo de seguridad](/docs/embed/security) antes de salir a producción.',
        ],
      },
    ],
  },
};

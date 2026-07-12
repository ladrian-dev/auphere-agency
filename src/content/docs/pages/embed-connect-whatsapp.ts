import type { DocPage } from '../types';

const CONNECT_CODE = `await auphere.connectWhatsApp({
  onConnected: ({ displayPhoneNumber }) => {
    // e.g. "+58 424-1234567" — refresh your UI here
  },
  onExit: () => {
    // modal closed (connected or not)
  },
});`;

const STATUS_CODE = `auphere.getStatus();          // "connected" | "not_connected" | "unknown"
await auphere.refreshStatus(); // re-mints a session and refreshes

const unsubscribe = auphere.onStatusChange((status) => {
  // fires on every flip, e.g. right after a successful signup
});`;

export const embedConnectWhatsapp: DocPage = {
  slug: ['embed', 'connect-whatsapp'],
  group: 'guides',
  en: {
    title: 'Connecting WhatsApp',
    description:
      'The self-serve flow where your client links their own WhatsApp Business number to their agent — Meta Embedded Signup, inside the Auphere iframe.',
    blocks: [
      {
        kind: 'p',
        text: 'Each of your clients sends from **their own WhatsApp Business number**, not from a shared one. Linking that number is the only step in the whole flow that needs a human: someone with access to the client’s Meta Business account has to authorize it.',
      },
      { kind: 'h2', id: 'requirements', text: 'What the client needs' },
      {
        kind: 'list',
        items: [
          'Access to their **Meta Business** account (the owner, or whoever manages it).',
          'A phone number for WhatsApp Business — new, or migratable to the Cloud API.',
        ],
      },
      { kind: 'h2', id: 'launch', text: 'Launching the flow' },
      {
        kind: 'p',
        text: 'Call `connectWhatsApp()` from your settings or onboarding page. It opens Meta’s official Embedded Signup inside the Auphere iframe — the Meta login happens under our origin and Meta app configuration, never in your bundle.',
      },
      { kind: 'code', language: 'ts', code: CONNECT_CODE },
      {
        kind: 'callout',
        tone: 'note',
        title: 'Connecting on behalf of a client',
        text: 'Your admin can launch the flow for a client **if** they have delegated access to that client’s Meta Business. Whoever completes the popup needs that access — the flow itself doesn’t care who clicks the button.',
      },
      { kind: 'h2', id: 'after', text: 'What happens after authorization' },
      {
        kind: 'list',
        ordered: true,
        items: [
          'Auphere registers the number and subscribes to its webhook — messages start flowing through the client’s agent.',
          'Credentials are stored encrypted on our side. Nothing is returned to your frontend beyond the display phone number.',
          'If your blueprint has auto-activation enabled (the default), the client flips to **active** and their agent starts responding immediately.',
          'The broadcast button becomes available for that client.',
        ],
      },
      { kind: 'h2', id: 'status', text: 'Tracking connection status' },
      {
        kind: 'p',
        text: 'The SDK keeps the last known status and exposes a small subscription API. On the server side, the mint response of `POST /v1/widget-sessions` also includes `whatsapp.status`, so you can decide **server-side** whether to render campaign UI at all.',
      },
      { kind: 'code', language: 'ts', code: STATUS_CODE },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'One number, one client',
        text: 'A WhatsApp number can be linked to only one workspace. If a client tries to connect a number that is already in use, the flow fails with a conflict — [contact us](/#book) to move a number between workspaces.',
      },
    ],
  },
  es: {
    title: 'Conectar WhatsApp',
    description:
      'El flujo self-serve donde tu cliente vincula su propio número de WhatsApp Business a su agente — Meta Embedded Signup, dentro del iframe de Auphere.',
    blocks: [
      {
        kind: 'p',
        text: 'Cada cliente tuyo envía desde **su propio número de WhatsApp Business**, no desde uno compartido. Vincular ese número es el único paso de todo el flujo que necesita a un humano: alguien con acceso al Meta Business del cliente tiene que autorizarlo.',
      },
      { kind: 'h2', id: 'requirements', text: 'Qué necesita el cliente' },
      {
        kind: 'list',
        items: [
          'Acceso a su cuenta de **Meta Business** (el dueño, o quien la administre).',
          'Un número de teléfono para WhatsApp Business — nuevo, o migrable a la Cloud API.',
        ],
      },
      { kind: 'h2', id: 'launch', text: 'Lanzar el flujo' },
      {
        kind: 'p',
        text: 'Llama `connectWhatsApp()` desde tu página de ajustes u onboarding. Abre el Embedded Signup oficial de Meta dentro del iframe de Auphere — el login de Meta ocurre bajo nuestro origen y nuestra configuración de app de Meta, nunca en tu bundle.',
      },
      { kind: 'code', language: 'ts', code: CONNECT_CODE },
      {
        kind: 'callout',
        tone: 'note',
        title: 'Conectar en nombre de un cliente',
        text: 'Tu admin puede lanzar el flujo por un cliente **si** tiene acceso delegado al Meta Business de ese cliente. Quien complete el popup necesita ese acceso — al flujo no le importa quién pulsa el botón.',
      },
      { kind: 'h2', id: 'after', text: 'Qué pasa tras la autorización' },
      {
        kind: 'list',
        ordered: true,
        items: [
          'Auphere registra el número y se suscribe a su webhook — los mensajes empiezan a fluir por el agente del cliente.',
          'Las credenciales se guardan cifradas de nuestro lado. A tu frontend no vuelve nada más que el número visible.',
          'Si tu blueprint tiene auto-activación (el default), el cliente pasa a **activo** y su agente empieza a responder de inmediato.',
          'El botón de campañas queda disponible para ese cliente.',
        ],
      },
      { kind: 'h2', id: 'status', text: 'Seguir el estado de conexión' },
      {
        kind: 'p',
        text: 'El SDK guarda el último estado conocido y expone una pequeña API de suscripción. Del lado del servidor, la respuesta de `POST /v1/widget-sessions` también incluye `whatsapp.status`, así puedes decidir **server-side** si renderizar la UI de campañas.',
      },
      { kind: 'code', language: 'ts', code: STATUS_CODE },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Un número, un cliente',
        text: 'Un número de WhatsApp solo puede estar vinculado a un workspace. Si un cliente intenta conectar un número ya en uso, el flujo falla con un conflicto — [contáctanos](/#book) para mover un número entre workspaces.',
      },
    ],
  },
};

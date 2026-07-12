import type { DocPage } from '../types';

const SESSION_ENDPOINT_EN = `// app/api/auphere/session/route.ts (Next.js example)
export async function POST(request: Request) {
  // 1. Authenticate YOUR user and resolve which client they belong to.
  const client = await resolveClientFromSession(request);

  // 2. Exchange your secret key for a short-lived session token.
  const response = await fetch("https://api.auphere.com/v1/widget-sessions", {
    method: "POST",
    headers: {
      Authorization: \`Bearer \${process.env.AUPHERE_SECRET_KEY}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ external_client_ref: client.id }),
  });

  return Response.json(await response.json());
}`;

const SESSION_ENDPOINT_ES = `// app/api/auphere/session/route.ts (ejemplo Next.js)
export async function POST(request: Request) {
  // 1. Autentica a TU usuario y resuelve a qué cliente pertenece.
  const client = await resolveClientFromSession(request);

  // 2. Intercambia tu clave secreta por un token de sesión efímero.
  const response = await fetch("https://api.auphere.com/v1/widget-sessions", {
    method: "POST",
    headers: {
      Authorization: \`Bearer \${process.env.AUPHERE_SECRET_KEY}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ external_client_ref: client.id }),
  });

  return Response.json(await response.json());
}`;

const CREATE_CLIENT_EN = `import { createAuphere } from "@auphere/embed";

const auphere = createAuphere({
  partnerSlug: "your-slug", // provided during partner onboarding
  fetchSession: async () => {
    const response = await fetch("/api/auphere/session", { method: "POST" });
    return response.json(); // ← your backend mints with the secret key
  },
  appearance: { colorPrimary: "#00DF81", radius: "8px" },
  locale: "en",
});`;

const CREATE_CLIENT_ES = `import { createAuphere } from "@auphere/embed";

const auphere = createAuphere({
  partnerSlug: "tu-slug", // te lo damos en el alta de partner
  fetchSession: async () => {
    const response = await fetch("/api/auphere/session", { method: "POST" });
    return response.json(); // ← tu backend emite con la clave secreta
  },
  appearance: { colorPrimary: "#00DF81", radius: "8px" },
  locale: "es",
});`;

const CONNECT_EN = `await auphere.connectWhatsApp({
  onConnected: ({ displayPhoneNumber }) => {
    console.log("Connected:", displayPhoneNumber);
    refreshUI();
  },
});`;

const BUTTON_EN = `import { AuphereBroadcastButton } from "@auphere/embed/react";

<AuphereBroadcastButton
  auphere={auphere}
  recipients={customers.map((c) => ({
    phone: c.phoneE164, // "+15551234567"
    variables: { name: c.name, amount_due: c.balance },
  }))}
  onDone={({ broadcastId, accepted }) => console.log(broadcastId, accepted)}
>
  Send reminders
</AuphereBroadcastButton>`;

const BUTTON_ES = `import { AuphereBroadcastButton } from "@auphere/embed/react";

<AuphereBroadcastButton
  auphere={auphere}
  recipients={clientes.map((c) => ({
    phone: c.telefonoE164, // "+584241234567"
    variables: { cliente: c.nombre, saldo_pendiente: c.saldo },
  }))}
  onDone={({ broadcastId, accepted }) => console.log(broadcastId, accepted)}
>
  Enviar recordatorios
</AuphereBroadcastButton>`;

export const embedQuickstart: DocPage = {
  slug: ['embed', 'quickstart'],
  group: 'start',
  en: {
    title: 'Quickstart',
    description:
      'From API key to a working WhatsApp broadcast button in your product — five steps.',
    blocks: [
      { kind: 'h2', id: 'prerequisites', text: 'Prerequisites' },
      {
        kind: 'list',
        items: [
          'A **partner account** and a secret API key (`ak_live_…`). Both are issued by the Auphere team during onboarding — [book a call](/#book) if you don’t have one yet. Your key is bound to the exact web origins you register.',
          'A backend that can keep a secret (environment variable or secret manager). The API key must **never** reach the browser.',
          'A stable id per client in your system (`external_client_ref`) — a UUID works well.',
        ],
      },
      {
        kind: 'steps',
        items: [
          {
            title: 'Install the SDK',
            body: 'The package has zero runtime dependencies and ships ESM with TypeScript types, plus an optional React entry point.',
            code: { language: 'bash', code: 'npm install @auphere/embed' },
          },
          {
            title: 'Create a session endpoint in your backend',
            body: 'The SDK asks your backend for a session token when a modal opens, and again about every 15 minutes while it stays open. Your endpoint validates **your own user’s session**, decides which client they act for, and exchanges the secret key for a token. It must work without user interaction.',
            code: { language: 'ts', title: 'app/api/auphere/session/route.ts', code: SESSION_ENDPOINT_EN },
          },
          {
            title: 'Initialize the client in your frontend',
            body: 'Create one `Auphere` instance per page. `partnerSlug` identifies you before any token exists; `fetchSession` points at the endpoint from step 2.',
            code: { language: 'ts', code: CREATE_CLIENT_EN },
          },
          {
            title: 'Let the client connect their WhatsApp',
            body: 'Call `connectWhatsApp()` from your settings or onboarding page. It opens Meta’s official Embedded Signup inside the Auphere iframe — the client authorizes with their own Meta Business account. You should see the modal open and, on completion, `onConnected` fire with the phone number.',
            code: { language: 'ts', code: CONNECT_EN },
          },
          {
            title: 'Add the broadcast button',
            body: 'The React button renders **only when that client’s WhatsApp is connected** — no state juggling on your side. You pass the audience from your own data; the modal previews the template and sends.',
            code: { language: 'tsx', code: BUTTON_EN },
          },
        ],
      },
      {
        kind: 'callout',
        tone: 'note',
        title: 'That’s the whole integration',
        text: 'One backend endpoint, one `createAuphere` call, one button. Everything else — template selection, preview, sending, opt-outs — happens inside the Auphere modal.',
      },
      { kind: 'h2', id: 'csp', text: 'If your site sets a Content-Security-Policy' },
      {
        kind: 'p',
        text: 'Allow the Auphere embed origin in `frame-src`:',
      },
      { kind: 'code', language: 'http', code: 'Content-Security-Policy: frame-src https://embed.auphere.com;' },
      { kind: 'h2', id: 'next', text: 'Where to go next' },
      {
        kind: 'list',
        items: [
          '[Provision clients](/docs/embed/provisioning) automatically when they sign up in your product.',
          '[Broadcasts](/docs/embed/broadcasts) — templates, variables, limits and delivery rules.',
          '[API reference](/docs/embed/api-reference) — every option and method.',
        ],
      },
    ],
  },
  es: {
    title: 'Quickstart',
    description:
      'De la API key a un botón de campañas de WhatsApp funcionando en tu producto — cinco pasos.',
    blocks: [
      { kind: 'h2', id: 'prerequisites', text: 'Requisitos previos' },
      {
        kind: 'list',
        items: [
          'Una **cuenta de partner** y una API key secreta (`ak_live_…`). Ambas las emite el equipo de Auphere durante el alta — [reserva una llamada](/#book) si aún no la tienes. Tu key queda vinculada a los orígenes web exactos que registres.',
          'Un backend capaz de guardar un secreto (variable de entorno o secret manager). La API key **nunca** debe llegar al navegador.',
          'Un id estable por cliente en tu sistema (`external_client_ref`) — un UUID funciona bien.',
        ],
      },
      {
        kind: 'steps',
        items: [
          {
            title: 'Instala el SDK',
            body: 'El paquete tiene cero dependencias de runtime y publica ESM con tipos de TypeScript, más un entry point opcional para React.',
            code: { language: 'bash', code: 'npm install @auphere/embed' },
          },
          {
            title: 'Crea un endpoint de sesión en tu backend',
            body: 'El SDK le pide a tu backend un token de sesión al abrir un modal, y de nuevo cada ~15 minutos mientras siga abierto. Tu endpoint valida **la sesión de tu propio usuario**, decide para qué cliente actúa, e intercambia la clave secreta por un token. Debe funcionar sin interacción del usuario.',
            code: { language: 'ts', title: 'app/api/auphere/session/route.ts', code: SESSION_ENDPOINT_ES },
          },
          {
            title: 'Inicializa el cliente en tu frontend',
            body: 'Crea una instancia `Auphere` por página. `partnerSlug` te identifica antes de que exista un token; `fetchSession` apunta al endpoint del paso 2.',
            code: { language: 'ts', code: CREATE_CLIENT_ES },
          },
          {
            title: 'Deja que el cliente conecte su WhatsApp',
            body: 'Llama `connectWhatsApp()` desde tu página de ajustes u onboarding. Abre el Embedded Signup oficial de Meta dentro del iframe de Auphere — el cliente autoriza con su propia cuenta de Meta Business. Deberías ver el modal abrirse y, al completar, `onConnected` dispararse con el número de teléfono.',
            code: { language: 'ts', code: CONNECT_EN },
          },
          {
            title: 'Añade el botón de campañas',
            body: 'El botón de React se renderiza **solo cuando el WhatsApp de ese cliente está conectado** — sin manejar estado de tu lado. Tú pasas la audiencia desde tus propios datos; el modal previsualiza la plantilla y envía.',
            code: { language: 'tsx', code: BUTTON_ES },
          },
        ],
      },
      {
        kind: 'callout',
        tone: 'note',
        title: 'Esa es toda la integración',
        text: 'Un endpoint en tu backend, una llamada a `createAuphere`, un botón. Todo lo demás — selección de plantilla, preview, envío, opt-outs — ocurre dentro del modal de Auphere.',
      },
      { kind: 'h2', id: 'csp', text: 'Si tu sitio define una Content-Security-Policy' },
      {
        kind: 'p',
        text: 'Permite el origen del embed de Auphere en `frame-src`:',
      },
      { kind: 'code', language: 'http', code: 'Content-Security-Policy: frame-src https://embed.auphere.com;' },
      { kind: 'h2', id: 'next', text: 'A dónde ir después' },
      {
        kind: 'list',
        items: [
          '[Provisiona clientes](/docs/embed/provisioning) automáticamente cuando se den de alta en tu producto.',
          '[Campañas](/docs/embed/broadcasts) — plantillas, variables, límites y reglas de entrega.',
          '[Referencia de API](/docs/embed/api-reference) — todas las opciones y métodos.',
        ],
      },
    ],
  },
};

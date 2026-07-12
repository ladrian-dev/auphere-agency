import type { DocPage } from '../types';

const MINT_REQUEST = `POST https://api.auphere.com/v1/widget-sessions
Authorization: Bearer ak_live_…
Content-Type: application/json

{ "external_client_ref": "3f6c1a2e-9d41-4b7f-8f2a-0c5d9e1b7a44" }`;

const MINT_RESPONSE = `{
  "session_token": "eyJhbGciOiJIUzI1NiIs…",
  "expires_in": 900,
  "whatsapp": { "status": "connected", "display_phone_number": "+58 424-1234567" }
}`;

const SESSION_SHAPE = `// Either shape is accepted by fetchSession:
{ sessionToken: string, expiresIn?: number, whatsapp?: { status, displayPhoneNumber } }
{ session_token: string, expires_in?: number, whatsapp?: { status, display_phone_number } }`;

export const embedApiReference: DocPage = {
  slug: ['embed', 'api-reference'],
  group: 'reference',
  en: {
    title: 'API reference',
    description:
      'Every option, method and endpoint of @auphere/embed and its companion REST API.',
    blocks: [
      { kind: 'h2', id: 'create-auphere', text: 'createAuphere(config)' },
      {
        kind: 'p',
        text: 'Creates the SDK client. Throws synchronously if `fetchSession` or `partnerSlug` is missing.',
      },
      {
        kind: 'params',
        items: [
          {
            name: 'fetchSession',
            type: '() => Promise<WidgetSession>',
            required: true,
            description: 'Called whenever the SDK needs a session token: on open, and again when a token is about to expire. Must be re-invocable without user interaction. Both camelCase and raw snake_case mint responses are accepted (see below).',
          },
          {
            name: 'partnerSlug',
            type: 'string',
            required: true,
            description: 'Your partner slug, assigned during onboarding. Used to resolve the iframe’s security policy before any token exists.',
          },
          {
            name: 'appearance',
            type: 'Appearance',
            description: 'Visual overrides applied inside the modal: `colorPrimary` (CSS color), `radius` (e.g. `"8px"`), `theme` (`"light" | "dark"`, defaults to the page’s scheme).',
          },
          {
            name: 'locale',
            type: 'string',
            description: 'BCP-47 tag, e.g. `"es"`. Defaults to the page language.',
          },
          {
            name: 'embedOrigin',
            type: 'string',
            description: 'Override the embed origin. Staging/development only.',
          },
        ],
      },
      { kind: 'code', language: 'ts', title: 'Accepted fetchSession return shapes', code: SESSION_SHAPE },
      { kind: 'h2', id: 'client-methods', text: 'The Auphere client' },
      {
        kind: 'params',
        items: [
          {
            name: 'getStatus()',
            type: '() => ConnectionStatus',
            description: 'Last known WhatsApp connection state: `"connected" | "not_connected" | "unknown"`. Starts as `"unknown"` until the first session mint.',
          },
          {
            name: 'refreshStatus()',
            type: '() => Promise<ConnectionStatus>',
            description: 'Re-mints a session (via `fetchSession`) and returns the refreshed status.',
          },
          {
            name: 'onStatusChange(listener)',
            type: '(s: ConnectionStatus) => void',
            description: 'Subscribes to status flips. Returns an unsubscribe function.',
          },
          {
            name: 'openBroadcast(options)',
            type: '(o: OpenBroadcastOptions) => Promise<void>',
            description: 'Opens the broadcast modal as a fullscreen iframe overlay. `options.recipients` is the audience (see [Broadcasts](/docs/embed/broadcasts)); `onDone({ broadcastId, accepted })` fires when the broadcast is accepted; `onExit()` when the modal closes. The returned promise rejects if the modal fails to initialize (e.g. token mint fails).',
          },
          {
            name: 'connectWhatsApp(options?)',
            type: '(o?: ConnectWhatsAppOptions) => Promise<void>',
            description: 'Opens the WhatsApp Embedded Signup flow. `onConnected({ displayPhoneNumber })` fires on success; `onExit()` when the modal closes.',
          },
          {
            name: 'destroy()',
            type: '() => void',
            description: 'Closes any open overlay and removes all listeners. Call it when your page or component unmounts.',
          },
        ],
      },
      { kind: 'h2', id: 'react', text: 'React — AuphereBroadcastButton' },
      {
        kind: 'p',
        text: 'Imported from `@auphere/embed/react`. Renders a button **only when the client’s WhatsApp is connected**; clicking it opens the broadcast modal.',
      },
      {
        kind: 'params',
        items: [
          { name: 'auphere', type: 'Auphere', required: true, description: 'The client created with `createAuphere`.' },
          { name: 'recipients', type: 'BroadcastRecipient[]', required: true, description: 'The audience, built from your data.' },
          { name: 'onDone', type: 'function', description: 'Same semantics as `openBroadcast`’s `onDone`.' },
          { name: 'className', type: 'string', description: 'Class for the rendered button — style it like any button of yours.' },
          { name: 'children', type: 'ReactNode', description: 'Button label.' },
        ],
      },
      { kind: 'h2', id: 'rest', text: 'REST API' },
      {
        kind: 'p',
        text: 'Base URL `https://api.auphere.com`, authenticated with `Authorization: Bearer ak_live_…` from your backend only. Two endpoints:',
      },
      { kind: 'h3', text: 'POST /v1/widget-sessions' },
      {
        kind: 'p',
        text: 'Exchanges your API key for a short-lived session token (15 minutes) scoped to one client. The response also carries the client’s WhatsApp status, so your backend can decide what UI to render.',
      },
      { kind: 'code', language: 'http', title: 'Request', code: MINT_REQUEST },
      { kind: 'code', language: 'json', title: 'Response', code: MINT_RESPONSE },
      { kind: 'h3', text: 'POST /v1/partners/clients' },
      {
        kind: 'p',
        text: 'Provisions (or updates) a client workspace. Idempotent on `external_client_ref`. Full request/response documented in [Provisioning clients](/docs/embed/provisioning).',
      },
      { kind: 'h2', id: 'errors', text: 'Error responses' },
      {
        kind: 'table',
        head: ['Status', 'Meaning'],
        rows: [
          ['`401`', 'API key missing, revoked or malformed.'],
          ['`403`', 'The session token lacks the required scope, or the key/partner was suspended. Re-mint the token.'],
          ['`409`', 'Conflict — e.g. the WhatsApp number is already linked to another workspace.'],
          ['`413`', 'Broadcast audience exceeds your per-send cap.'],
          ['`422`', 'Validation error — the `detail` field says exactly what is missing or invalid (placeholder, credential, positional template parameters…).'],
          ['`429`', 'Rate limit exceeded for your partner account. Back off and retry.'],
        ],
      },
    ],
  },
  es: {
    title: 'Referencia de API',
    description:
      'Todas las opciones, métodos y endpoints de @auphere/embed y su API REST.',
    blocks: [
      { kind: 'h2', id: 'create-auphere', text: 'createAuphere(config)' },
      {
        kind: 'p',
        text: 'Crea el cliente del SDK. Lanza un error síncrono si falta `fetchSession` o `partnerSlug`.',
      },
      {
        kind: 'params',
        items: [
          {
            name: 'fetchSession',
            type: '() => Promise<WidgetSession>',
            required: true,
            description: 'Se invoca cada vez que el SDK necesita un token de sesión: al abrir, y de nuevo cuando un token está por expirar. Debe poder re-invocarse sin interacción del usuario. Se aceptan tanto la respuesta camelCase como la snake_case cruda del mint (ver abajo).',
          },
          {
            name: 'partnerSlug',
            type: 'string',
            required: true,
            description: 'Tu slug de partner, asignado en el alta. Se usa para resolver la política de seguridad del iframe antes de que exista un token.',
          },
          {
            name: 'appearance',
            type: 'Appearance',
            description: 'Ajustes visuales aplicados dentro del modal: `colorPrimary` (color CSS), `radius` (p. ej. `"8px"`), `theme` (`"light" | "dark"`, por defecto el esquema de la página).',
          },
          {
            name: 'locale',
            type: 'string',
            description: 'Tag BCP-47, p. ej. `"es"`. Por defecto, el idioma de la página.',
          },
          {
            name: 'embedOrigin',
            type: 'string',
            description: 'Sobrescribe el origen del embed. Solo staging/desarrollo.',
          },
        ],
      },
      { kind: 'code', language: 'ts', title: 'Formas aceptadas de retorno de fetchSession', code: SESSION_SHAPE },
      { kind: 'h2', id: 'client-methods', text: 'El cliente Auphere' },
      {
        kind: 'params',
        items: [
          {
            name: 'getStatus()',
            type: '() => ConnectionStatus',
            description: 'Último estado conocido de conexión de WhatsApp: `"connected" | "not_connected" | "unknown"`. Empieza en `"unknown"` hasta el primer mint de sesión.',
          },
          {
            name: 'refreshStatus()',
            type: '() => Promise<ConnectionStatus>',
            description: 'Re-emite una sesión (vía `fetchSession`) y devuelve el estado refrescado.',
          },
          {
            name: 'onStatusChange(listener)',
            type: '(s: ConnectionStatus) => void',
            description: 'Se suscribe a los cambios de estado. Devuelve una función para desuscribirse.',
          },
          {
            name: 'openBroadcast(options)',
            type: '(o: OpenBroadcastOptions) => Promise<void>',
            description: 'Abre el modal de campañas como overlay de iframe a pantalla completa. `options.recipients` es la audiencia (ver [Campañas](/docs/embed/broadcasts)); `onDone({ broadcastId, accepted })` se dispara cuando el broadcast es aceptado; `onExit()` al cerrar el modal. La promesa se rechaza si el modal no logra inicializar (p. ej. falla el mint del token).',
          },
          {
            name: 'connectWhatsApp(options?)',
            type: '(o?: ConnectWhatsAppOptions) => Promise<void>',
            description: 'Abre el flujo de Embedded Signup de WhatsApp. `onConnected({ displayPhoneNumber })` se dispara al conectar; `onExit()` al cerrar el modal.',
          },
          {
            name: 'destroy()',
            type: '() => void',
            description: 'Cierra cualquier overlay abierto y elimina todos los listeners. Llámalo cuando tu página o componente se desmonte.',
          },
        ],
      },
      { kind: 'h2', id: 'react', text: 'React — AuphereBroadcastButton' },
      {
        kind: 'p',
        text: 'Se importa desde `@auphere/embed/react`. Renderiza un botón **solo cuando el WhatsApp del cliente está conectado**; al hacer click abre el modal de campañas.',
      },
      {
        kind: 'params',
        items: [
          { name: 'auphere', type: 'Auphere', required: true, description: 'El cliente creado con `createAuphere`.' },
          { name: 'recipients', type: 'BroadcastRecipient[]', required: true, description: 'La audiencia, construida desde tus datos.' },
          { name: 'onDone', type: 'function', description: 'Misma semántica que el `onDone` de `openBroadcast`.' },
          { name: 'className', type: 'string', description: 'Clase para el botón renderizado — estilízalo como cualquier botón tuyo.' },
          { name: 'children', type: 'ReactNode', description: 'Texto del botón.' },
        ],
      },
      { kind: 'h2', id: 'rest', text: 'API REST' },
      {
        kind: 'p',
        text: 'Base URL `https://api.auphere.com`, autenticada con `Authorization: Bearer ak_live_…` únicamente desde tu backend. Dos endpoints:',
      },
      { kind: 'h3', text: 'POST /v1/widget-sessions' },
      {
        kind: 'p',
        text: 'Intercambia tu API key por un token de sesión efímero (15 minutos) limitado a un cliente. La respuesta incluye además el estado de WhatsApp del cliente, para que tu backend decida qué UI renderizar.',
      },
      { kind: 'code', language: 'http', title: 'Request', code: MINT_REQUEST },
      { kind: 'code', language: 'json', title: 'Response', code: MINT_RESPONSE },
      { kind: 'h3', text: 'POST /v1/partners/clients' },
      {
        kind: 'p',
        text: 'Provisiona (o actualiza) el workspace de un cliente. Idempotente sobre `external_client_ref`. Request y response completos en [Provisionar clientes](/docs/embed/provisioning).',
      },
      { kind: 'h2', id: 'errors', text: 'Respuestas de error' },
      {
        kind: 'table',
        head: ['Status', 'Significado'],
        rows: [
          ['`401`', 'API key ausente, revocada o malformada.'],
          ['`403`', 'El token de sesión no tiene el scope requerido, o la key/el partner fue suspendido. Re-emite el token.'],
          ['`409`', 'Conflicto — p. ej. el número de WhatsApp ya está vinculado a otro workspace.'],
          ['`413`', 'La audiencia del broadcast supera tu tope por envío.'],
          ['`422`', 'Error de validación — el campo `detail` dice exactamente qué falta o es inválido (placeholder, credencial, parámetros posicionales de plantilla…).'],
          ['`429`', 'Límite de tasa excedido para tu cuenta de partner. Espera y reintenta.'],
        ],
      },
    ],
  },
};

import type { DocPage } from '../types';

export const embedSecurity: DocPage = {
  slug: ['embed', 'security'],
  group: 'reference',
  en: {
    title: 'Security model',
    description:
      'How Auphere Embed keeps credentials out of your bundle and each client’s data isolated — the summary your security team will ask for.',
    blocks: [
      { kind: 'h2', id: 'keys', text: 'API keys' },
      {
        kind: 'list',
        items: [
          'Keys use the format `ak_live_…` (high-entropy, checksummed) so secret scanners recognize them if they ever leak.',
          'We store only a **SHA-256 hash** — a key is displayed in plaintext exactly once, at issuance.',
          'Rotation supports a **grace window**: the old key keeps working while you roll out the new one. Revocation is instant and fail-closed.',
          'Your key lives **only in your backend**. If it appears in frontend code, rotate it immediately.',
        ],
      },
      { kind: 'h2', id: 'tokens', text: 'Session tokens' },
      {
        kind: 'list',
        items: [
          'Short-lived (15 minutes) and scoped to **one client** with a fixed set of permissions.',
          'Delivered to the iframe via `postMessage` with strict origin checks — never in URLs, never in cookies. No third-party-cookie dependencies.',
          'Revoking the API key, suspending the partner or unlinking the client kills live tokens: every request re-checks, fail-closed.',
        ],
      },
      { kind: 'h2', id: 'isolation', text: 'Client isolation' },
      {
        kind: 'p',
        text: 'The rule that makes cross-client access structurally impossible: the target workspace is chosen **only** when the token is minted — server-side, gated by your partner’s client mapping — and the widget API reads it **only** from the signed token. No browser input ever selects a workspace. One client cannot see another’s data, and one partner cannot see another partner’s clients.',
      },
      { kind: 'h2', id: 'iframe', text: 'The iframe boundary' },
      {
        kind: 'list',
        items: [
          'The modal runs on `embed.auphere.com`, a separate origin — your page’s JavaScript cannot read or manipulate it, and it cannot touch your page.',
          'Only the origins registered on your API key may embed the widget; all other origins are blocked at the CSP level (`frame-ancestors`).',
          'WhatsApp credentials collected during signup are encrypted at rest and never transit through your frontend.',
        ],
      },
      { kind: 'h2', id: 'limits', text: 'Abuse controls' },
      {
        kind: 'list',
        items: [
          'Per-partner rate limits on token minting and widget APIs.',
          'Broadcast audience caps per send.',
          'An append-only audit log of partner activity.',
        ],
      },
      {
        kind: 'callout',
        tone: 'note',
        title: 'Reporting a vulnerability',
        text: 'Found something? Write to us at [contacto@auphere.com](mailto:contacto@auphere.com) — we respond fast and appreciate responsible disclosure.',
      },
    ],
  },
  es: {
    title: 'Modelo de seguridad',
    description:
      'Cómo Auphere Embed mantiene las credenciales fuera de tu bundle y los datos de cada cliente aislados — el resumen que te va a pedir tu equipo de seguridad.',
    blocks: [
      { kind: 'h2', id: 'keys', text: 'API keys' },
      {
        kind: 'list',
        items: [
          'Las keys usan el formato `ak_live_…` (alta entropía, con checksum) para que los secret scanners las reconozcan si alguna vez se filtran.',
          'Solo almacenamos un **hash SHA-256** — la key se muestra en texto plano exactamente una vez, al emitirla.',
          'La rotación soporta una **ventana de gracia**: la key vieja sigue funcionando mientras despliegas la nueva. La revocación es instantánea y fail-closed.',
          'Tu key vive **solo en tu backend**. Si aparece en código de frontend, rótala de inmediato.',
        ],
      },
      { kind: 'h2', id: 'tokens', text: 'Tokens de sesión' },
      {
        kind: 'list',
        items: [
          'Efímeros (15 minutos) y limitados a **un cliente** con un set fijo de permisos.',
          'Se entregan al iframe vía `postMessage` con verificación estricta de origen — nunca en URLs, nunca en cookies. Sin dependencias de third-party cookies.',
          'Revocar la API key, suspender el partner o desvincular el cliente mata los tokens vivos: cada request re-verifica, fail-closed.',
        ],
      },
      { kind: 'h2', id: 'isolation', text: 'Aislamiento entre clientes' },
      {
        kind: 'p',
        text: 'La regla que hace estructuralmente imposible el acceso cruzado: el workspace destino se elige **solo** al emitir el token — del lado del servidor, validado contra el mapeo de clientes de tu partner — y la API del widget lo lee **solo** del token firmado. Ningún input del navegador selecciona un workspace. Un cliente no puede ver los datos de otro, y un partner no puede ver los clientes de otro partner.',
      },
      { kind: 'h2', id: 'iframe', text: 'La frontera del iframe' },
      {
        kind: 'list',
        items: [
          'El modal corre en `embed.auphere.com`, un origen separado — el JavaScript de tu página no puede leerlo ni manipularlo, y él no puede tocar tu página.',
          'Solo los orígenes registrados en tu API key pueden embeber el widget; el resto se bloquea a nivel de CSP (`frame-ancestors`).',
          'Las credenciales de WhatsApp obtenidas durante el signup se guardan cifradas y nunca transitan por tu frontend.',
        ],
      },
      { kind: 'h2', id: 'limits', text: 'Controles de abuso' },
      {
        kind: 'list',
        items: [
          'Límites de tasa por partner en la emisión de tokens y en las APIs del widget.',
          'Topes de audiencia por envío en los broadcasts.',
          'Un audit log append-only de la actividad del partner.',
        ],
      },
      {
        kind: 'callout',
        tone: 'note',
        title: 'Reportar una vulnerabilidad',
        text: '¿Encontraste algo? Escríbenos a [contacto@auphere.com](mailto:contacto@auphere.com) — respondemos rápido y agradecemos la divulgación responsable.',
      },
    ],
  },
};

import type { DocPage } from '../types';

const PROVISION_REQUEST = `POST https://api.auphere.com/v1/partners/clients
Authorization: Bearer ak_live_…
Content-Type: application/json

{
  "external_client_ref": "3f6c1a2e-9d41-4b7f-8f2a-0c5d9e1b7a44",
  "name": "Bodegón El Ávila",
  "timezone": "America/Caracas",
  "agent": {
    "placeholders": {
      "agent.name": "Mouna",
      "policies.admin_access.admin_phones": ["+584241234567"]
    }
  }
}`;

const PROVISION_RESPONSE = `{
  "external_client_ref": "3f6c1a2e-9d41-4b7f-8f2a-0c5d9e1b7a44",
  "status": "provisioned",
  "whatsapp": { "status": "not_connected", "display_phone_number": null },
  "agent": { "status": "provisioned" },
  "connector_connected": true
}`;

export const embedProvisioning: DocPage = {
  slug: ['embed', 'provisioning'],
  group: 'guides',
  en: {
    title: 'Provisioning clients',
    description:
      'Create an isolated Auphere workspace — with a ready-to-go agent — every time a client signs up in your product.',
    blocks: [
      {
        kind: 'p',
        text: 'Before a client can connect WhatsApp or send broadcasts, they need a workspace on the Auphere side. You create it with a single idempotent call from your backend, typically wherever your product creates the client record.',
      },
      { kind: 'h2', id: 'blueprint', text: 'Your partner blueprint' },
      {
        kind: 'p',
        text: 'During onboarding, the Auphere team configures a **blueprint** for your partner account: which agent vertical your clients get (e.g. a collections assistant), which connector links the agent to your API, and whether clients activate automatically after connecting WhatsApp. Provisioning clones this blueprint for each new client — so every client starts with a proven agent, personalized through placeholders you control.',
      },
      { kind: 'h2', id: 'endpoint', text: 'Create or update a client' },
      {
        kind: 'p',
        text: '`POST /v1/partners/clients` is **idempotent** on `external_client_ref`: call it as many times as you like with the same ref.',
      },
      { kind: 'code', language: 'http', title: 'Request', code: PROVISION_REQUEST },
      { kind: 'code', language: 'json', title: 'Response', code: PROVISION_RESPONSE },
      {
        kind: 'params',
        items: [
          {
            name: 'external_client_ref',
            type: 'string',
            required: true,
            description: 'Your own stable id for the client. You will use it again when minting session tokens. Never changes.',
          },
          {
            name: 'name',
            type: 'string',
            required: true,
            description: 'Display name of the client’s business.',
          },
          {
            name: 'timezone',
            type: 'string',
            description: 'IANA timezone, e.g. `America/Caracas`. Used for scheduling and business-hours behavior.',
          },
          {
            name: 'agent.placeholders',
            type: 'object',
            description: 'Values for the blueprint’s placeholders (agent name, admin phones, etc.). The available keys depend on your blueprint — we share them during onboarding. A `422` response tells you exactly which placeholder is missing.',
          },
          {
            name: 'connector',
            type: 'object',
            description: 'Credentials and metadata for the blueprint’s connector, if your blueprint uses one — this is how the client’s agent reads data from **your** API. Sent credentials are stored encrypted.',
          },
        ],
      },
      { kind: 'h2', id: 'semantics', text: 'Re-calling with the same ref' },
      {
        kind: 'list',
        items: [
          'The client’s **agent is never re-created** — customizations made after provisioning are preserved.',
          'Connector **credentials are rotated** to the values you send. Use this to keep tokens fresh.',
          'The call never returns Auphere-internal ids. Your `external_client_ref` is the only handle you need.',
        ],
      },
      {
        kind: 'callout',
        tone: 'note',
        text: 'A freshly provisioned client is in a `provisioning` state: the agent exists but does not respond until the client [connects WhatsApp](/docs/embed/connect-whatsapp).',
      },
    ],
  },
  es: {
    title: 'Provisionar clientes',
    description:
      'Crea un workspace aislado de Auphere — con un agente listo — cada vez que un cliente se da de alta en tu producto.',
    blocks: [
      {
        kind: 'p',
        text: 'Antes de que un cliente pueda conectar WhatsApp o enviar campañas, necesita un workspace del lado de Auphere. Lo creas con una sola llamada idempotente desde tu backend, normalmente donde tu producto crea el registro del cliente.',
      },
      { kind: 'h2', id: 'blueprint', text: 'Tu blueprint de partner' },
      {
        kind: 'p',
        text: 'Durante el alta, el equipo de Auphere configura un **blueprint** para tu cuenta de partner: qué vertical de agente reciben tus clientes (p. ej. un asistente de cobranza), qué connector vincula el agente con tu API, y si los clientes se activan automáticamente al conectar WhatsApp. La provisión clona ese blueprint para cada cliente nuevo — así cada cliente arranca con un agente probado, personalizado mediante placeholders que tú controlas.',
      },
      { kind: 'h2', id: 'endpoint', text: 'Crear o actualizar un cliente' },
      {
        kind: 'p',
        text: '`POST /v1/partners/clients` es **idempotente** sobre `external_client_ref`: puedes llamarlo las veces que quieras con el mismo ref.',
      },
      { kind: 'code', language: 'http', title: 'Request', code: PROVISION_REQUEST },
      { kind: 'code', language: 'json', title: 'Response', code: PROVISION_RESPONSE },
      {
        kind: 'params',
        items: [
          {
            name: 'external_client_ref',
            type: 'string',
            required: true,
            description: 'Tu id estable para el cliente. Lo volverás a usar al emitir tokens de sesión. No cambia nunca.',
          },
          {
            name: 'name',
            type: 'string',
            required: true,
            description: 'Nombre visible del negocio del cliente.',
          },
          {
            name: 'timezone',
            type: 'string',
            description: 'Timezone IANA, p. ej. `America/Caracas`. Se usa para scheduling y comportamiento en horario laboral.',
          },
          {
            name: 'agent.placeholders',
            type: 'object',
            description: 'Valores para los placeholders del blueprint (nombre del agente, teléfonos admin, etc.). Las claves disponibles dependen de tu blueprint — te las compartimos en el alta. Un `422` te dice exactamente qué placeholder falta.',
          },
          {
            name: 'connector',
            type: 'object',
            description: 'Credenciales y metadata del connector del blueprint, si tu blueprint usa uno — así el agente del cliente lee datos de **tu** API. Las credenciales se guardan cifradas.',
          },
        ],
      },
      { kind: 'h2', id: 'semantics', text: 'Volver a llamar con el mismo ref' },
      {
        kind: 'list',
        items: [
          'El **agente del cliente nunca se re-crea** — las personalizaciones posteriores a la provisión se preservan.',
          'Las **credenciales del connector se rotan** a los valores que envíes. Úsalo para mantener tokens frescos.',
          'La llamada nunca devuelve ids internos de Auphere. Tu `external_client_ref` es el único identificador que necesitas.',
        ],
      },
      {
        kind: 'callout',
        tone: 'note',
        text: 'Un cliente recién provisionado queda en estado `provisioning`: el agente existe pero no responde hasta que el cliente [conecta WhatsApp](/docs/embed/connect-whatsapp).',
      },
    ],
  },
};

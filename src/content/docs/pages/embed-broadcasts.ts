import type { DocPage } from '../types';

const REACT_BUTTON = `import { AuphereBroadcastButton } from "@auphere/embed/react";

<AuphereBroadcastButton
  auphere={auphere}
  recipients={[
    { phone: "+56912345678", variables: { cliente: "Ana", saldo_pendiente: "$12.000" } },
    { phone: "+56987654321", variables: { cliente: "Luis", saldo_pendiente: "$8.000" } },
  ]}
  className="your-button-class"
  onDone={({ broadcastId, accepted }) => console.log(broadcastId, accepted)}
>
  Campañas WhatsApp
</AuphereBroadcastButton>`;

const VANILLA_OPEN = `await auphere.openBroadcast({
  recipients: [
    { phone: "+56912345678", variables: { cliente: "Ana", saldo_pendiente: "$12.000" } },
  ],
  onDone: ({ broadcastId, accepted }) => { /* accepted = recipients queued */ },
  onExit: () => { /* modal closed */ },
});`;

export const embedBroadcasts: DocPage = {
  slug: ['embed', 'broadcasts'],
  group: 'guides',
  en: {
    title: 'Sending broadcasts',
    description:
      'Let your clients send approved WhatsApp templates with dynamic variables to a list of recipients — your data, their number, our delivery rules.',
    blocks: [
      {
        kind: 'p',
        text: 'A broadcast sends one **approved WhatsApp template** to N recipients, each with their own variable values. The division of labor is strict: **your app provides the audience** (your CRM is the source of truth), and the Auphere modal lets the client pick a template, preview it with real values, and send. The widget never invents recipients.',
      },
      { kind: 'h2', id: 'react', text: 'React' },
      {
        kind: 'p',
        text: '`AuphereBroadcastButton` renders only when that client’s WhatsApp is connected, and opens the modal on click:',
      },
      { kind: 'code', language: 'tsx', code: REACT_BUTTON },
      { kind: 'h2', id: 'vanilla', text: 'Vanilla JavaScript' },
      {
        kind: 'p',
        text: 'Without React, gate your own button with the status API and call `openBroadcast` directly:',
      },
      { kind: 'code', language: 'ts', code: VANILLA_OPEN },
      { kind: 'h2', id: 'recipients', text: 'Recipients and variables' },
      {
        kind: 'params',
        items: [
          {
            name: 'phone',
            type: 'string',
            required: true,
            description: 'E.164 format, e.g. `+56912345678`. Spaces and dashes are tolerated.',
          },
          {
            name: 'variables',
            type: 'Record<string, string>',
            description: 'Values for the template’s **named parameters** — keys must match the parameter names of the approved template (e.g. `{ cliente: "Ana" }` for a `{{cliente}}` placeholder). You map your schema to those names in your backend.',
          },
        ],
      },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Named parameters only',
        text: 'Templates with positional parameters (`{{1}}`, `{{2}}`) are not supported — the API rejects them with a `422`. Create templates with named parameters.',
      },
      { kind: 'h2', id: 'templates', text: 'Templates' },
      {
        kind: 'p',
        text: 'Each client sends from their own WhatsApp Business account, so templates are approved by Meta **per client**. The modal only offers templates that are already approved. Today the initial template set is created with assistance from the Auphere team right after a client connects; automatic template provisioning per partner is on the roadmap.',
      },
      { kind: 'h2', id: 'delivery', text: 'Delivery rules' },
      {
        kind: 'list',
        items: [
          '**Opt-outs are enforced.** Recipients who opted out are excluded before sending — you don’t need to filter them yourself (though you can).',
          '**Templates work outside the 24-hour window.** That’s what they’re for; free-form messages are not part of broadcasts.',
          '**Audience cap.** Each send is capped (250 recipients by default, configurable per partner). Larger audiences get a `413` — split the send or ask us to raise your cap.',
          '**Attribution.** `onDone` returns the `broadcastId` and how many recipients were accepted; per-client usage is tracked for reporting and billing.',
        ],
      },
    ],
  },
  es: {
    title: 'Enviar campañas',
    description:
      'Permite a tus clientes enviar plantillas aprobadas de WhatsApp con variables dinámicas a una lista de destinatarios — tus datos, su número, nuestras reglas de entrega.',
    blocks: [
      {
        kind: 'p',
        text: 'Un broadcast envía una **plantilla aprobada de WhatsApp** a N destinatarios, cada uno con sus propios valores de variables. La división del trabajo es estricta: **tu app provee la audiencia** (tu CRM es la fuente de verdad), y el modal de Auphere deja al cliente elegir plantilla, previsualizarla con valores reales y enviar. El widget nunca inventa destinatarios.',
      },
      { kind: 'h2', id: 'react', text: 'React' },
      {
        kind: 'p',
        text: '`AuphereBroadcastButton` se renderiza solo cuando el WhatsApp de ese cliente está conectado, y abre el modal al hacer click:',
      },
      { kind: 'code', language: 'tsx', code: REACT_BUTTON },
      { kind: 'h2', id: 'vanilla', text: 'JavaScript vanilla' },
      {
        kind: 'p',
        text: 'Sin React, controla tu propio botón con la API de estado y llama `openBroadcast` directamente:',
      },
      { kind: 'code', language: 'ts', code: VANILLA_OPEN },
      { kind: 'h2', id: 'recipients', text: 'Destinatarios y variables' },
      {
        kind: 'params',
        items: [
          {
            name: 'phone',
            type: 'string',
            required: true,
            description: 'Formato E.164, p. ej. `+56912345678`. Se toleran espacios y guiones.',
          },
          {
            name: 'variables',
            type: 'Record<string, string>',
            description: 'Valores para los **parámetros nombrados** de la plantilla — las claves deben coincidir con los nombres de parámetro de la plantilla aprobada (p. ej. `{ cliente: "Ana" }` para un placeholder `{{cliente}}`). El mapeo de tu esquema a esos nombres lo haces en tu backend.',
          },
        ],
      },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Solo parámetros nombrados',
        text: 'Las plantillas con parámetros posicionales (`{{1}}`, `{{2}}`) no están soportadas — la API las rechaza con `422`. Crea las plantillas con parámetros nombrados.',
      },
      { kind: 'h2', id: 'templates', text: 'Plantillas' },
      {
        kind: 'p',
        text: 'Cada cliente envía desde su propia cuenta de WhatsApp Business, así que las plantillas las aprueba Meta **por cliente**. El modal solo ofrece plantillas ya aprobadas. Hoy el set inicial de plantillas se crea con asistencia del equipo de Auphere justo después de que el cliente conecta; la provisión automática de plantillas por partner está en el roadmap.',
      },
      { kind: 'h2', id: 'delivery', text: 'Reglas de entrega' },
      {
        kind: 'list',
        items: [
          '**Los opt-outs se respetan.** Los destinatarios que se dieron de baja se excluyen antes del envío — no necesitas filtrarlos tú (aunque puedes).',
          '**Las plantillas funcionan fuera de la ventana de 24 horas.** Para eso existen; los mensajes libres no forman parte de los broadcasts.',
          '**Tope de audiencia.** Cada envío tiene un tope (250 destinatarios por defecto, configurable por partner). Audiencias mayores reciben `413` — trocea el envío o pídenos subir tu tope.',
          '**Atribución.** `onDone` devuelve el `broadcastId` y cuántos destinatarios fueron aceptados; el uso por cliente queda registrado para reporting y facturación.',
        ],
      },
    ],
  },
};

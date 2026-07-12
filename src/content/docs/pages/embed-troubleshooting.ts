import type { DocPage } from '../types';

export const embedTroubleshooting: DocPage = {
  slug: ['embed', 'troubleshooting'],
  group: 'reference',
  en: {
    title: 'Troubleshooting',
    description:
      'The symptoms we see most often during integrations, their probable cause, and what to do about each one.',
    blocks: [
      {
        kind: 'table',
        head: ['Symptom', 'Probable cause', 'What to do'],
        rows: [
          [
            '`401` when minting a session token',
            'Key revoked, expired or malformed (bad checksum).',
            'Verify the key in your secret store; ask us for a rotation if in doubt.',
          ],
          [
            '`403` — session token lacks a scope',
            'The token was minted before a permissions change.',
            'Re-mint the token — scopes travel inside it.',
          ],
          [
            '`422` when provisioning a client',
            'A blueprint placeholder has no value, or connector credentials are empty.',
            'The `detail` field names the exact missing key. Send it and retry — the call is idempotent.',
          ],
          [
            'Widget doesn’t mount / blank iframe',
            'The page’s origin is not in your key’s allowed origins.',
            'Register the exact origin (scheme + host + port). Localhost and staging origins count as distinct.',
          ],
          [
            'Meta rejects the authorization during signup',
            'The OAuth code expired or was reused.',
            'Close the modal and restart the flow — codes are single-use and short-lived.',
          ],
          [
            '`409` when connecting a number',
            'That WhatsApp number is already linked to another workspace.',
            'Contact us to release the number from its previous workspace first.',
          ],
          [
            '`413` when sending a broadcast',
            'The audience exceeds your per-send cap (default 250).',
            'Split the send into batches, or ask us to raise your cap.',
          ],
          [
            'A template doesn’t appear in the modal',
            'It isn’t APPROVED yet in that client’s WhatsApp Business account.',
            'Wait for Meta’s approval; the modal only offers approved templates.',
          ],
          [
            '`token_refresh_failed` error from the SDK',
            'Your session endpoint failed while the modal was open.',
            'Make sure the endpoint works without user interaction (it’s called ~every 15 minutes while a modal stays open).',
          ],
        ],
      },
      {
        kind: 'callout',
        tone: 'note',
        title: 'Still stuck?',
        text: 'Write to [contacto@auphere.com](mailto:contacto@auphere.com) with your partner slug, the `external_client_ref` involved and the response body you received — that’s everything we need to trace a request.',
      },
    ],
  },
  es: {
    title: 'Solución de problemas',
    description:
      'Los síntomas que más vemos durante las integraciones, su causa probable, y qué hacer en cada caso.',
    blocks: [
      {
        kind: 'table',
        head: ['Síntoma', 'Causa probable', 'Qué hacer'],
        rows: [
          [
            '`401` al emitir un token de sesión',
            'Key revocada, expirada o malformada (checksum inválido).',
            'Verifica la key en tu secret store; pídenos una rotación si hay dudas.',
          ],
          [
            '`403` — el token no tiene un scope',
            'El token se emitió antes de un cambio de permisos.',
            'Re-emite el token — los scopes viajan dentro de él.',
          ],
          [
            '`422` al provisionar un cliente',
            'Un placeholder del blueprint no tiene valor, o las credenciales del connector están vacías.',
            'El campo `detail` nombra la clave exacta que falta. Envíala y reintenta — la llamada es idempotente.',
          ],
          [
            'El widget no monta / iframe en blanco',
            'El origen de la página no está en los orígenes permitidos de tu key.',
            'Registra el origen exacto (esquema + host + puerto). Localhost y staging cuentan como orígenes distintos.',
          ],
          [
            'Meta rechaza la autorización durante el signup',
            'El código OAuth expiró o se reutilizó.',
            'Cierra el modal y reinicia el flujo — los códigos son de un solo uso y corta vida.',
          ],
          [
            '`409` al conectar un número',
            'Ese número de WhatsApp ya está vinculado a otro workspace.',
            'Contáctanos para liberar el número de su workspace anterior primero.',
          ],
          [
            '`413` al enviar un broadcast',
            'La audiencia supera tu tope por envío (250 por defecto).',
            'Trocea el envío en lotes, o pídenos subir tu tope.',
          ],
          [
            'Una plantilla no aparece en el modal',
            'Aún no está APROBADA en la cuenta de WhatsApp Business de ese cliente.',
            'Espera la aprobación de Meta; el modal solo ofrece plantillas aprobadas.',
          ],
          [
            'Error `token_refresh_failed` del SDK',
            'Tu endpoint de sesión falló mientras el modal estaba abierto.',
            'Asegúrate de que el endpoint funciona sin interacción del usuario (se llama ~cada 15 minutos mientras un modal siga abierto).',
          ],
        ],
      },
      {
        kind: 'callout',
        tone: 'note',
        title: '¿Sigues atascado?',
        text: 'Escribe a [contacto@auphere.com](mailto:contacto@auphere.com) con tu slug de partner, el `external_client_ref` involucrado y el cuerpo de la respuesta que recibiste — con eso podemos trazar cualquier request.',
      },
    ],
  },
};

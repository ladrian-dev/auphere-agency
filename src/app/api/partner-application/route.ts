import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

/**
 * Partner program application (§9.2): 8 fields, 2 hard qualifiers.
 * Honeypot + naive per-IP rate limit + Zod. No captcha (friction + a11y).
 * Routing rule: <3 clients → Referral; ≥3 → Reseller call.
 */

const ApplicationSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  company: z.string().min(1).max(160),
  website: z.string().min(2).max(300),
  clients: z.enum(['0-2', '3-10', '11-50', '50+']),
  vertical: z.enum(['health', 'beauty', 'hospitality', 'retail', 'services', 'software', 'other']),
  country: z.string().min(2).max(80),
  notes: z.string().max(2000).optional().default(''),
  locale: z.enum(['es', 'en']).default('es'),
  // Honeypot — humans never see it; bots fill it. Any content → fake success.
  fax: z.string().optional(),
});

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const stamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  stamps.push(now);
  hits.set(ip, stamps);
  return stamps.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip = ((request.headers.get('x-forwarded-for') ?? 'unknown').split(',')[0] ?? 'unknown').trim();
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  let data: z.infer<typeof ApplicationSchema>;
  try {
    data = ApplicationSchema.parse(await request.json());
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  // Honeypot tripped → pretend success, send nothing.
  if (data.fax && data.fax.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const track = data.clients === '0-2' ? 'REFERRAL' : 'RESELLER';

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Sin clave no hay entrega — el formulario muestra el fallback de email
    // directo. Nunca aceptamos un lead que no podemos entregar.
    console.error('[partner-application] RESEND_API_KEY missing — returning 503');
    return NextResponse.json({ ok: false, error: 'unavailable' }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const to = process.env.PARTNER_APPLICATIONS_TO ?? 'contacto@auphere.com';

  const { error } = await resend.emails.send({
    from: process.env.PARTNER_APPLICATIONS_FROM ?? 'Auphere Web <web@auphere.com>',
    to,
    replyTo: data.email,
    subject: `[Partner · ${track}] ${data.company} — ${data.clients} clientes · ${data.vertical}`,
    text: [
      `Ruteo sugerido: ${track} (${data.clients} clientes potenciales)`,
      '',
      `Nombre:    ${data.name}`,
      `Email:     ${data.email}`,
      `Empresa:   ${data.company}`,
      `Web:       ${data.website}`,
      `Clientes:  ${data.clients}`,
      `Vertical:  ${data.vertical}`,
      `País:      ${data.country}`,
      `Idioma:    ${data.locale}`,
      '',
      'Notas:',
      data.notes || '—',
    ].join('\n'),
  });

  if (error) {
    console.error('[partner-application] resend error', error);
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true, track });
}

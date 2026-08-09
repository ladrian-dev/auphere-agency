// Next.js 16 renombró middleware.ts a proxy.ts.
// Aplica el routing de locale de next-intl y, en staging, la puerta de acceso.
//
// ⚠️ Tiene que vivir en `src/`, al mismo nivel que `app/`. Estuvo en la raíz del
// repo y Next NO lo cargaba: el bundle `.next/server/middleware.js` salía como
// un stub de 221 bytes y `middleware-manifest.json` vacío. El sitio parecía
// funcionar porque las rutas `/en` y `/es` son estáticas y la redirección de `/`
// la hace `src/app/page.tsx`, así que nadie notó que el middleware estaba muerto.
import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

/**
 * Puerta de staging.
 *
 * `landing-staging.auphere.com` sirve la rama `develop` en una URL pública. Que
 * no esté indexada evita que la encuentren buscando; no evita que la vea quien
 * reciba el enlace. Esta es la cerradura.
 *
 * Se activa SOLO si existe `STAGING_BASIC_AUTH` con el formato `usuario:clave`.
 * En producción esa variable no se define y el middleware no hace nada, así que
 * es imposible que una configuración a medias deje auphere.com pidiendo
 * contraseña.
 *
 * ⚠️ NO CONFIAR EN ESTA PUERTA COMO ÚNICA PROTECCIÓN mientras no se verifique en
 * el despliegue real. Comprobado el 2026-08-09: con `next build` + `next start`
 * (con y sin turbopack, con export por defecto y nombrado, con el archivo en la
 * raíz y en `src/`) el proxy se compila —el build imprime `ƒ Proxy (Middleware)`—
 * pero NUNCA se ejecuta: forzándolo a devolver 418 para todo, `/es` seguía
 * respondiendo 200 con el HTML prerenderizado, y `middleware-manifest.json`
 * queda vacío. Es posible que en Vercel sí corra (su runtime no es `next start`),
 * pero eso hay que verificarlo con una petición real antes de darlo por bueno.
 *
 * Hasta entonces, la cerradura de staging es la Deployment Protection de Vercel,
 * que actúa en el edge antes de llegar a la app y no depende de este archivo.
 * Verificación: `curl -sI https://landing-staging.auphere.com/es` debe devolver
 * 401 sin credenciales.
 */
function unauthorized(): NextResponse {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Auphere staging", charset="UTF-8"',
      // Que ningún intermediario cachee la respuesta protegida.
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

/** Comparación en tiempo constante: evita distinguir credenciales por latencia. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function passesStagingGate(request: NextRequest): boolean {
  const expected = process.env.STAGING_BASIC_AUTH;
  if (!expected) return true; // sin credencial configurada, sin puerta

  const header = request.headers.get('authorization');
  if (!header?.startsWith('Basic ')) return false;

  try {
    const decoded = atob(header.slice(6));
    return safeEqual(decoded, expected);
  } catch {
    return false;
  }
}

export default function proxy(request: NextRequest) {
  if (!passesStagingGate(request)) return unauthorized();
  return intlMiddleware(request);
}

export const config = {
  // Match all paths except API routes, static files, _next internals, and known assets.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

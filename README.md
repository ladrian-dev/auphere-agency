# auphere-agency

Landing de [auphere.com](https://auphere.com) — v3 «Platform Era» + capa v4 «IA como servicio». Producción en `main`, staging (`landing-staging.auphere.com`) en `develop`.

**Stack:** Next.js 16 · React 19 · Tailwind 4 · next-intl 4 · GSAP (único motor de movimiento) · Lenis · Cal.com embed · Plausible.

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000/en o /es
```

## Comandos

```bash
pnpm dev          # Turbopack dev server
pnpm build        # Producción · SSG en /en y /es + sitemap + robots
pnpm start        # Servir el build
pnpm typecheck    # TypeScript estricto
pnpm lint
```

## Antes de tocar nada

Lee [CLAUDE.md](./CLAUDE.md) y la documentación de estrategia del vault Obsidian:

- `~/Work/Auphere/landing/landing.md` — estrategia v2
- `~/Work/Auphere/landing/action-plan.md` — plan de acción end-to-end
- `~/Work/Auphere/landing/attio-study.md` — referencia visual primaria

## Variables de entorno

Copia `.env.example` a `.env.local` y rellena:

```
NEXT_PUBLIC_SITE_URL=https://auphere.com
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=auphere.com
RESEND_API_KEY=          # (opcional) form de contacto alternativo
```

## Estructura

Ver [CLAUDE.md](./CLAUDE.md) §"Estructura" para el layout completo de carpetas.

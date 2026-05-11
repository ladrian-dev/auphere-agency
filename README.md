# auphere-agency

Landing v2 de [auphere.com](https://auphere.com).

**Stack:** Next.js 16 · React 19 · Tailwind 4 · next-intl 4 · Motion · Lenis · Cal.com embed.

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
NEXT_PUBLIC_CAL_LINK=auphere/diagnostico-45min
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=auphere.com
RESEND_API_KEY=          # (opcional) form de contacto alternativo
```

## Estructura

Ver [CLAUDE.md](./CLAUDE.md) §"Estructura" para el layout completo de carpetas.

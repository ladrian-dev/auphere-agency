import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';

/**
 * Root `/` handler — redirects to the default locale.
 *
 * The next-intl middleware (proxy.ts) is supposed to handle this, but during
 * dev (and sometimes prod with edge runtime) it doesn't always fire on the
 * root path. This server component is a defensive fallback that guarantees
 * `/` always lands somewhere — works regardless of middleware state.
 *
 * Note: at runtime users will rarely hit `/` because:
 *  - Internal links go to `/{locale}/...`
 *  - The middleware on Vercel will short-circuit to the negotiated locale
 *  - The user-typed `auphere.com` will get redirected here, then forwarded
 */
export default function RootPage(): never {
  redirect(`/${routing.defaultLocale}`);
}

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auphere.com'),
};

/**
 * Root layout — minimal pass-through. The real <html>/<body> live inside
 * src/app/[locale]/layout.tsx so we can apply the locale, fonts, and providers
 * with the correct attribute on <html>.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

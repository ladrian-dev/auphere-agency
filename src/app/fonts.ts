import localFont from 'next/font/local';
import { JetBrains_Mono } from 'next/font/google';

// Helvena — display + body. Single variable woff2 covers full weight axis.
export const helvena = localFont({
  src: [
    {
      path: '../../public/fonts/Helvena-Variable.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-display',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
});

// Behind The Nineties — italic-only retro-90s accent. Used for kickers,
// pull quotes, stats, and emphasized words. Italic-only by design.
// Source: brand-system.md §2 documents this as the official accent face.
export const behindTheNineties = localFont({
  src: [
    {
      path: '../../public/fonts/BehindTheNineties-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/BehindTheNineties-Medium-Italic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/BehindTheNineties-Semibold-Italic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/BehindTheNineties-Bold-Italic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-accent',
  display: 'swap',
  preload: false,
  fallback: ['Georgia', 'serif'],
});

// JetBrains Mono — code, captions, eyebrows, section markers.
export const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  preload: false,
});

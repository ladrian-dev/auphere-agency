import localFont from 'next/font/local';

/**
 * Helvena — única familia del sitio (README del rediseño §Design tokens).
 * Variable, un solo woff2. Solo se usan los pesos 400 / 500 / 600.
 */
export const helvena = localFont({
  src: [
    {
      path: '../../public/fonts/Helvena-Variable.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-helvena',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
});

import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Auphere',
    short_name: 'Auphere',
    description: 'Agentes de IA a medida — los construimos, los operamos, los mejoramos.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F1F7F6',
    theme_color: '#03624C',
    icons: [
      { src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
}

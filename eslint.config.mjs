import next from 'eslint-config-next';

export default [
  ...next,
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
  {
    // eslint-plugin-react's auto-detection uses an API removed in ESLint 10.
    settings: { react: { version: '19' } },
  },
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'framer-motion',
              message: 'Use "motion/react" — framer-motion was renamed to motion in 2026.',
            },
            {
              name: '@studio-freight/lenis',
              message: 'Use "lenis" — @studio-freight/lenis was renamed to lenis.',
            },
            {
              name: 'gsap',
              message: 'Import from "@/lib/motion/gsap" — the central registry guarantees plugins and brand eases are registered.',
            },
          ],
        },
      ],
    },
  },
  {
    // The registry itself is the one allowed direct consumer of gsap.
    files: ['src/lib/motion/gsap.ts'],
    rules: { 'no-restricted-imports': 'off' },
  },
];

import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
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
          ],
        },
      ],
    },
  },
];

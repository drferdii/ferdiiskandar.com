import { base } from '@the-abyss/config-eslint/base'

/**
 * App-local flat ESLint config so rules apply when ESLint cwd is this package
 * (paths like `components/*.tsx` do not match monorepo-root `apps/**` glob blocks).
 */
export default [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      '.output/**',
      '.turbo/**',
      'coverage/**',
      '.cursor/**',
      'hello/**',
    ],
  },
  ...base,
  {
    files: ['next-env.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
  {
    files: ['**/*.mjs', 'next.config.mjs'],
    languageOptions: {
      globals: {
        Buffer: 'readonly',
        console: 'readonly',
        process: 'readonly',
      },
    },
  },
  {
    files: ['components/AbbyWidget.tsx'],
    rules: {
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
    },
  },
]

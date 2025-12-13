import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import astroPlugin from 'eslint-plugin-astro';
import sveltePlugin from 'eslint-plugin-svelte';

export default [
  // Ignore patterns
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.astro/**',
      '**/bun.lock',
      '**/*.lock',
      '**/bun.lockb',
      '**/.obsidian/**',
      '**/content/**',
    ],
  },

  // Node.js
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },

  // JavaScript
  js.configs.recommended,

  // TypeScript
  ...tseslint.configs.recommended,

  // Astro
  ...astroPlugin.configs.recommended,

  // Svelte
  ...sveltePlugin.configs['flat/recommended'],

  // Prettier
  prettierConfig,
  ...sveltePlugin.configs['flat/prettier'],

  // Astro Parser
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroPlugin.parser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.astro'],
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
  },

  // Svelte Parser
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
];

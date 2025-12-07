import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default [
  // Astro（推奨設定）
  ...eslintPluginAstro.configs.recommended,

  // TypeScript（推奨設定）
  {
    files: ['**/*.ts', '**/*.tsx'],
    ...tseslint.configs.recommended[0],
  },

  // React（推奨設定 + React 17+ JSX Runtime）
  {
    files: ['**/*.tsx', '**/*.jsx'],
    ...reactPlugin.configs.flat.recommended,
    ...reactPlugin.configs.flat['jsx-runtime'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactPlugin.configs.flat['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
    },
  },

  // 除外
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.astro/**',
      '.vercel/**',
      '**/.obsidian/**',
    ],
  },
];

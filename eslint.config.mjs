import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default [
  // Astro ファイル用
  ...eslintPluginAstro.configs.recommended,

  // TypeScript/React ファイル用
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      // TypeScript recommended rules (Biome 相当)
      ...tseslint.configs.recommended.rules,

      // React rules
      'react/jsx-uses-react': 'off', // React 17+ は不要
      'react/react-in-jsx-scope': 'off', // React 17+ は不要
      'react/jsx-key': 'warn',
      'react/no-array-index-key': 'warn', // Biome の noArrayIndexKey

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Biome recommended 相当のルール
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
      eqeqeq: ['error', 'always'],
    },
  },

  // 除外設定
  {
    ignores: ['node_modules/**', 'dist/**', '.astro/**', '**/.obsidian/**'],
  },
];

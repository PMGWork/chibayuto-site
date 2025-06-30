// @ts-check
import { defineConfig } from 'astro/config';

import sanity from '@sanity/astro';
import react from '@astrojs/react';
import node from '@astrojs/node';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

// 環境に基づいてアダプターを選択
const isPreview = process.env.ASTRO_PREVIEW === 'true';
const isDev = process.env.NODE_ENV === 'development';

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: 'rao1a119',
      dataset: 'production',
      useCdn: false,
      apiVersion: "2025-01-28",
      studioBasePath: '/studio'
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  // previewモードまたは開発モードの場合はnodeアダプター、それ以外はvercelアダプター
  adapter: (isPreview || isDev) ? node({
    mode: 'standalone'
  }) : vercel(),
});
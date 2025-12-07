// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

import remarkImages from './src/plugins/remark-images.js';
import rehypeImageGrid from './src/plugins/rehype-image-grid.js';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), react()],
  markdown: {
    remarkPlugins: [remarkImages],
    rehypePlugins: [rehypeImageGrid],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel(),
});

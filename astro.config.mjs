// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import remarkImages from './src/plugins/remark-images';
import rehypeImageGrid from './src/plugins/rehype-image-grid';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://chibayuto.com',
  integrations: [mdx(), react(), sitemap()],
  markdown: {
    remarkPlugins: [remarkImages],
    rehypePlugins: [rehypeImageGrid],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

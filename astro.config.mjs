// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

import remarkImages from './src/plugins/remark-images';
import rehypeImageGrid from './src/plugins/rehype-image-grid';
import rehypeTableLinks from './src/plugins/rehype-table-links';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://chibayuto.com',
  integrations: [mdx(), svelte(), sitemap(), icon()],
  markdown: {
    remarkPlugins: [remarkImages],
    rehypePlugins: [rehypeImageGrid, rehypeTableLinks],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    responsiveStyles: true,
    layout: 'constrained',
  },
});

// @ts-check
import { defineConfig } from 'astro/config';

import sanity from '@sanity/astro';
import react from '@astrojs/react';
import node from '@astrojs/node';
import swup from '@swup/astro';

import tailwindcss from '@tailwindcss/vite';

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
    swup({
      theme: false,
      smoothScrolling: true,
      updateBodyClass: true,
      containers: ['#swup'],
      cache: false,
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: node({
    mode: 'standalone',
  }),
});
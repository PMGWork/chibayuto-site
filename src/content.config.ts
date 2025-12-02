import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const works = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: path.resolve(__dirname, '../content/works')
  }),
  schema: z.object({
    tags: z.array(z.string()).optional().nullable(),
    createdAt: z.coerce.date(),
    thumbnail: z.string().optional().nullable(),
  }),
});

export const collections = {
  works,
};

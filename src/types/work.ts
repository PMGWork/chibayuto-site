import type { CollectionEntry } from 'astro:content';

export type Work = CollectionEntry<'works'> & {
  thumbnail?: string;
  title?: string;
};

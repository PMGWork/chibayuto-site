import type { CollectionEntry } from 'astro:content';

export interface OptimizedImage {
  src: string;
  srcSet: {
    values: string[];
    attribute: string;
  };
  attributes: {
    img: Record<string, string>;
    picture: Record<string, string>;
  };
}

export type Work = CollectionEntry<'works'> & {
  thumbnail?: string;
  title?: string;
  optimizedImage?: OptimizedImage;
};

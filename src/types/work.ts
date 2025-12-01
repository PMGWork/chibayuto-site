import type { CollectionEntry } from "astro:content";

export type WorkEntry = CollectionEntry<"works">;
export type WorkWithThumbnail = WorkEntry & { thumbnail?: string };

import type { CollectionEntry } from "astro:content";

export type WorkEntry = CollectionEntry<"works">;
export type Work = WorkEntry & { thumbnail?: string; title?: string };

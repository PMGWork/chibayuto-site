import type { Work } from "../types/work";

export const getAssetFolderName = (work: Work) => {
  if (work.filePath) {
    const match = work.filePath.match(/([^/]+)\.(mdx?)$/i);
    if (match?.[1]) {
      return match[1];
    }
  }

  return work.id.replace(/\.mdx?$/, "");
};

export const getThumbnailPath = (work: Work, filename: string) => {
  return `/works-assets/${getAssetFolderName(work)}/${filename}`;
};

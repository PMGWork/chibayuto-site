import type { WorkWithThumbnail } from "../types/work";

export const getAssetFolderName = (work: WorkWithThumbnail) => {
  if (work.filePath) {
    const match = work.filePath.match(/([^/]+)\.(mdx?)$/i);
    if (match?.[1]) {
      return match[1];
    }
  }

  return work.id.replace(/\.mdx?$/, "");
};

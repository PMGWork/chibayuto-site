import type { ImageMetadata } from 'astro';

// src/assets/works 以下の全ての画像を glob で取得
// これにより、Vite/Astro がこれらのファイルを画像アセットとして認識・最適化できるようになる
const workImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/works/**/*.{jpeg,jpg,png,gif,webp,svg}',
);

/**
 * 指定された作品ID（フォルダ名）とファイル名に対応する画像メタデータを取得する
 * @param workId 作品のID（フォルダ名）
 * @param filename 画像ファイル名
 * @returns ImageMetadata または undefined
 */
export async function getWorkImage(
  workId: string,
  filename: string,
): Promise<ImageMetadata | undefined> {
  // パターン: /src/assets/works/[workId]/[filename]
  const imagePath = `/src/assets/works/${workId}/${filename}`;

  const imageImport = workImages[imagePath];

  if (!imageImport) {
    console.warn(`Image not found: ${imagePath}`);
    return undefined;
  }

  // glob の結果は関数なので実行して default export を取得
  const image = await imageImport();
  return image.default;
}

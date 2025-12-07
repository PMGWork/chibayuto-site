import type { ImageMetadata } from 'astro';

// glob で src/assets/works 以下の全ての画像を取得
const workImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/works/**/*.{jpeg,jpg,png,gif,webp,svg}',
);

// 指定された作品ID（フォルダ名）とファイル名に対応する画像メタデータを取得する
export async function getWorkImage(
  workId: string,
  filename: string,
): Promise<ImageMetadata | undefined> {
  const imagePath = `/src/assets/works/${workId}/${filename}`;

  const imageImport = workImages[imagePath];
  if (!imageImport) return undefined;

  const image = await imageImport();
  return image.default;
}

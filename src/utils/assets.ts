import type { ImageMetadata } from 'astro';

// glob で content/chibayuto-vault/works/assets 以下の全ての画像を取得
const workImages = import.meta.glob<{ default: ImageMetadata }>(
  '/content/chibayuto-vault/works/assets/**/*.{jpeg,jpg,png,gif,webp,svg}',
);

// 指定された作品ID（フォルダ名）とファイル名に対応する画像メタデータを取得する
export async function getWorkImage(
  workId: string,
  filename: string,
): Promise<ImageMetadata | undefined> {
  const imagePath = `/content/chibayuto-vault/works/assets/${workId}/${filename}`;

  const imageImport = workImages[imagePath];
  if (!imageImport) return undefined;

  const image = await imageImport();
  return image.default;
}

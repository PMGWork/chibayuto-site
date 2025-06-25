import type { SanityImageSource, SanityAsset, SanityImageDimensions } from '@sanity/image-url/lib/types/types';

// 画像アセットの詳細を含む型
export type ImageAssetDetails = SanityAsset & {
  metadata?: {
    dimensions?: SanityImageDimensions;
  };
};

// サムネイル画像の型（アセット詳細を含む）
export type ThumbnailValue = SanityImageSource & {
  asset?: ImageAssetDetails;
};

// 画像グループ内の画像の型（アセット詳細を含む）
export type ImageValue = SanityImageSource & {
  caption?: string;
  asset?: ImageAssetDetails;
};

// 画像グループオブジェクトの型
export type ImageGroupValue = {
  _type: 'imageGroup';
  _key: string;
  images: Array<ImageValue>;
};

// 埋め込みオブジェクトの型
export type EmbedValue = {
  _type: 'embed';
  _key: string;
  url?: string;
};
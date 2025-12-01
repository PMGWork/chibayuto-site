"use client";

import type { ImageMetadata } from "astro";

const images = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/*.{jpeg,jpg,png,gif}",
  { eager: true }
);

const resolveImage = (thumbnail: any) => {
  if (typeof thumbnail === "string") {
    // /で始まる場合は/publicディレクトリのパスとして扱う
    if (thumbnail.startsWith("/")) {
      return { src: thumbnail };
    }

    // それ以外は/src/assets/imagesから探す
    const filename = thumbnail.split("/").pop();
    if (filename) {
      const key = `/src/assets/images/${filename}`;
      return images[key]?.default;
    }
  }
  return thumbnail;
};

interface Work {
  id: string;
  data: {
    thumbnail?: any;
    tags?: string[];
  };
}

interface WorkCardProps {
  work: Work;
}

export default function WorkCard({ work }: WorkCardProps) {
  const workTags = work.data.tags || [];
  const thumbnail = resolveImage(work.data.thumbnail);

  return (
    <div className="flex flex-col gap-4 pb-8">
      <a href={`/works/${work.id}`}>
        <div className="relative w-full overflow-hidden rounded-lg border-gray-200 border" style={{ paddingBottom: '56.25%' }}>
          {thumbnail ? (
            <img
              className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              src={thumbnail.src}
              alt={work.id}
              width={thumbnail.width}
              height={thumbnail.height}
              decoding="async"
            />
          ) : (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">画像がありません</p>
            </div>
          )}
        </div>
      </a>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl">{work.id}</h3>
        <div className='flex gap-2'>
          {workTags.map((tag, tagIndex) => (
            <span key={tagIndex} className="bg-gray-50 rounded-lg border-gray-200 border px-2 py-1 text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

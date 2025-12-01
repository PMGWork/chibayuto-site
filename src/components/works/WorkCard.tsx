"use client";

import type { WorkWithThumbnail } from "../../types/work";

interface WorkCardProps {
  work: WorkWithThumbnail;
}

export default function WorkCard({ work }: WorkCardProps) {
  const workTags = work.data.tags || [];
  const thumbnail = work.thumbnail;

  return (
    <div className="flex flex-col gap-4 pb-8">
      <a href={`/works/${work.id}`}>
        <div className="relative w-full overflow-hidden rounded-lg border-gray-200 border" style={{ paddingBottom: '56.25%' }}>
          {thumbnail ? (
            <img
              className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              src={thumbnail}
              alt={work.id}
              decoding="async"
              loading="lazy"
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

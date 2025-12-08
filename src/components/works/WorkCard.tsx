'use client';

import type { Work } from '../../types/work';

// Props
interface Props {
  work: Work;
}

export default function WorkCard({ work }: Props) {
  const workTags = work.data.tags || [];
  const { optimizedImage } = work;

  return (
    <div className="flex flex-col gap-4 pb-8">
      <a href={`/works/${work.id}`}>
        <div
          className="corner-lg relative w-full overflow-hidden rounded-xl"
          style={{ paddingBottom: '56.25%' }}
        >
          {optimizedImage ? (
            <img
              className="absolute top-0 left-0 h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              src={optimizedImage.src}
              srcSet={optimizedImage.srcSet.attribute}
              {...optimizedImage.attributes.img}
              alt={work.id}
            />
          ) : (
            <div className="corner-lg absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-xl bg-gray-200">
              <p className="text-gray-500">画像がありません</p>
            </div>
          )}
        </div>
      </a>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl">{work.title || work.id}</h3>
        <div className="flex gap-2">
          {workTags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="corner-md rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

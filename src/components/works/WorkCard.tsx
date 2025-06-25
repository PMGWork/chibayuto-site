"use client";

import { urlForImage } from '../../sanity/lib/url-for-image';

import type { SanityValues } from '../../../sanity.config';
import type { ThumbnailValue } from '../../types';

type Category = SanityValues['category'];
type Work = Omit<SanityValues['work'], 'categories'> & {
  categories?: Category[];
  thumbnail?: ThumbnailValue;
};

interface WorkCardProps {
  work: Work;
}

export default function WorkCard({work}: WorkCardProps) {
  return (
    <div className="flex flex-col gap-4 pb-8">
      <a href={`/works/${work.slug?.current}`}>
        <div className="relative w-full overflow-hidden rounded-lg border-gray-200 border" style={{ paddingBottom: '56.25%' }}>
          {work.thumbnail?.asset?.metadata?.dimensions ? (
            <img
              className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
              src={urlForImage(work.thumbnail).url()}
              alt={work?.name || '作品イメージ'}
              width={work.thumbnail.asset.metadata.dimensions.width}
              height={work.thumbnail.asset.metadata.dimensions.height}
              decoding="async"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">画像がありません</p>
            </div>
          )}
        </div>
      </a>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl">{work.name}</h3>
        <div className='flex gap-2'>
          {work.categories?.map((category: Category, tagIndex: number) => (
            <span key={tagIndex} className="bg-gray-50 rounded-lg border-gray-200 border px-2 py-1 text-xs font-medium">
              {category.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

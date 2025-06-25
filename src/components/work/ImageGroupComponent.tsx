"use client";

import { urlForImage } from '../../sanity/lib/url-for-image';
import type { ImageGroupValue } from "../../types";

export function ImageGroupComponent({ value }: { value: ImageGroupValue }) {
  if (value.images.length === 1) {
    const image = value.images[0];
    const dimensions = image.asset?.metadata?.dimensions;
    return (
      <div className="my-8">
        <div className="flex flex-col gap-2 items-center">
          { dimensions ? (
            <img
              className="rounded-lg border-gray-200 border w-full h-auto"
              src={urlForImage(image).url()}
              alt={image.caption || "画像"}
              width={dimensions.width}
              height={dimensions.height}
              decoding="async"
              loading="lazy"
            />
          ) : null }
          {image.caption && (
            <p className="text-gray-500 text-sm">{image.caption}</p>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        {value.images.map((image, index) => {
          const dimensions = image.asset?.metadata?.dimensions;
          return (
            <div key={index} className="flex flex-col gap-2 items-center">
              {dimensions ? (
                <img
                  className="rounded-lg border-gray-200 border w-full h-auto"
                  src={urlForImage(image).url()}
                  alt={image.caption || "画像"}
                  width={dimensions.width}
                  height={dimensions.height}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) calc(50vw - 1.5rem), 410px"
                  decoding="async"
                  loading="lazy"
                />
              ) : null }
              {image.caption && (
                <p className="text-gray-500 text-sm">{image.caption}</p>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
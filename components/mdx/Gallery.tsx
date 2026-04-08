// Gallery — responsive image grid for MDX content
// Requirements: 11.4

import React from 'react';
import Image from 'next/image';

interface GalleryImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

interface GalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  caption?: string;
}

const colClasses: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-4',
};

export function Gallery({ images, columns = 3, caption }: GalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <figure className="my-8">
      <div className={`grid gap-2 ${colClasses[columns] ?? colClasses[3]}`}>
        {images.map((img, i) => (
          <div key={i} className="relative aspect-square overflow-hidden rounded-theme bg-surface">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover"
            />
            {img.caption && (
              <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-2 py-1 truncate">
                {img.caption}
              </p>
            )}
          </div>
        ))}
      </div>
      {caption && (
        <figcaption className="text-center text-xs text-textMuted mt-2">{caption}</figcaption>
      )}
    </figure>
  );
}

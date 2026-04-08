// ImageWithFallback — next/image wrapper that falls back to config.content.defaultPostImage on error
// Requirements: 21.1

'use client';

import React, { useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import config from '@/site.config';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  fallbackSrc = config.content.defaultPostImage,
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}

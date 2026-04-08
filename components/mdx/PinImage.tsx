// PinImage — Pinterest-optimized vertical image (1000×1500) with save button overlay
// Requirements: 11.4, 14.1, 14.3, 14.5

import React from 'react';
import Image from 'next/image';
import config from '@/site.config';

interface PinImageProps {
  src: string;
  alt: string;
  pinDescription?: string;
  canonicalUrl?: string;
  width?: number;
  height?: number;
  caption?: string;
}

export function PinImage({
  src,
  alt,
  pinDescription,
  canonicalUrl,
  width = 1000,
  height = 1500,
  caption,
}: PinImageProps) {
  const description = pinDescription ?? alt;
  const url = canonicalUrl ?? (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <figure className="my-8 mx-auto max-w-sm">
      <div className="relative group overflow-hidden rounded-theme">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
          sizes="(max-width: 640px) 100vw, 400px"
        />
        {config.pinterest.enableSaveButtons && (
          <div className="absolute inset-0 flex items-start justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <a
              href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(src)}&description=${encodeURIComponent(description)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Save to Pinterest"
              data-pin-do="buttonPin"
              data-pin-media={src}
              data-pin-url={url}
              data-pin-description={description}
              className="flex items-center gap-1.5 bg-[#E60023] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md hover:bg-[#C0001D] transition-colors"
            >
              <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
              </svg>
              Save
            </a>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="text-center text-xs text-textMuted mt-2">{caption}</figcaption>
      )}
    </figure>
  );
}

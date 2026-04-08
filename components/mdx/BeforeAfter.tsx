// BeforeAfter — side-by-side or slider comparison of two images
// Requirements: 11.4

'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';

interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
}

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Before',
  afterAlt = 'After',
  beforeLabel = 'Before',
  afterLabel = 'After',
  caption,
}: BeforeAfterProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleMove(clientX: number) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pos = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pos);
  }

  return (
    <figure className="my-8">
      <div
        ref={containerRef}
        className="relative select-none overflow-hidden rounded-theme cursor-col-resize aspect-video"
        onMouseMove={(e) => handleMove(e.clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        role="img"
        aria-label={`Before and after comparison: ${beforeAlt} vs ${afterAlt}`}
      >
        {/* After image (full width, behind) */}
        <div className="absolute inset-0">
          <Image src={afterSrc} alt={afterAlt} fill className="object-cover" sizes="100vw" />
        </div>

        {/* Before image (clipped by slider) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <Image src={beforeSrc} alt={beforeAlt} fill className="object-cover" sizes="100vw" />
        </div>

        {/* Divider */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
            <svg aria-hidden="true" className="w-4 h-4 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
          {beforeLabel}
        </span>
        <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
          {afterLabel}
        </span>
      </div>
      {caption && (
        <figcaption className="text-center text-xs text-textMuted mt-2">{caption}</figcaption>
      )}
    </figure>
  );
}

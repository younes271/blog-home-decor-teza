// ProductCard — affiliate product recommendation card for MDX content
// Requirements: 11.4

import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  name: string;
  image?: string;
  imageAlt?: string;
  price?: string;
  rating?: number;
  reviewCount?: number;
  description?: string;
  pros?: string[];
  cons?: string[];
  affiliateUrl: string;
  buttonText?: string;
  badge?: string;
}

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          aria-hidden="true"
          className={`w-4 h-4 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-border'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function ProductCard({
  name,
  image,
  imageAlt,
  price,
  rating,
  reviewCount,
  description,
  pros,
  cons,
  affiliateUrl,
  buttonText = 'Check Price',
  badge,
}: ProductCardProps) {
  return (
    <div className="my-8 rounded-theme border border-border bg-surface overflow-hidden">
      {badge && (
        <div className="bg-primary text-textOnPrimary text-xs font-semibold text-center py-1.5 px-4">
          {badge}
        </div>
      )}
      <div className="p-5">
        <div className="flex gap-4">
          {image && (
            <div className="flex-shrink-0 w-24 h-24 relative rounded-theme overflow-hidden bg-surface border border-border">
              <Image
                src={image}
                alt={imageAlt ?? name}
                fill
                className="object-contain p-1"
                sizes="96px"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-text text-base leading-snug mb-1">{name}</h3>
            {rating !== undefined && (
              <div className="flex items-center gap-2 mb-1">
                <StarRating rating={rating} />
                {reviewCount !== undefined && (
                  <span className="text-xs text-textMuted">({reviewCount.toLocaleString()})</span>
                )}
              </div>
            )}
            {price && (
              <p className="text-lg font-bold text-primary">{price}</p>
            )}
          </div>
        </div>

        {description && (
          <p className="text-sm text-textMuted mt-3">{description}</p>
        )}

        {(pros || cons) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {pros && pros.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-green-600 mb-1">✓ Pros</p>
                <ul className="space-y-1">
                  {pros.map((p, i) => (
                    <li key={i} className="text-xs text-textMuted flex gap-1.5">
                      <span className="text-green-500 mt-0.5">+</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {cons && cons.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-red-500 mb-1">✗ Cons</p>
                <ul className="space-y-1">
                  {cons.map((c, i) => (
                    <li key={i} className="text-xs text-textMuted flex gap-1.5">
                      <span className="text-red-400 mt-0.5">−</span>{c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener nofollow sponsored"
          className="mt-4 block w-full text-center px-4 py-2.5 rounded-theme bg-primary text-textOnPrimary text-sm font-semibold hover:bg-primaryHover transition-colors"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
}

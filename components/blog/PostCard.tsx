// PostCard — card component supporting all four cardStyle values driven by config
// Requirements: 10.5

'use client';

import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import config from '@/site.config';
import { Badge } from '@/components/ui';
import { ImageWithFallback } from '@/components/ui';
import type { Post } from '@/types/post';
import type { CardStyle } from '@/types/config';

export const cardStyleClasses: Record<CardStyle, string> = {
  flat: 'bg-surface',
  shadow: 'bg-surface shadow-md hover:shadow-lg',
  border: 'bg-surface border border-border',
  glass: 'bg-surface/80 backdrop-blur-sm border border-border/50',
};

interface PostCardProps {
  post: Post;
  className?: string;
}

export function PostCard({ post, className }: PostCardProps) {
  const { frontmatter, readingTime, excerpt } = post;
  const style = config.theme.cardStyle;
  const authorName = frontmatter.author ?? config.author.name;

  const categoryLabel =
    config.content.categories.find((c) => c.slug === frontmatter.category)?.name ??
    frontmatter.category;

  return (
    <Link
      href={`/blog/${frontmatter.slug}`}
      className={clsx(
        'group block rounded-theme overflow-hidden transition-colors',
        cardStyleClasses[style],
        className,
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <ImageWithFallback
          src={frontmatter.image.src}
          alt={frontmatter.image.alt}
          width={frontmatter.image.width}
          height={frontmatter.image.height}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4">
        <Badge variant="primary" className="mb-2">
          {categoryLabel}
        </Badge>

        <h3 className="text-lg font-heading font-semibold text-text line-clamp-2 mb-1">
          {frontmatter.title}
        </h3>

        <p className="text-sm text-muted line-clamp-2 mb-3">
          {excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-muted">
          <div className="flex items-center gap-2">
            <time dateTime={frontmatter.date}>
              {new Date(frontmatter.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            {config.content.showReadingTime && (
              <>
                <span aria-hidden="true">·</span>
                <span>{readingTime} min read</span>
              </>
            )}
          </div>
          <span>{authorName}</span>
        </div>
      </div>
    </Link>
  );
}

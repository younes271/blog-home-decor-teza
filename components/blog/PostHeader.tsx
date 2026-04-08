// PostHeader — post page header with title, category badge, date, reading time, author
// Requirements: 12.4

import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui';
import config from '@/site.config';
import type { Post } from '@/types/post';

interface PostHeaderProps {
  post: Post;
}

export function PostHeader({ post }: PostHeaderProps) {
  const { frontmatter, readingTime } = post;
  const authorName = frontmatter.author ?? config.author.name;

  const categoryLabel =
    config.content.categories.find((c) => c.slug === frontmatter.category)?.name ??
    frontmatter.category;

  return (
    <header className="mb-8">
      <Link href={`/category/${frontmatter.category}`}>
        <Badge variant="primary" className="mb-3">
          {categoryLabel}
        </Badge>
      </Link>

      <h1 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">
        {frontmatter.title}
      </h1>

      <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <span>{authorName}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={frontmatter.date}>
          {new Date(frontmatter.date).toLocaleDateString('en-US', {
            month: 'long',
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
    </header>
  );
}

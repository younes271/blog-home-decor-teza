// PopularPosts — displays featured/popular posts as a compact list
// Requirements: 12.4

import React from 'react';
import Link from 'next/link';
import { ImageWithFallback } from '@/components/ui';
import { getFeaturedPosts } from '@/lib/posts';
import type { Post } from '@/types/post';

interface PopularPostsProps {
  limit?: number;
}

export function PopularPosts({ limit = 5 }: PopularPostsProps) {
  const posts: Post[] = getFeaturedPosts(limit);

  if (posts.length === 0) return null;

  return (
    <section>
      <h3 className="text-lg font-heading font-semibold text-text mb-4">
        Popular Posts
      </h3>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.frontmatter.slug}>
            <Link
              href={`/blog/${post.frontmatter.slug}`}
              className="flex items-start gap-3 group"
            >
              <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-theme">
                <ImageWithFallback
                  src={post.frontmatter.image.src}
                  alt={post.frontmatter.image.alt}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                  sizes="64px"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-text line-clamp-2 group-hover:text-primary transition-colors">
                  {post.frontmatter.title}
                </p>
                <time
                  dateTime={post.frontmatter.date}
                  className="text-xs text-muted mt-1 block"
                >
                  {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

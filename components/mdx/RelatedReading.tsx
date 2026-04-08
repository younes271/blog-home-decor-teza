// RelatedReading — inline list of related post links for MDX content
// Requirements: 11.4

import React from 'react';

interface RelatedPost {
  title: string;
  slug: string;
  description?: string;
}

interface RelatedReadingProps {
  title?: string;
  posts: RelatedPost[];
}

export function RelatedReading({ title = 'Related Reading', posts }: RelatedReadingProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <aside className="my-6 rounded-theme border border-border bg-surface p-4" aria-label={title}>
      <p className="font-heading font-semibold text-text mb-3">{title}</p>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.slug} className="flex items-start gap-2">
            <span aria-hidden="true" className="text-primary mt-0.5">→</span>
            <div>
              <a
                href={`/blog/${post.slug}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                {post.title}
              </a>
              {post.description && (
                <p className="text-xs text-textMuted mt-0.5">{post.description}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

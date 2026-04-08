// RelatedPosts — displays related posts using PostCard components
// Requirements: 12.4

import React from 'react';
import { PostCard } from '@/components/blog/PostCard';
import { getRelatedPosts } from '@/lib/posts';
import config from '@/site.config';
import type { Post } from '@/types/post';

interface RelatedPostsProps {
  post: Post;
}

export function RelatedPosts({ post }: RelatedPostsProps) {
  if (!config.layout.postPage.showRelatedPosts) return null;

  const related = getRelatedPosts(post, 3);
  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-heading font-bold text-text mb-6">
        Related Posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((relatedPost) => (
          <PostCard key={relatedPost.frontmatter.slug} post={relatedPost} />
        ))}
      </div>
    </section>
  );
}

// PostFooter — post page footer with tags, social share, author bio section
// Requirements: 12.4, 18.7

import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui';
import { SocialShareButtons } from '@/components/social';
import config from '@/site.config';
import type { Post } from '@/types/post';

interface PostFooterProps {
  post: Post;
}

export function PostFooter({ post }: PostFooterProps) {
  const { frontmatter } = post;
  const tags = frontmatter.tags ?? [];
  const showAuthorBio = config.layout.postPage.showAuthorBio;

  return (
    <footer className="mt-12 border-t border-border pt-8 space-y-8">
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag} href={`/tag/${tag}`}>
              <Badge variant="outline">#{tag}</Badge>
            </Link>
          ))}
        </div>
      )}

      {config.layout.postPage.showSocialShare && (
        <div className="flex items-center gap-3 text-sm text-muted">
          <span>Share this post</span>
          <SocialShareButtons
            url={`${config.identity.url}/blog/${frontmatter.slug}`}
            title={frontmatter.title}
            pinImage={frontmatter.pinImage?.src ?? frontmatter.image.src}
          />
        </div>
      )}

      {showAuthorBio && (
        <div className="flex items-start gap-4 bg-surface rounded-theme p-6 border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={config.author.avatar}
            alt={config.author.name}
            className="w-16 h-16 rounded-full object-cover flex-shrink-0"
          />
          <div>
            <p className="font-heading font-semibold text-text">
              {config.author.name}
            </p>
            <p className="text-sm text-muted mt-1">{config.author.bio}</p>
          </div>
        </div>
      )}
    </footer>
  );
}

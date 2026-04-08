// PostHero — full-width hero image section for individual post pages
// Requirements: 12.4, 14.1, 14.3, 14.5

import React from 'react';
import { ImageWithFallback } from '@/components/ui';
import { PinterestSaveButton, resolvePinMedia, resolvePinDescription } from '@/components/pinterest';
import config from '@/site.config';
import type { Post } from '@/types/post';

interface PostHeroProps {
  post: Post;
}

export function PostHero({ post }: PostHeroProps) {
  const { frontmatter } = post;
  const { image } = frontmatter;
  const canonicalUrl = `${config.identity.url}/blog/${frontmatter.slug}`;
  const pinMedia = resolvePinMedia(frontmatter);
  const pinDescription = resolvePinDescription(frontmatter);

  return (
    <section className="w-full overflow-hidden rounded-theme">
      <PinterestSaveButton
        mediaSrc={pinMedia}
        canonicalUrl={canonicalUrl}
        description={pinDescription}
      >
        <div className="relative aspect-[16/9]">
          <ImageWithFallback
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="object-cover w-full h-full"
            sizes="100vw"
            priority
          />
        </div>
      </PinterestSaveButton>
    </section>
  );
}

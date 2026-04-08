// PostCardGrid — responsive grid with BetweenCardsAd injection
// Requirements: 15.7

import React from 'react';
import type { Post } from '@/types/post';
import { PostCard } from '@/components/blog/PostCard';
import { BetweenCardsAd } from '@/components/ads/BetweenCardsAd';
import config from '@/site.config';

interface PostCardGridProps {
  posts: Post[];
  className?: string;
}

export function PostCardGrid({ posts, className }: PostCardGridProps) {
  const adsEnabled = config.ads.enabled;
  const betweenCards = config.ads.slots.betweenCards;
  const shouldInjectAds = adsEnabled && betweenCards > 0;

  const items: React.ReactNode[] = [];

  posts.forEach((post, index) => {
    items.push(<PostCard key={post.frontmatter.slug} post={post} />);

    if (shouldInjectAds && (index + 1) % betweenCards === 0 && index < posts.length - 1) {
      items.push(
        <div key={`ad-after-${index}`} className="col-span-full">
          <BetweenCardsAd />
        </div>,
      );
    }
  });

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className ?? ''}`}
    >
      {items}
    </div>
  );
}

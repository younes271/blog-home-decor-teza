// components/seo/PinterestMeta.tsx — Pinterest Rich Pin article meta tags
// Requirements: 13.5

import config from '@/site.config';
import type { Post } from '@/types/post';

interface PinterestMetaProps {
  post: Post;
}

export function PinterestMeta({ post }: PinterestMetaProps) {
  const { frontmatter } = post;
  const author = frontmatter.author ?? config.author.name;
  const category = config.content.categories.find((c) => c.slug === frontmatter.category);
  const section = category?.name ?? frontmatter.category;

  return (
    <>
      <meta property="og:type" content="article" />
      <meta property="article:published_time" content={frontmatter.date} />
      <meta property="article:author" content={author} />
      <meta property="article:section" content={section} />
      {frontmatter.tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      <meta name="pinterest-rich-pin" content="true" />
    </>
  );
}

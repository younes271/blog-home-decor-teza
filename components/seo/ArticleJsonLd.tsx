// components/seo/ArticleJsonLd.tsx — BlogPosting JSON-LD structured data
// Requirements: 13.6

import config from '@/site.config';
import { canonicalUrl } from '@/lib/seo';
import type { Post } from '@/types/post';

interface ArticleJsonLdProps {
  post: Post;
}

export function ArticleJsonLd({ post }: ArticleJsonLdProps) {
  const { frontmatter } = post;
  const url = canonicalUrl(`/blog/${frontmatter.slug}`);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.description,
    image: frontmatter.image.src,
    datePublished: frontmatter.date,
    dateModified: frontmatter.updatedDate ?? frontmatter.date,
    author: {
      '@type': 'Person',
      name: frontmatter.author ?? config.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: config.identity.name,
      logo: {
        '@type': 'ImageObject',
        url: `${config.identity.url}${config.author.avatar}`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

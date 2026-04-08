// app/sitemap.ts — dynamic sitemap generation
// Requirements: 12.8, 21.6

import type { MetadataRoute } from 'next';
import config from '@/site.config';
import { getAllPosts } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = config.identity.url;
  const posts = getAllPosts(); // already excludes drafts

  const homepage: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.frontmatter.slug}`,
    lastModified: new Date(post.frontmatter.updatedDate ?? post.frontmatter.date),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = config.content.categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const staticPages: MetadataRoute.Sitemap = ['/blog', '/search'].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...homepage, ...postEntries, ...categoryEntries, ...staticPages];
}

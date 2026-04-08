// app/feed.xml/route.ts — RSS 2.0 feed with latest 20 published posts; exclude drafts
// Requirements: 13.11

import config from '@/site.config';
import { getAllPosts } from '@/lib/posts';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET() {
  const baseUrl = config.identity.url.replace(/\/+$/, '');
  const posts = getAllPosts().slice(0, 20); // already excludes drafts, sorted newest first

  const items = posts
    .map((post) => {
      const { frontmatter } = post;
      const link = `${baseUrl}/blog/${frontmatter.slug}`;
      const pubDate = new Date(frontmatter.date).toUTCString();
      const category = config.content.categories.find((c) => c.slug === frontmatter.category);

      return `    <item>
      <title>${escapeXml(frontmatter.title)}</title>
      <description>${escapeXml(frontmatter.description)}</description>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>${category ? `\n      <category>${escapeXml(category.name)}</category>` : ''}${frontmatter.image?.src ? `\n      <enclosure url="${escapeXml(frontmatter.image.src.startsWith('http') ? frontmatter.image.src : `${baseUrl}${frontmatter.image.src}`)}" length="0" type="image/webp" />` : ''}
    </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(config.identity.name)}</title>
    <description>${escapeXml(config.identity.description)}</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <language>${config.identity.language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

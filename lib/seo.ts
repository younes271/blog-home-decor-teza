// lib/seo.ts — SEO metadata helpers, canonical URL builder, titleTemplate application
// Requirements: 13.1, 13.2

import type { Metadata } from 'next';
import config from '@/site.config';
import type { Post } from '@/types/post';

/** Build canonical URL for a given path */
export function canonicalUrl(path: string): string {
  const base = config.identity.url.replace(/\/+$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

/** Apply titleTemplate from config — replaces %s with the page title */
export function applyTitleTemplate(title: string): string {
  const idx = config.seo.titleTemplate.indexOf('%s');
  if (idx === -1) return config.seo.titleTemplate;
  return config.seo.titleTemplate.slice(0, idx) + title + config.seo.titleTemplate.slice(idx + 2);
}

/** Build common Open Graph metadata for any page */
export function buildOpenGraph(opts: {
  title: string;
  description: string;
  url: string;
  type?: 'website' | 'article';
  image?: { url: string; width?: number; height?: number; alt?: string };
}): Metadata['openGraph'] {
  return {
    title: opts.title,
    description: opts.description,
    url: opts.url,
    siteName: config.identity.name,
    locale: config.identity.locale,
    type: opts.type ?? 'website',
    ...(opts.image && {
      images: [
        {
          url: opts.image.url,
          width: opts.image.width ?? 1200,
          height: opts.image.height ?? 630,
          alt: opts.image.alt ?? opts.title,
        },
      ],
    }),
  };
}

/** Build Twitter Card metadata */
export function buildTwitterCard(opts: {
  title: string;
  description: string;
  image?: string;
}): Metadata['twitter'] {
  return {
    card: 'summary_large_image',
    title: opts.title,
    description: opts.description,
    ...(config.seo.twitterHandle && { creator: `@${config.seo.twitterHandle}` }),
    ...(opts.image && { images: [opts.image] }),
  };
}

/** Build full page metadata for a post page */
export function buildPostMetadata(post: Post): Metadata {
  const { frontmatter } = post;
  const url = canonicalUrl(`/blog/${frontmatter.slug}`);
  const image = frontmatter.image;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: url },
    openGraph: buildOpenGraph({
      title: frontmatter.title,
      description: frontmatter.description,
      url,
      type: 'article',
      image: { url: image.src, width: image.width, height: image.height, alt: image.alt },
    }),
    twitter: buildTwitterCard({
      title: frontmatter.title,
      description: frontmatter.description,
      image: image.src,
    }),
  };
}

/** Build full page metadata for a generic page */
export function buildPageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const url = canonicalUrl(opts.path);
  const ogImage = config.seo.defaultOgImage;

  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    ...(opts.noindex && { robots: { index: false, follow: false } }),
    openGraph: buildOpenGraph({
      title: opts.title,
      description: opts.description,
      url,
      image: ogImage ? { url: ogImage } : undefined,
    }),
    twitter: buildTwitterCard({
      title: opts.title,
      description: opts.description,
      image: ogImage || undefined,
    }),
  };
}

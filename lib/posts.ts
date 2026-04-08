// lib/posts.ts — MDX file discovery, parsing, filtering, and pagination
// Requirements: 11.1, 21.6

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post, PostFrontmatter } from '@/types/post';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

// ── File discovery ────────────────────────────────────────────────────────────

/** Returns all .mdx file paths in content/posts/ */
export function getPostFilePaths(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => path.join(POSTS_DIR, f));
}

// ── Parsing ───────────────────────────────────────────────────────────────────

/** Parse a single MDX file into a Post object */
export function parsePost(filePath: string): Post {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));
  const excerpt = frontmatter.description || content.trim().slice(0, 160);

  return { frontmatter, content, readingTime, wordCount, excerpt };
}

// ── Filtering ─────────────────────────────────────────────────────────────────

/** Returns all published (non-draft) posts, sorted newest first */
export function getAllPosts(): Post[] {
  return getPostFilePaths()
    .map(parsePost)
    .filter((p) => !p.frontmatter.draft)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.updatedDate ?? a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.updatedDate ?? b.frontmatter.date).getTime();
      return dateB - dateA;
    });
}

/** Returns a single published post by slug, or undefined */
export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.frontmatter.slug === slug);
}

/** Returns all posts for a given category slug */
export function getPostsByCategory(categorySlug: string): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.category === categorySlug);
}

/** Returns all posts for a given tag */
export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.tags?.includes(tag));
}

/** Returns all unique slugs for published posts (used by generateStaticParams) */
export function getAllPostSlugs(): string[] {
  return getAllPosts().map((p) => p.frontmatter.slug);
}

/** Returns all unique category slugs present in published posts */
export function getAllCategorySlugs(): string[] {
  const slugs = getAllPosts().map((p) => p.frontmatter.category);
  return [...new Set(slugs)];
}

/** Returns all unique tags present in published posts */
export function getAllTags(): string[] {
  const tags = getAllPosts().flatMap((p) => p.frontmatter.tags ?? []);
  return [...new Set(tags)];
}

// ── Pagination ────────────────────────────────────────────────────────────────

export interface PaginatedPosts {
  posts: Post[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/** Returns a paginated slice of posts */
export function getPaginatedPosts(
  posts: Post[],
  page: number,
  perPage: number,
): PaginatedPosts {
  const totalPosts = posts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  return {
    posts: posts.slice(start, end),
    totalPosts,
    totalPages,
    currentPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}

/** Returns featured posts (frontmatter.featured === true), up to limit */
export function getFeaturedPosts(limit = 3): Post[] {
  return getAllPosts()
    .filter((p) => p.frontmatter.featured)
    .slice(0, limit);
}

/** Returns related posts by matching category or tags, excluding the current slug */
export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const { slug, category, tags = [], relatedSlugs = [] } = post.frontmatter;

  return getAllPosts()
    .filter((p) => p.frontmatter.slug !== slug)
    .map((p) => {
      let score = 0;
      if (relatedSlugs.includes(p.frontmatter.slug)) score += 10;
      if (p.frontmatter.category === category) score += 3;
      const sharedTags = (p.frontmatter.tags ?? []).filter((t) => tags.includes(t));
      score += sharedTags.length;
      return { post: p, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post: p }) => p);
}

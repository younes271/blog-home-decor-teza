#!/usr/bin/env tsx
/**
 * CLI helper for creating new MDX files with frontmatter template.
 *
 * Usage:
 *   npx tsx scripts/new-post.ts "My New Post"
 *   pnpm new-post "My New Post"
 *
 * Requirements: 11.1
 */

import * as fs from "fs";
import * as path from "path";

/** Convert a title string to a URL-friendly slug. */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Format a Date as YYYY-MM-DD. */
export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Build the frontmatter template for a new post. */
export function buildFrontmatter(title: string, slug: string, date: string): string {
  return `---
title: "${title}"
slug: "${slug}"
description: ""
date: "${date}"
category: ""
image:
  src: ""
  alt: ""
  width: 1200
  height: 630
# Optional fields
# author: ""
# tags: []
# pinImage:
#   src: ""
#   alt: ""
#   width: 1000
#   height: 1500
# pinDescription: ""
# featured: false
# draft: true
# noindex: false
# canonicalUrl: ""
# relatedSlugs: []
# faq:
#   - question: ""
#     answer: ""
---

Write your post content here.
`;
}

/** Create a new MDX post file. Returns the created file path. */
export function createPost(
  title: string,
  contentDir: string,
  now: Date = new Date()
): string {
  const slug = slugify(title);
  if (!slug) {
    throw new Error("Title must contain at least one alphanumeric character.");
  }

  const date = formatDate(now);
  const filename = `${date}-${slug}.mdx`;
  const filePath = path.join(contentDir, filename);

  if (fs.existsSync(filePath)) {
    throw new Error(`File already exists: ${filePath}`);
  }

  // Ensure the content directory exists
  fs.mkdirSync(contentDir, { recursive: true });

  const content = buildFrontmatter(title, slug, date);
  fs.writeFileSync(filePath, content, "utf-8");

  return filePath;
}

// ── CLI entry point ─────────────────────────────────────────────
if (require.main === module) {
  const title = process.argv[2];

  if (!title) {
    console.error('Usage: npx tsx scripts/new-post.ts "My New Post"');
    process.exit(1);
  }

  const contentDir = path.resolve(__dirname, "..", "content", "posts");

  try {
    const filePath = createPost(title, contentDir);
    console.log(`Created: ${filePath}`);
  } catch (err: unknown) {
    console.error((err as Error).message);
    process.exit(1);
  }
}

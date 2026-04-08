#!/usr/bin/env tsx
// scripts/validate-posts.ts — build-time MDX frontmatter validation
// Requirements: 11.2, 17.5
// Exits with code 1 if any post fails validation.

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import config from '../site.config';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

// ── Required field checks ─────────────────────────────────────────────────────

interface ValidationError {
  file: string;
  errors: string[];
}

export function validateFrontmatter(
  data: Record<string, unknown>,
  validCategorySlugs: string[],
): string[] {
  const errors: string[] = [];

  // title
  if (!data.title || typeof data.title !== 'string' || !data.title.trim()) {
    errors.push('Missing required field: title');
  }

  // slug
  if (!data.slug || typeof data.slug !== 'string' || !data.slug.trim()) {
    errors.push('Missing required field: slug');
  }

  // description
  if (!data.description || typeof data.description !== 'string' || !data.description.trim()) {
    errors.push('Missing required field: description');
  }

  // date
  if (!data.date || typeof data.date !== 'string' || !data.date.trim()) {
    errors.push('Missing required field: date');
  } else if (isNaN(Date.parse(data.date as string))) {
    errors.push(`Invalid date format: "${data.date}" — expected ISO date (YYYY-MM-DD)`);
  }

  // category
  if (!data.category || typeof data.category !== 'string' || !data.category.trim()) {
    errors.push('Missing required field: category');
  } else if (!validCategorySlugs.includes(data.category as string)) {
    errors.push(
      `Invalid category slug: "${data.category}" — must be one of: ${validCategorySlugs.join(', ')}`,
    );
  }

  // image.src
  const image = data.image as Record<string, unknown> | undefined;
  if (!image || typeof image !== 'object') {
    errors.push('Missing required field: image');
  } else {
    if (!image.src || typeof image.src !== 'string' || !image.src.trim()) {
      errors.push('Missing required field: image.src');
    }
    if (!image.alt || typeof image.alt !== 'string' || !image.alt.trim()) {
      errors.push('Missing required field: image.alt');
    }
  }

  return errors;
}

// ── Main ──────────────────────────────────────────────────────────────────────

export function validateAllPosts(postsDir: string): ValidationError[] {
  if (!fs.existsSync(postsDir)) {
    // No posts directory — nothing to validate
    return [];
  }

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.mdx'));
  const validCategorySlugs = config.content.categories.map((c) => c.slug);
  const allErrors: ValidationError[] = [];

  for (const file of files) {
    const filePath = path.join(postsDir, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    let data: Record<string, unknown>;

    try {
      ({ data } = matter(raw));
    } catch (e) {
      allErrors.push({ file, errors: [`Failed to parse frontmatter: ${(e as Error).message}`] });
      continue;
    }

    const errors = validateFrontmatter(data, validCategorySlugs);
    if (errors.length > 0) {
      allErrors.push({ file, errors });
    }
  }

  return allErrors;
}

// Run when executed directly
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.url?.replace('file://', '') ?? '')) {
  const errors = validateAllPosts(POSTS_DIR);

  if (errors.length === 0) {
    console.log('✓ All posts passed frontmatter validation');
    process.exit(0);
  } else {
    console.error(`✗ Frontmatter validation failed — ${errors.length} file(s) have errors:\n`);
    for (const { file, errors: fileErrors } of errors) {
      console.error(`  ${file}:`);
      for (const err of fileErrors) {
        console.error(`    - ${err}`);
      }
    }
    process.exit(1);
  }
}

// scripts/generate-search-index.ts — Build-time search index generation
// Requirements: 20.1, 21.6
//
// Reads all published (non-draft) MDX posts and writes a JSON index to
// public/search-index.json containing slug, title, excerpt, category, tags, date.

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { PostFrontmatter } from '../types/post';
import type { SearchIndexEntry } from '../lib/search';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'search-index.json');

function buildSearchIndex(): SearchIndexEntry[] {
  if (!fs.existsSync(POSTS_DIR)) {
    console.log('No content/posts/ directory found — writing empty index.');
    return [];
  }

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'));
  const entries: SearchIndexEntry[] = [];

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const fm = data as PostFrontmatter;

    // Skip drafts — Requirement 21.6
    if (fm.draft) continue;

    const excerpt = fm.description || content.trim().slice(0, 160);

    entries.push({
      slug: fm.slug,
      title: fm.title,
      excerpt,
      category: fm.category,
      tags: fm.tags ?? [],
      date: fm.date,
    });
  }

  return entries;
}

// ── Main ──────────────────────────────────────────────────────────────────────

const entries = buildSearchIndex();

// Ensure public/ directory exists
const publicDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(entries, null, 2), 'utf-8');
console.log(`Search index generated: ${entries.length} posts → ${OUTPUT_PATH}`);

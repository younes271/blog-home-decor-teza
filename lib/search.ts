// lib/search.ts — Client-side Fuse.js search against the build-time index
// Requirements: 20.1, 20.2

import Fuse from 'fuse.js';

/** Shape of each entry in public/search-index.json */
export interface SearchIndexEntry {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
}

/** Fuse.js options tuned for blog post search */
const FUSE_OPTIONS: Fuse.IFuseOptions<SearchIndexEntry> = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'excerpt', weight: 0.25 },
    { name: 'category', weight: 0.2 },
    { name: 'tags', weight: 0.15 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
};

let cachedIndex: Fuse<SearchIndexEntry> | null = null;

/** Fetches the search index JSON and returns a Fuse instance (cached after first load) */
export async function loadSearchIndex(): Promise<Fuse<SearchIndexEntry>> {
  if (cachedIndex) return cachedIndex;

  const res = await fetch('/search-index.json');
  if (!res.ok) throw new Error(`Failed to load search index: ${res.status}`);

  const entries: SearchIndexEntry[] = await res.json();
  cachedIndex = new Fuse(entries, FUSE_OPTIONS);
  return cachedIndex;
}

/** Searches the index and returns matching entries */
export async function searchPosts(
  query: string,
): Promise<SearchIndexEntry[]> {
  if (!query.trim()) return [];
  const fuse = await loadSearchIndex();
  return fuse.search(query).map((result) => result.item);
}

/** Creates a Fuse instance from a provided array (useful for testing / SSR) */
export function createSearchIndex(
  entries: SearchIndexEntry[],
): Fuse<SearchIndexEntry> {
  return new Fuse(entries, FUSE_OPTIONS);
}

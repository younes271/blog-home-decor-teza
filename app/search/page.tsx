// Search page — client-side Fuse.js search with debounced input, PostCard results, keyboard navigation
// Requirements: 20.2, 20.3, 20.4, 20.5

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PostCard } from '@/components/blog/PostCard';
import { Skeleton } from '@/components/ui';
import type { SearchIndexEntry } from '@/lib/search';
import type { Post } from '@/types/post';

const DEBOUNCE_MS = 300;

/** Convert a SearchIndexEntry to a minimal Post for PostCard rendering */
function toPost(entry: SearchIndexEntry): Post {
  return {
    frontmatter: {
      title: entry.title,
      slug: entry.slug,
      description: entry.excerpt,
      date: entry.date,
      category: entry.category,
      tags: entry.tags,
      image: { src: '', alt: entry.title, width: 1200, height: 630 },
    },
    content: '',
    readingTime: 0,
    wordCount: 0,
    excerpt: entry.excerpt,
  };
}

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [results, setResults] = useState<SearchIndexEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Lazy-loaded search module ref — loaded on first search
  const searchModuleRef = useRef<typeof import('@/lib/search') | null>(null);

  const executeSearch = useCallback(async (term: string) => {
    if (!term.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    try {
      // On-demand index loading: import search module lazily on first use
      if (!searchModuleRef.current) {
        searchModuleRef.current = await import('@/lib/search');
      }
      const items = await searchModuleRef.current.searchPosts(term);
      setResults(items);
      setHasSearched(true);
    } catch {
      setResults([]);
      setHasSearched(true);
    } finally {
      setIsLoading(false);
      setActiveIndex(-1);
    }
  }, []);

  // Debounced search effect
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      executeSearch(query);
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, executeSearch]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (results.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
          break;
        case 'Enter':
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < results.length) {
            router.push(`/blog/${results[activeIndex].slug}`);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setQuery('');
          setResults([]);
          setHasSearched(false);
          inputRef.current?.focus();
          break;
      }
    },
    [results, activeIndex, router],
  );

  // Scroll active result into view
  useEffect(() => {
    if (activeIndex < 0 || !resultsRef.current) return;
    const activeEl = resultsRef.current.children[activeIndex] as HTMLElement | undefined;
    activeEl?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl font-bold text-text mb-6">Search</h1>

      {/* Search input */}
      <div className="relative mb-8" onKeyDown={handleKeyDown}>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full px-4 py-3 pl-11 bg-surface border border-border rounded-theme text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          aria-label="Search posts"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-activedescendant={activeIndex >= 0 ? `search-result-${activeIndex}` : undefined}
          role="combobox"
          aria-expanded={results.length > 0}
        />
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-4" aria-busy="true" aria-label="Loading search results">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="w-full" height="200px" />
          ))}
        </div>
      )}

      {/* Results */}
      {!isLoading && hasSearched && (
        <>
          <p className="text-sm text-muted mb-4" aria-live="polite">
            {results.length === 0
              ? 'No results found'
              : `${results.length} result${results.length === 1 ? '' : 's'} found`}
          </p>

          <div
            id="search-results"
            ref={resultsRef}
            role="listbox"
            aria-label="Search results"
            className="grid gap-6 sm:grid-cols-2"
          >
            {results.map((entry, idx) => (
              <div
                key={entry.slug}
                id={`search-result-${idx}`}
                role="option"
                aria-selected={idx === activeIndex}
                className={idx === activeIndex ? 'ring-2 ring-primary rounded-theme' : ''}
              >
                <PostCard post={toPost(entry)} />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Empty state — before any search */}
      {!isLoading && !hasSearched && (
        <p className="text-sm text-muted">
          Start typing to search across all posts. Use{' '}
          <kbd className="px-1.5 py-0.5 bg-surface border border-border rounded text-xs">↑</kbd>{' '}
          <kbd className="px-1.5 py-0.5 bg-surface border border-border rounded text-xs">↓</kbd>{' '}
          to navigate and{' '}
          <kbd className="px-1.5 py-0.5 bg-surface border border-border rounded text-xs">Enter</kbd>{' '}
          to select.
        </p>
      )}
    </main>
  );
}

// CategoryPills — horizontal scrollable list of category pills/badges
// Requirements: 12.4

import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import config from '@/site.config';

interface CategoryPillsProps {
  activeSlug?: string;
  className?: string;
}

export function CategoryPills({ activeSlug, className }: CategoryPillsProps) {
  const categories = config.content.categories;

  return (
    <nav
      aria-label="Categories"
      className={clsx('flex gap-2 overflow-x-auto pb-2 scrollbar-hide', className)}
    >
      {categories.map((cat) => {
        const isActive = cat.slug === activeSlug;
        return (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className={clsx(
              'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
              isActive
                ? 'bg-primary text-textOnPrimary shadow-md'
                : 'bg-surface border border-border text-text hover:border-primary hover:shadow-sm hover:-translate-y-0.5',
            )}
          >
            {cat.color && (
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: cat.color }}
                aria-hidden="true"
              />
            )}
            {cat.name}
          </Link>
        );
      })}
    </nav>
  );
}

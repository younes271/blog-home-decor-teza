// Pagination — page navigation component for paginated blog listings
// Requirements: 12.4

import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

function pageHref(basePath: string, page: number): string {
  return page <= 1 ? basePath : `${basePath}/page/${page}`;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-8">
      {currentPage > 1 && (
        <Link
          href={pageHref(basePath, currentPage - 1)}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-theme border border-border text-muted hover:text-text hover:bg-surface-hover transition-colors"
        >
          Previous
        </Link>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={pageHref(basePath, page)}
          aria-current={page === currentPage ? 'page' : undefined}
          className={clsx(
            'inline-flex items-center justify-center w-10 h-10 text-sm font-medium rounded-theme transition-colors',
            page === currentPage
              ? 'bg-primary text-textOnPrimary'
              : 'border border-border text-muted hover:text-text hover:bg-surface-hover',
          )}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={pageHref(basePath, currentPage + 1)}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-theme border border-border text-muted hover:text-text hover:bg-surface-hover transition-colors"
        >
          Next
        </Link>
      )}
    </nav>
  );
}

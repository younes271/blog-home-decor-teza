// SidebarTableOfContents — sticky sidebar TOC on desktop, dropdown on mobile
// Distinct from the MDX inline TableOfContents component
// Requirements: 18.6

'use client';

import React, { useState, useEffect } from 'react';
import config from '@/site.config';

export interface TocHeading {
  id: string;
  text: string;
  level: number; // 2 or 3
}

interface SidebarTableOfContentsProps {
  headings: TocHeading[];
}

export function SidebarTableOfContents({ headings }: SidebarTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!config.layout.postPage.showTableOfContents || headings.length === 0) return null;

  // Track active heading via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const tocList = (
    <ul className="space-y-1.5">
      {headings.map((h) => (
        <li key={h.id} style={{ paddingLeft: h.level === 3 ? '1rem' : '0' }}>
          <a
            href={`#${h.id}`}
            onClick={() => setMobileOpen(false)}
            className={`block text-sm py-0.5 transition-colors ${
              activeId === h.id
                ? 'text-primary font-medium'
                : 'text-muted hover:text-text'
            }`}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <div className="hidden lg:block" aria-label="Table of contents">
        <h4 className="font-heading font-semibold text-text text-sm uppercase tracking-wide mb-3">
          On this page
        </h4>
        {tocList}
      </div>

      {/* Mobile: dropdown below post header */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 text-sm font-medium text-muted hover:text-text transition-colors w-full py-2 border-b border-border"
          aria-expanded={mobileOpen}
          aria-controls="mobile-toc"
        >
          <span>Table of Contents</span>
          <svg
            className={`w-4 h-4 transition-transform ${mobileOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        {mobileOpen && (
          <div id="mobile-toc" className="pt-2 pb-4">
            {tocList}
          </div>
        )}
      </div>
    </>
  );
}

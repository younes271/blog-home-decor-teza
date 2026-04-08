// TableOfContents — renders a list of anchor links for post headings
// Requirements: 11.4

'use client';

import React, { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  /** Pre-built items (server-rendered path). If omitted, auto-discovers from DOM. */
  items?: TocItem[];
  title?: string;
}

export function TableOfContents({ items: propItems, title = 'Table of Contents' }: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>(propItems ?? []);
  const [activeId, setActiveId] = useState<string>('');

  // Auto-discover headings from DOM when no items prop provided
  useEffect(() => {
    if (propItems && propItems.length > 0) return;
    const headings = Array.from(
      document.querySelectorAll<HTMLHeadingElement>('article h2, article h3'),
    );
    setItems(
      headings.map((h) => ({
        id: h.id,
        text: h.textContent ?? '',
        level: (parseInt(h.tagName[1]) as 2 | 3),
      })),
    );
  }, [propItems]);

  // Highlight active heading on scroll
  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '0px 0px -60% 0px' },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label={title} className="my-6 rounded-theme border border-border bg-surface p-4 text-sm">
      <p className="font-heading font-semibold text-text mb-3">{title}</p>
      <ol className="space-y-1 list-none p-0 m-0">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${item.id}`}
              className={`block py-0.5 transition-colors hover:text-primary ${
                activeId === item.id ? 'text-primary font-medium' : 'text-textMuted'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

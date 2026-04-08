// MobileMenu — slide-in mobile navigation panel
// Requirements: 18.6

'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import config from '@/site.config';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      {/* Panel */}
      <nav
        className="absolute right-0 top-0 h-full w-72 bg-background border-l border-border p-6 overflow-y-auto"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between mb-6">
          <span className="font-heading font-bold text-text">{config.identity.name}</span>
          <button onClick={onClose} className="p-2 text-muted hover:text-text" aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <ul className="space-y-4">
          <li>
            <Link href="/" onClick={onClose} className="block text-text hover:text-primary transition-colors font-medium">
              Home
            </Link>
          </li>
          {config.content.categories.map((cat) => (
            <li key={cat.slug}>
              <Link href={`/category/${cat.slug}`} onClick={onClose} className="block text-muted hover:text-primary transition-colors">
                {cat.name}
              </Link>
            </li>
          ))}
          {config.advanced.enableSearchPage && (
            <li>
              <Link href="/search" onClick={onClose} className="block text-muted hover:text-primary transition-colors">
                Search
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

// SearchOverlay — full-screen search overlay with keyboard support
// Requirements: 18.6

'use client';

import React, { useEffect, useRef } from 'react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto px-4 pt-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-lg font-semibold text-text">Search</h2>
          <button
            onClick={onClose}
            className="p-2 text-muted hover:text-text transition-colors"
            aria-label="Close search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="relative">
          <input
            ref={inputRef}
            type="search"
            placeholder="Search posts..."
            className="w-full px-4 py-3 bg-surface border border-border rounded-theme text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            aria-label="Search posts"
          />
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-muted" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <p className="text-sm text-muted mt-4">
          Start typing to search across all posts. Press <kbd className="px-1.5 py-0.5 bg-surface border border-border rounded text-xs">Esc</kbd> to close.
        </p>
      </div>
    </div>
  );
}

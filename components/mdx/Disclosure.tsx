// Disclosure — collapsible content block for MDX (affiliate/sponsored disclosures)
// Requirements: 11.4

'use client';

import React, { useState } from 'react';

interface DisclosureProps {
  title?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function Disclosure({ title = 'Disclosure', children, defaultOpen = false }: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="my-4 border border-border rounded-theme overflow-hidden text-sm">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="disclosure-content"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 text-left text-textMuted bg-surface hover:bg-surfaceHover transition-colors"
      >
        <span className="font-medium">{title}</span>
        <span aria-hidden="true">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div id="disclosure-content" className="px-4 py-3 text-textMuted bg-surface border-t border-border">
          {children}
        </div>
      )}
    </div>
  );
}

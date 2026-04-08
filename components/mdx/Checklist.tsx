// Checklist / CheckItem — interactive checklist for MDX content
// Requirements: 11.4

'use client';

import React, { useState } from 'react';

interface ChecklistProps {
  title?: string;
  children: React.ReactNode;
}

interface CheckItemProps {
  children: React.ReactNode;
  defaultChecked?: boolean;
}

export function Checklist({ title, children }: ChecklistProps) {
  return (
    <div className="my-6 rounded-theme border border-border bg-surface p-4">
      {title && (
        <p className="font-heading font-semibold text-text mb-3">{title}</p>
      )}
      <ul className="space-y-2 list-none p-0 m-0" role="list">
        {children}
      </ul>
    </div>
  );
}

export function CheckItem({ children, defaultChecked = false }: CheckItemProps) {
  const [checked, setChecked] = useState(defaultChecked);
  const id = React.useId();

  return (
    <li className="flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
      />
      <label
        htmlFor={id}
        className={`text-sm cursor-pointer select-none transition-colors ${
          checked ? 'line-through text-textMuted' : 'text-text'
        }`}
      >
        {children}
      </label>
    </li>
  );
}

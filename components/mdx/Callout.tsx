// Callout — highlighted info/warning/tip block for MDX content
// Requirements: 11.4

import React from 'react';

type CalloutType = 'info' | 'warning' | 'tip' | 'danger';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const styles: Record<CalloutType, { container: string; icon: string }> = {
  info: {
    container: 'border-l-4 border-blue-400 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-500',
    icon: 'ℹ️',
  },
  tip: {
    container: 'border-l-4 border-accent bg-green-50 dark:bg-green-950/30 dark:border-accent',
    icon: '💡',
  },
  warning: {
    container: 'border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-950/30 dark:border-yellow-500',
    icon: '⚠️',
  },
  danger: {
    container: 'border-l-4 border-red-400 bg-red-50 dark:bg-red-950/30 dark:border-red-500',
    icon: '🚨',
  },
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const { container, icon } = styles[type];
  return (
    <aside className={`my-6 rounded-theme p-4 ${container}`} role="note">
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="text-lg leading-none mt-0.5">{icon}</span>
        <div className="flex-1 min-w-0">
          {title && (
            <p className="font-heading font-semibold text-text mb-1">{title}</p>
          )}
          <div className="text-sm text-text prose-sm">{children}</div>
        </div>
      </div>
    </aside>
  );
}

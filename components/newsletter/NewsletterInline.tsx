// NewsletterInline — compact inline newsletter signup form
// Requirements: 19.1, 19.2, 19.3, 19.5

'use client';

import React from 'react';
import config from '@/site.config';
import { useNewsletterForm } from './useNewsletterForm';

export interface NewsletterInlineProps {
  title?: string;
  description?: string;
  className?: string;
}

/**
 * Inline newsletter form for sidebar widgets and in-content placement.
 * Provider-agnostic — submits to config.newsletter.formAction.
 * Returns null when newsletter is disabled.
 */
export function NewsletterInline({ title, description, className = '' }: NewsletterInlineProps) {
  const { status, errorMessage, handleSubmit } = useNewsletterForm();

  if (!config.newsletter.enabled) return null;

  const displayTitle = title ?? config.newsletter.title;
  const displayDescription = description ?? config.newsletter.description;

  return (
    <div className={`rounded-theme bg-surface border border-border p-4 ${className}`}>
      <p className="font-heading text-lg font-bold text-text mb-1">{displayTitle}</p>
      <p className="text-textMuted text-sm mb-3">{displayDescription}</p>

      {status === 'success' ? (
        <p className="text-sm font-medium text-accent" role="status">
          ✓ You&apos;re subscribed! Check your inbox.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label htmlFor="newsletter-inline-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-inline-email"
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            disabled={status === 'submitting'}
            className="w-full px-3 py-2 rounded-theme border border-border bg-background text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full px-4 py-2 rounded-theme bg-primary text-textOnPrimary text-sm font-semibold hover:bg-primaryHover transition-colors disabled:opacity-50"
          >
            {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
          </button>
          {status === 'error' && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {errorMessage}
            </p>
          )}
        </form>
      )}
    </div>
  );
}

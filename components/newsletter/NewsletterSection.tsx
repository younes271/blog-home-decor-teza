// NewsletterSection — full-width newsletter CTA section for homepage
// Requirements: 19.1, 19.2, 19.3, 19.6

'use client';

import React from 'react';
import config from '@/site.config';
import { useNewsletterForm } from './useNewsletterForm';

export interface NewsletterSectionProps {
  className?: string;
}

/**
 * Full-width newsletter CTA section for the homepage.
 * Displays title, description, incentive, and an email form.
 * Provider-agnostic — submits to config.newsletter.formAction.
 * Returns null when newsletter is disabled or homepage newsletter is off.
 */
export function NewsletterSection({ className = '' }: NewsletterSectionProps) {
  const { status, errorMessage, handleSubmit } = useNewsletterForm();

  if (!config.newsletter.enabled || !config.layout.homepage.showNewsletter) return null;

  return (
    <section
      className={`w-full bg-primary/10 border-y border-primary/20 py-12 px-4 ${className}`}
      aria-label="Newsletter signup"
    >
      <div className="max-w-xl mx-auto text-center">
        <p className="font-heading text-2xl font-bold text-text mb-2">
          {config.newsletter.title}
        </p>
        <p className="text-textMuted mb-3">
          {config.newsletter.description}
        </p>
        {config.newsletter.incentive && (
          <p className="text-sm font-medium text-primary mb-6">
            🎁 {config.newsletter.incentive}
          </p>
        )}

        {status === 'success' ? (
          <p className="text-lg font-medium text-accent" role="status">
            ✓ You&apos;re subscribed! Check your inbox.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <label htmlFor="newsletter-section-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-section-email"
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              disabled={status === 'submitting'}
              className="flex-1 px-4 py-3 rounded-theme border border-border bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="px-6 py-3 rounded-theme bg-primary text-textOnPrimary text-sm font-semibold hover:bg-primaryHover transition-colors disabled:opacity-50"
            >
              {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-2" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    </section>
  );
}

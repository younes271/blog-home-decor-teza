// NewsletterCTA — inline newsletter signup block for MDX content
// Requirements: 11.4

import React from 'react';
import config from '@/site.config';

interface NewsletterCTAProps {
  title?: string;
  description?: string;
  incentive?: string;
}

export function NewsletterCTA({
  title,
  description,
  incentive,
}: NewsletterCTAProps) {
  if (!config.newsletter.enabled) return null;

  const displayTitle = title ?? config.newsletter.title;
  const displayDescription = description ?? config.newsletter.description;
  const displayIncentive = incentive ?? config.newsletter.incentive;

  return (
    <aside className="my-8 rounded-theme bg-primary/10 border border-primary/20 p-6 text-center">
      <p className="font-heading text-xl font-bold text-text mb-2">{displayTitle}</p>
      <p className="text-textMuted text-sm mb-4">{displayDescription}</p>
      {displayIncentive && (
        <p className="text-sm font-medium text-primary mb-4">🎁 {displayIncentive}</p>
      )}
      <form
        action={config.newsletter.formAction}
        method="POST"
        className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto"
      >
        <label htmlFor="newsletter-cta-email" className="sr-only">Email address</label>
        <input
          id="newsletter-cta-email"
          type="email"
          name="email"
          required
          placeholder="your@email.com"
          className="flex-1 px-3 py-2 rounded-theme border border-border bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-theme bg-primary text-textOnPrimary text-sm font-semibold hover:bg-primaryHover transition-colors"
        >
          Subscribe
        </button>
      </form>
    </aside>
  );
}

// SocialFollowBar — displays follow links for all configured social platforms from config
// Requirements: 18.7

import React from 'react';
import config from '@/site.config';

const platformLabels: Record<string, string> = {
  pinterest: 'Pinterest',
  instagram: 'Instagram',
  facebook: 'Facebook',
  twitter: 'Twitter',
  youtube: 'YouTube',
  tiktok: 'TikTok',
};

interface SocialFollowBarProps {
  className?: string;
}

export function SocialFollowBar({ className }: SocialFollowBarProps) {
  const entries = Object.entries(config.social).filter(
    (entry): entry is [string, string] => typeof entry[1] === 'string' && entry[1].length > 0,
  );

  if (entries.length === 0) return null;

  return (
    <nav aria-label="Follow us on social media" className={className}>
      <ul className="flex flex-wrap items-center gap-3">
        {entries.map(([platform, url]) => (
          <li key={platform}>
            <a
              href={url}
              target="_blank"
              rel="noopener nofollow"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm text-muted hover:text-primary hover:border-primary transition-colors"
              aria-label={`Follow on ${platformLabels[platform] ?? platform}`}
            >
              <span aria-hidden="true" className="font-semibold capitalize">
                {platformLabels[platform] ?? platform}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

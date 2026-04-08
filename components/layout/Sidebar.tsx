// Sidebar — renders widgets based on config.layout.sidebar.widgets
// Requirements: 18.2, 18.3

import React from 'react';
import config from '@/site.config';
import Link from 'next/link';

function AboutWidget() {
  return (
    <div className="bg-surface rounded-theme border border-border p-5 text-center">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
        <span className="text-2xl font-heading font-bold text-primary">
          {config.identity.name.charAt(0)}
        </span>
      </div>
      <h3 className="font-heading font-semibold text-text mb-1">{config.identity.name}</h3>
      <p className="text-sm text-muted leading-relaxed">{config.identity.description}</p>
    </div>
  );
}

function PopularPostsWidget() {
  return (
    <div className="bg-surface rounded-theme border border-border p-5">
      <h3 className="font-heading font-semibold text-text mb-3 flex items-center gap-2">
        <span className="text-primary">🔥</span> Popular Posts
      </h3>
      <div className="space-y-3">
        <p className="text-sm text-muted italic">Posts will appear here once published.</p>
      </div>
    </div>
  );
}

function CategoriesWidget() {
  return (
    <div className="bg-surface rounded-theme border border-border p-5">
      <h3 className="font-heading font-semibold text-text mb-3">Categories</h3>
      <ul className="space-y-1">
        {config.content.categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/category/${cat.slug}`}
              className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors py-1.5 px-2 rounded-md hover:bg-primary/5"
            >
              {cat.color && (
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cat.color }}
                  aria-hidden="true"
                />
              )}
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NewsletterWidget() {
  if (!config.newsletter.enabled) return null;
  return (
    <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-theme border border-primary/20 p-5">
      <h3 className="font-heading font-semibold text-text mb-2 flex items-center gap-2">
        <span>✉️</span> {config.newsletter.title}
      </h3>
      <p className="text-sm text-muted mb-3">{config.newsletter.description}</p>
      {config.newsletter.incentive && (
        <p className="text-xs text-primary font-medium mb-3">🎁 {config.newsletter.incentive}</p>
      )}
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Your email"
          className="flex-1 px-3 py-2 text-sm rounded-theme border border-border bg-background text-text placeholder:text-muted focus:outline-none focus:border-primary"
          aria-label="Email address"
        />
        <button className="px-4 py-2 text-sm font-medium rounded-theme bg-primary text-textOnPrimary hover:bg-primary-hover transition-colors">
          Join
        </button>
      </div>
    </div>
  );
}

function SocialFollowWidget() {
  const links = Object.entries(config.social).filter(([, url]) => url);
  if (links.length === 0) return null;
  return (
    <div className="bg-surface rounded-theme border border-border p-5">
      <h3 className="font-heading font-semibold text-text mb-3">Follow Along</h3>
      <div className="flex flex-wrap gap-2">
        {links.map(([platform, url]) => (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener nofollow"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full bg-primary/5 text-text hover:bg-primary/15 hover:text-primary transition-colors capitalize"
            aria-label={`Follow on ${platform}`}
          >
            {platform}
          </a>
        ))}
      </div>
    </div>
  );
}

function TagsWidget() {
  return (
    <div className="bg-surface rounded-theme border border-border p-5">
      <h3 className="font-heading font-semibold text-text mb-3">Tags</h3>
      <p className="text-sm text-muted italic">Tags will appear here once posts are published.</p>
    </div>
  );
}

const widgetMap: Record<string, React.FC> = {
  about: AboutWidget,
  'popular-posts': PopularPostsWidget,
  categories: CategoriesWidget,
  newsletter: NewsletterWidget,
  'social-follow': SocialFollowWidget,
  tags: TagsWidget,
};

export function Sidebar() {
  if (!config.layout.sidebar.enabled) return null;

  return (
    <aside className="space-y-5" aria-label="Sidebar">
      {config.layout.sidebar.widgets.map((widgetKey) => {
        const Widget = widgetMap[widgetKey];
        return Widget ? <Widget key={widgetKey} /> : null;
      })}
    </aside>
  );
}

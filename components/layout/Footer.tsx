// Footer — three variants driven by config.layout.footer.variant
// "columns" (multi-column with categories, about, social, newsletter)
// "simple" (single row with nav + social + copyright)
// "minimal" (copyright + privacy/terms only)
// Requirements: 18.5

import React from 'react';
import Link from 'next/link';
import config from '@/site.config';

const currentYear = new Date().getFullYear();

function SocialLinks({ className }: { className?: string }) {
  const links = Object.entries(config.social).filter(([, url]) => url);
  if (links.length === 0) return null;
  return (
    <div className={className}>
      <ul className="flex items-center gap-4">
        {links.map(([platform, url]) => (
          <li key={platform}>
            <a
              href={url}
              target="_blank"
              rel="noopener nofollow"
              className="text-muted hover:text-primary transition-colors capitalize text-sm"
              aria-label={`Follow on ${platform}`}
            >
              {platform}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LegalLinks({ className }: { className?: string }) {
  return (
    <nav aria-label="Legal" className={className}>
      <ul className="flex items-center gap-4 text-sm text-muted">
        <li><Link href="/privacy" className="hover:text-text transition-colors">Privacy</Link></li>
        <li><Link href="/terms" className="hover:text-text transition-colors">Terms</Link></li>
        <li><Link href="/disclaimer" className="hover:text-text transition-colors">Disclaimer</Link></li>
      </ul>
    </nav>
  );
}

function Copyright() {
  return (
    <p className="text-sm text-muted">
      &copy; {currentYear} {config.identity.name}. All rights reserved.
    </p>
  );
}

function ColumnsFooter() {
  const categories = config.content.categories.slice(0, 6);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
      {/* About */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-textOnPrimary font-heading font-bold text-xs">
            {config.identity.name.charAt(0)}
          </span>
          <h3 className="font-heading font-semibold text-text">{config.identity.name}</h3>
        </div>
        <p className="text-sm text-muted leading-relaxed">{config.identity.description}</p>
      </div>
      {/* Categories */}
      <div>
        <h3 className="font-heading font-semibold text-text mb-3">Categories</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link href={`/category/${cat.slug}`} className="text-sm text-muted hover:text-primary transition-colors">
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Quick Links */}
      <div>
        <h3 className="font-heading font-semibold text-text mb-3">Quick Links</h3>
        <ul className="space-y-2">
          <li><Link href="/about" className="text-sm text-muted hover:text-primary transition-colors">About</Link></li>
          <li><Link href="/contact" className="text-sm text-muted hover:text-primary transition-colors">Contact</Link></li>
          <li><Link href="/blog" className="text-sm text-muted hover:text-primary transition-colors">All Posts</Link></li>
          <li><Link href="/search" className="text-sm text-muted hover:text-primary transition-colors">Search</Link></li>
        </ul>
      </div>
      {/* Social */}
      <div>
        <h3 className="font-heading font-semibold text-text mb-3">Follow Us</h3>
        <SocialLinks />
        {config.layout.footer.showNewsletter && config.newsletter.enabled && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted">{config.newsletter.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SimpleFooter() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8">
      <nav aria-label="Footer navigation">
        <ul className="flex items-center gap-4 text-sm">
          {config.content.categories.slice(0, 4).map((cat) => (
            <li key={cat.slug}>
              <Link href={`/category/${cat.slug}`} className="text-muted hover:text-primary transition-colors">
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <SocialLinks />
    </div>
  );
}

function MinimalFooter() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
      <Copyright />
      <LegalLinks />
    </div>
  );
}

export function Footer() {
  const { variant } = config.layout.footer;

  return (
    <footer className="bg-surface border-t border-border" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {variant === 'columns' && (
          <>
            <ColumnsFooter />
            <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Copyright />
              <LegalLinks />
            </div>
          </>
        )}
        {variant === 'simple' && (
          <>
            <SimpleFooter />
            <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Copyright />
              <LegalLinks />
            </div>
          </>
        )}
        {variant === 'minimal' && <MinimalFooter />}
      </div>
    </footer>
  );
}

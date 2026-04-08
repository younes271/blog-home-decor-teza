// Header — three variants driven by config.layout.header.variant
// Supports: "centered" (logo centered, nav below), "left-aligned" (logo left, nav right), "split" (logo left, nav center, CTA right)
// Requirements: 18.4

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import config from '@/site.config';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = config.content.categories.slice(0, 5).map((cat) => ({
  label: cat.name,
  href: `/category/${cat.slug}`,
}));

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function NavLinks({ className }: { className?: string }) {
  return (
    <nav aria-label="Main navigation" className={className}>
      <ul className="flex items-center gap-6">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm font-medium text-muted hover:text-text transition-colors">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ActionButtons({
  onSearchToggle,
  onMobileMenuToggle,
}: {
  onSearchToggle: () => void;
  onMobileMenuToggle: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {config.layout.header.showSearch && (
        <button
          onClick={onSearchToggle}
          className="p-2 rounded-theme text-muted hover:text-text hover:bg-surface-hover transition-colors"
          aria-label="Toggle search"
        >
          <SearchIcon />
        </button>
      )}
      {config.layout.header.showDarkModeToggle && config.theme.darkMode.enabled && (
        <button
          onClick={() => document.documentElement.classList.toggle('dark')}
          className="p-2 rounded-theme text-muted hover:text-text hover:bg-surface-hover transition-colors"
          aria-label="Toggle dark mode"
        >
          <MoonIcon />
        </button>
      )}
      <button
        onClick={onMobileMenuToggle}
        className="p-2 rounded-theme text-muted hover:text-text hover:bg-surface-hover transition-colors md:hidden"
        aria-label="Toggle mobile menu"
      >
        <MenuIcon />
      </button>
    </div>
  );
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-textOnPrimary font-heading font-bold text-sm">
        {config.identity.name.charAt(0)}
      </span>
      <span className="font-heading text-xl font-bold text-text group-hover:text-primary transition-colors">
        {config.identity.name}
      </span>
    </Link>
  );
}

function CenteredHeader({ onSearchToggle, onMobileMenuToggle }: { onSearchToggle: () => void; onMobileMenuToggle: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between md:justify-center py-4">
        <Logo />
        <div className="md:hidden">
          <ActionButtons onSearchToggle={onSearchToggle} onMobileMenuToggle={onMobileMenuToggle} />
        </div>
      </div>
      <div className="hidden md:flex items-center justify-center gap-6 pb-3 border-t border-border pt-3">
        <NavLinks />
        <ActionButtons onSearchToggle={onSearchToggle} onMobileMenuToggle={onMobileMenuToggle} />
      </div>
    </>
  );
}

function LeftAlignedHeader({ onSearchToggle, onMobileMenuToggle }: { onSearchToggle: () => void; onMobileMenuToggle: () => void }) {
  return (
    <div className="flex items-center justify-between py-4">
      <Logo />
      <div className="hidden md:flex items-center gap-6">
        <NavLinks />
        <ActionButtons onSearchToggle={onSearchToggle} onMobileMenuToggle={onMobileMenuToggle} />
      </div>
      <div className="md:hidden">
        <ActionButtons onSearchToggle={onSearchToggle} onMobileMenuToggle={onMobileMenuToggle} />
      </div>
    </div>
  );
}

function SplitHeader({ onSearchToggle, onMobileMenuToggle }: { onSearchToggle: () => void; onMobileMenuToggle: () => void }) {
  return (
    <div className="flex items-center justify-between py-4">
      <Logo />
      <div className="hidden md:block">
        <NavLinks />
      </div>
      <ActionButtons onSearchToggle={onSearchToggle} onMobileMenuToggle={onMobileMenuToggle} />
    </div>
  );
}

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { variant, sticky } = config.layout.header;

  const headerProps = {
    onSearchToggle: () => setSearchOpen(!searchOpen),
    onMobileMenuToggle: () => setMobileMenuOpen(!mobileMenuOpen),
  };

  return (
    <header
      className={`bg-background/95 backdrop-blur-sm border-b border-border z-40 ${sticky ? 'sticky top-0' : ''}`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {variant === 'centered' && <CenteredHeader {...headerProps} />}
        {variant === 'left-aligned' && <LeftAlignedHeader {...headerProps} />}
        {variant === 'split' && <SplitHeader {...headerProps} />}
      </div>
    </header>
  );
}

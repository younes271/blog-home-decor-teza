// SocialShareButtons — share buttons for Pinterest, Facebook, Twitter/X, and email
// Requirements: 18.7

'use client';

import React from 'react';

interface SocialShareButtonsProps {
  url: string;
  title: string;
  pinImage?: string;
  className?: string;
}

function encodedUrl(base: string, params: Record<string, string>): string {
  const query = Object.entries(params)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&');
  return `${base}?${query}`;
}

const iconSize = 'w-9 h-9';
const btnBase =
  'inline-flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2';

export function SocialShareButtons({ url, title, pinImage, className }: SocialShareButtonsProps) {
  const pinterestHref = encodedUrl('https://pinterest.com/pin/create/button/', {
    url,
    description: title,
    ...(pinImage ? { media: pinImage } : {}),
  });

  const facebookHref = encodedUrl('https://www.facebook.com/sharer/sharer.php', { u: url });

  const twitterHref = encodedUrl('https://twitter.com/intent/tweet', { url, text: title });

  const emailHref = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;

  const links: Array<{ label: string; href: string; color: string; icon: string }> = [
    { label: 'Share on Pinterest', href: pinterestHref, color: 'bg-[#E60023] hover:bg-[#c7001f] text-white', icon: 'P' },
    { label: 'Share on Facebook', href: facebookHref, color: 'bg-[#1877F2] hover:bg-[#1466d8] text-white', icon: 'f' },
    { label: 'Share on Twitter', href: twitterHref, color: 'bg-[#000000] hover:bg-[#333333] text-white', icon: '𝕏' },
    { label: 'Share via Email', href: emailHref, color: 'bg-muted hover:bg-text text-white', icon: '✉' },
  ];

  return (
    <div className={`flex items-center gap-2 ${className ?? ''}`} role="group" aria-label="Share this post">
      {links.map(({ label, href, color, icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel={href.startsWith('mailto:') ? undefined : 'noopener nofollow'}
          className={`${btnBase} ${iconSize} ${color}`}
          aria-label={label}
        >
          <span className="text-sm font-bold" aria-hidden="true">{icon}</span>
        </a>
      ))}
    </div>
  );
}

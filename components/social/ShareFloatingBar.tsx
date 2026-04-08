// ShareFloatingBar — mobile-only floating bar at bottom of screen with share buttons
// Visible on scroll, hidden at top of page
// Requirements: 18.7

'use client';

import React, { useState, useEffect } from 'react';
import { SocialShareButtons } from './SocialShareButtons';

interface ShareFloatingBarProps {
  url: string;
  title: string;
  pinImage?: string;
}

export function ShareFloatingBar({ url, title, pinImage }: ShareFloatingBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const threshold = 300;

    function onScroll() {
      setVisible(window.scrollY > threshold);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-50 md:hidden bg-surface/95 backdrop-blur-sm border-t border-border px-4 py-2 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      role="region"
      aria-label="Share this post"
    >
      <SocialShareButtons url={url} title={title} pinImage={pinImage} className="justify-center" />
    </div>
  );
}

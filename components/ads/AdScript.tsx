// AdScript — loads ad network scripts conditionally
// Requirements: 15.2, 15.6
// Loads AdSense script with strategy="afterInteractive" so it doesn't block page rendering.

'use client';

import React from 'react';
import Script from 'next/script';
import config from '@/site.config';

/**
 * AdScript loads the ad provider's script tag.
 * - Returns null when ads are disabled (Property 41).
 * - Uses strategy="afterInteractive" for AdSense (Requirement 15.2).
 * - Place this component once in the root layout.
 */
export function AdScript() {
  if (!config.ads.enabled) return null;

  if (config.ads.provider === 'adsense' && config.ads.adsenseClientId) {
    return (
      <Script
        id="adsense-script"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.ads.adsenseClientId}`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
    );
  }

  // Mediavine or other providers — placeholder for future integration
  if (config.ads.provider === 'mediavine' && config.ads.mediavineId) {
    return (
      <Script
        id="mediavine-script"
        src={`https://scripts.mediavine.com/tags/${config.ads.mediavineId}.js`}
        strategy="afterInteractive"
      />
    );
  }

  return null;
}

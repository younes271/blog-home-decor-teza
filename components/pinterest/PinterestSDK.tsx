// PinterestSDK — loads Pinterest Widget Builder SDK asynchronously
// Requirements: 14.2, 14.6

'use client';

import Script from 'next/script';
import config from '@/site.config';

/**
 * Loads the Pinterest Widget Builder SDK with strategy="lazyOnload"
 * so it does not block page rendering.
 * Only renders when pinterest.enableSaveButtons is true.
 */
export function PinterestSDK() {
  if (!config.pinterest.enableSaveButtons) return null;

  return (
    <Script
      src="https://assets.pinterest.com/js/pinit.js"
      strategy="lazyOnload"
      data-pin-hover="true"
    />
  );
}

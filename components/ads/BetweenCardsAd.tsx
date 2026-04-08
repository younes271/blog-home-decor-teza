// BetweenCardsAd — ad slot injected between post cards in grids
// Requirements: 15.7, 15.8

import React from 'react';
import config from '@/site.config';

interface BetweenCardsAdProps {
  slotId?: string;
}

export function BetweenCardsAd({ slotId }: BetweenCardsAdProps) {
  if (!config.ads.enabled) return null;

  return (
    <div
      className="my-4 flex items-center justify-center min-h-[250px] bg-surface border border-border rounded-theme text-xs text-textMuted"
      aria-label="Advertisement"
      data-ad-slot={slotId}
    >
      {config.ads.provider === 'adsense' ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight: '250px' }}
          data-ad-client={config.ads.adsenseClientId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div style={{ minHeight: '250px' }} />
      )}
    </div>
  );
}

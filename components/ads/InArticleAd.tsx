// InArticleAd — in-article ad slot, renders nothing when ads are disabled
// Requirements: 15.2, 15.3

import React from 'react';
import config from '@/site.config';

interface InArticleAdProps {
  slotId?: string;
}

export function InArticleAd({ slotId }: InArticleAdProps) {
  if (!config.ads.enabled) return null;

  return (
    <div
      className="my-6 flex items-center justify-center min-h-[90px] bg-surface border border-border rounded-theme text-xs text-textMuted"
      aria-label="Advertisement"
      data-ad-slot={slotId}
    >
      {config.ads.provider === 'adsense' ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight: '90px' }}
          data-ad-client={config.ads.adsenseClientId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        // Mediavine or other provider placeholder
        <div style={{ minHeight: '90px' }} />
      )}
    </div>
  );
}

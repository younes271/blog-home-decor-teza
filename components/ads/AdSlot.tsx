// AdSlot — generic ad container, renders nothing when ads disabled
// Requirements: 15.1, 15.8

import React from 'react';
import config from '@/site.config';

export interface AdSlotProps {
  /** Unique slot identifier for the ad network */
  slotId?: string;
  /** Minimum height in pixels to reserve space and prevent CLS */
  minHeight?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Generic ad container component.
 * - Returns null when `config.ads.enabled` is false (Property 41).
 * - Reserves min-height placeholder to prevent CLS when enabled (Property 42).
 */
export function AdSlot({ slotId, minHeight = 250, className = '' }: AdSlotProps) {
  if (!config.ads.enabled) return null;

  const style = { minHeight: `${minHeight}px` };

  return (
    <div
      className={`flex items-center justify-center bg-surface border border-border rounded-theme text-xs text-textMuted ${className}`}
      style={style}
      aria-label="Advertisement"
      data-ad-slot={slotId}
    >
      {config.ads.provider === 'adsense' && config.ads.adsenseClientId ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight: `${minHeight}px` }}
          data-ad-client={config.ads.adsenseClientId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div style={style} />
      )}
    </div>
  );
}

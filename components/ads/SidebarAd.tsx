// SidebarAd — sticky sidebar ad slot
// Requirements: 15.4, 15.5

import React from 'react';
import { AdSlot } from './AdSlot';
import config from '@/site.config';

interface SidebarAdProps {
  slotId?: string;
}

export function SidebarAd({ slotId }: SidebarAdProps) {
  if (!config.ads.enabled || !config.ads.slots.sidebarAd) return null;

  return (
    <div className="sticky top-24">
      <AdSlot slotId={slotId} minHeight={250} className="my-4" />
    </div>
  );
}

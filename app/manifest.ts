// app/manifest.ts — PWA manifest when config.advanced.enablePWA is true
// Requirements: 10.1

import type { MetadataRoute } from 'next';
import config from '@/site.config';

export default function manifest(): MetadataRoute.Manifest {
  if (!config.advanced.enablePWA) {
    // Return a minimal manifest when PWA is disabled
    return {
      name: config.identity.name,
      short_name: config.identity.name,
      start_url: '/',
      display: 'browser',
    };
  }

  return {
    name: config.identity.name,
    short_name: config.identity.name,
    description: config.identity.description,
    start_url: '/',
    display: 'standalone',
    background_color: config.theme.colors.background,
    theme_color: config.theme.colors.primary,
    icons: [
      {
        src: '/favicon.ico',
        sizes: '64x64',
        type: 'image/x-icon',
      },
      {
        src: '/images/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}

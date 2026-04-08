// app/robots.ts — dynamic robots.txt
// Requirements: 12.9

import type { MetadataRoute } from 'next';
import config from '@/site.config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${config.identity.url}/sitemap.xml`,
  };
}

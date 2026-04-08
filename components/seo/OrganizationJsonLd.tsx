// components/seo/OrganizationJsonLd.tsx — WebSite + SearchAction JSON-LD for homepage
// Requirements: 13.7

import config from '@/site.config';

export function OrganizationJsonLd() {
  const baseUrl = config.identity.url.replace(/\/+$/, '');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.identity.name,
    url: baseUrl,
    description: config.identity.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

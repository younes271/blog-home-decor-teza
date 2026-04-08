// components/seo/HowToJsonLd.tsx — HowTo JSON-LD structured data
// Injected on post pages that use the <StepByStep> MDX component
// Requirements: 13.10

import config from '@/site.config';

interface HowToStep {
  name: string;
  text: string;
}

interface HowToJsonLdProps {
  title: string;
  description: string;
  steps: HowToStep[];
  image?: string;
}

export function HowToJsonLd({ title, description, steps, image }: HowToJsonLdProps) {
  const baseUrl = config.identity.url.replace(/\/+$/, '');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description,
    ...(image ? { image: image.startsWith('http') ? image : `${baseUrl}${image}` } : {}),
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

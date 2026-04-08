// components/seo/FAQJsonLd.tsx — FAQPage JSON-LD structured data (conditional on frontmatter.faq)
// Requirements: 13.9

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQJsonLdProps {
  faq: FAQItem[];
}

export function FAQJsonLd({ faq }: FAQJsonLdProps) {
  if (!faq || faq.length === 0) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// app/about/page.tsx — about page reading from config
// Requirements: 15.9

import type { Metadata } from 'next';
import config from '@/site.config';
import { buildPageMetadata } from '@/lib/seo';
import { Header, Footer, PageContainer } from '@/components/layout';

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: 'About',
    description: `Learn more about ${config.identity.name}`,
    path: '/about',
  });
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <PageContainer>
        <div className="max-w-2xl mx-auto py-12">
          <h1 className="text-3xl font-heading font-bold text-text mb-6">About {config.identity.name}</h1>
          <p className="text-muted leading-relaxed mb-6">{config.identity.description}</p>
          <p className="text-muted leading-relaxed">
            {config.identity.tagline}
          </p>

          <div className="mt-8">
            <h2 className="text-xl font-heading font-semibold text-text mb-3">About the Author</h2>
            <p className="text-muted leading-relaxed">{config.author.bio}</p>
          </div>
        </div>
      </PageContainer>
      <Footer />
    </>
  );
}

// app/contact/page.tsx — contact page
// Requirements: 15.9

import type { Metadata } from 'next';
import config from '@/site.config';
import { buildPageMetadata } from '@/lib/seo';
import { Header, Footer, PageContainer } from '@/components/layout';

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: 'Contact',
    description: `Get in touch with ${config.identity.name}`,
    path: '/contact',
  });
}

export default function ContactPage() {
  const socialLinks = Object.entries(config.social).filter(([, value]) => value);

  return (
    <>
      <Header />
      <PageContainer>
        <div className="max-w-2xl mx-auto py-12">
          <h1 className="text-3xl font-heading font-bold text-text mb-6">Contact</h1>
          <p className="text-muted leading-relaxed mb-8">
            Have a question or want to get in touch? Reach out through any of the channels below.
          </p>

          {socialLinks.length > 0 && (
            <div>
              <h2 className="text-xl font-heading font-semibold text-text mb-4">Find Us</h2>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url as string}
                    target="_blank"
                    rel="noopener nofollow"
                    className="px-4 py-2 bg-surface border border-border rounded-theme text-sm text-text hover:border-primary transition-colors capitalize"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </PageContainer>
      <Footer />
    </>
  );
}

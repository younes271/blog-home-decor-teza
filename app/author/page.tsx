// app/author/page.tsx — author bio page with avatar, bio, social links from config
// Requirements: 10.1

import type { Metadata } from 'next';
import config from '@/site.config';
import { buildPageMetadata } from '@/lib/seo';
import { Header, Footer, PageContainer } from '@/components/layout';
import { ImageWithFallback } from '@/components/ui';

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: `About ${config.author.name}`,
    description: config.author.bio,
    path: '/author',
  });
}

export default function AuthorPage() {
  const { author, social } = config;

  const socialLinks = Object.entries({
    ...author.social,
    ...social,
  }).filter(([, value]) => value);

  return (
    <>
      <Header />
      <PageContainer>
        <div className="max-w-2xl mx-auto py-12">
          <h1 className="text-3xl font-heading font-bold text-text mb-8">About the Author</h1>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {author.avatar && (
              <div className="shrink-0">
                <ImageWithFallback
                  src={author.avatar}
                  alt={author.name}
                  width={160}
                  height={160}
                  className="rounded-full object-cover w-40 h-40"
                />
              </div>
            )}
            <div>
              <h2 className="text-xl font-heading font-semibold text-text mb-2">{author.name}</h2>
              <p className="text-muted leading-relaxed">{author.bio}</p>
            </div>
          </div>

          {socialLinks.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-heading font-semibold text-text mb-4">Connect</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(([platform, url]) => {
                  const href = typeof url === 'string' && url.startsWith('http') ? url : `https://${platform}.com/${url}`;
                  return (
                    <a
                      key={platform}
                      href={href}
                      target="_blank"
                      rel="noopener nofollow"
                      className="px-4 py-2 bg-surface border border-border rounded-theme text-sm text-text hover:border-primary transition-colors capitalize"
                    >
                      {platform}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </PageContainer>
      <Footer />
    </>
  );
}

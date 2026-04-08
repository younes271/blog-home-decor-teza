// app/not-found.tsx — custom 404 page
// Requirements: 12.7

import Link from 'next/link';
import config from '@/site.config';
import { getFeaturedPosts } from '@/lib/posts';
import { Header, Footer, PageContainer } from '@/components/layout';
import { Input } from '@/components/ui';

export default function NotFound() {
  const popularPosts = getFeaturedPosts(5);

  return (
    <>
      <Header />
      <PageContainer>
        <div className="max-w-xl mx-auto text-center py-16">
          <h1 className="text-6xl font-heading font-bold text-primary mb-4">404</h1>
          <p className="text-xl text-text mb-2">Page not found</p>
          <p className="text-muted mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          {config.advanced.enableSearchPage && (
            <form action="/search" method="get" className="mb-10">
              <div className="flex gap-2">
                <Input
                  name="q"
                  placeholder="Search articles…"
                  aria-label="Search articles"
                  className="flex-1"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-textOnPrimary rounded-theme text-sm font-medium hover:bg-primaryHover transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          )}

          {popularPosts.length > 0 && (
            <div className="text-left mb-10">
              <h2 className="text-lg font-heading font-semibold text-text mb-4">
                Popular posts
              </h2>
              <ul className="space-y-3">
                {popularPosts.map((post) => (
                  <li key={post.frontmatter.slug}>
                    <Link
                      href={`/blog/${post.frontmatter.slug}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {post.frontmatter.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link
            href="/"
            className="inline-block px-6 py-3 bg-primary text-textOnPrimary rounded-theme font-medium hover:bg-primaryHover transition-colors"
          >
            Back to homepage
          </Link>
        </div>
      </PageContainer>
      <Footer />
    </>
  );
}

// app/tag/[slug]/page.tsx — tag listing page with SSG + ISR
// Requirements: 12.3, 21.3, 13.1

import type { Metadata } from 'next';
import { getAllTags, getPostsByTag, getPaginatedPosts } from '@/lib/posts';
import config from '@/site.config';
import { buildPageMetadata } from '@/lib/seo';
import { PostCardGrid, Pagination } from '@/components/blog';
import { Header, Footer, PageContainer } from '@/components/layout';

export const revalidate = 3600;

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ slug: tag }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tag = decodeURIComponent(params.slug);
  return buildPageMetadata({
    title: `#${tag}`,
    description: `Posts tagged with "${tag}"`,
    path: `/tag/${params.slug}`,
  });
}

export default function TagPage({ params }: { params: { slug: string } }) {
  const tag = decodeURIComponent(params.slug);
  const allTagPosts = getPostsByTag(tag);
  const perPage = config.content.postsPerPage;
  const { posts, totalPages, currentPage } = getPaginatedPosts(allTagPosts, 1, perPage);

  return (
    <>
      <Header />
      <PageContainer>
        <h1 className="text-3xl font-heading font-bold text-text mb-8">#{tag}</h1>

        {posts.length > 0 ? (
          <>
            <PostCardGrid posts={posts} />
            <Pagination currentPage={currentPage} totalPages={totalPages} basePath={`/tag/${params.slug}`} />
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted">No posts yet</p>
            <p className="text-sm text-muted mt-2">No posts have been tagged with &ldquo;{tag}&rdquo; yet.</p>
          </div>
        )}
      </PageContainer>
      <Footer />
    </>
  );
}

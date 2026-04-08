// app/blog/page.tsx — blog listing page with pagination
// Requirements: 12.1, 12.2, 13.1, 13.3

import type { Metadata } from 'next';
import config from '@/site.config';
import { getAllPosts, getPaginatedPosts } from '@/lib/posts';
import { buildPageMetadata } from '@/lib/seo';
import { PostCardGrid, CategoryPills, Pagination } from '@/components/blog';
import { Header, Footer, PageContainer } from '@/components/layout';

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: 'Blog',
    description: config.identity.description,
    path: '/blog',
  });
}

export default function BlogPage() {
  const allPosts = getAllPosts();
  const perPage = config.content.postsPerPage;
  const { posts, totalPages, currentPage } = getPaginatedPosts(allPosts, 1, perPage);

  return (
    <>
      <Header />
      <PageContainer>
        <section aria-label="Categories" className="mb-8">
          <CategoryPills />
        </section>

        <h1 className="text-3xl font-heading font-bold text-text mb-8">Blog</h1>

        <PostCardGrid posts={posts} />

        <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/blog" />
      </PageContainer>
      <Footer />
    </>
  );
}

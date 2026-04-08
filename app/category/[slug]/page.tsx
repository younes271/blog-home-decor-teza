// app/category/[slug]/page.tsx — category listing page with SSG + ISR
// Requirements: 12.3, 21.3, 13.1, 13.8

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import config from '@/site.config';
import { getPostsByCategory, getPaginatedPosts } from '@/lib/posts';
import { buildPageMetadata } from '@/lib/seo';
import { PostCardGrid, CategoryPills, Pagination } from '@/components/blog';
import { Header, Footer, PageContainer } from '@/components/layout';
import { BreadcrumbJsonLd } from '@/components/seo';

export const revalidate = 3600;

export function generateStaticParams() {
  return config.content.categories.map((cat) => ({ slug: cat.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = config.content.categories.find((c) => c.slug === params.slug);
  if (!category) return {};

  return buildPageMetadata({
    title: category.name,
    description: category.description ?? `Browse all ${category.name} posts`,
    path: `/category/${params.slug}`,
  });
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = config.content.categories.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const allCategoryPosts = getPostsByCategory(params.slug);
  const perPage = config.content.postsPerPage;
  const { posts, totalPages, currentPage } = getPaginatedPosts(allCategoryPosts, 1, perPage);

  return (
    <>
      <Header />
      <PageContainer>
        <BreadcrumbJsonLd items={[{ name: category.name, url: `/category/${category.slug}` }]} />
        <section aria-label="Categories" className="mb-8">
          <CategoryPills activeSlug={params.slug} />
        </section>

        <h1 className="text-3xl font-heading font-bold text-text mb-8">{category.name}</h1>

        {posts.length > 0 ? (
          <>
            <PostCardGrid posts={posts} />
            <Pagination currentPage={currentPage} totalPages={totalPages} basePath={`/category/${params.slug}`} />
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted">No posts yet</p>
            <p className="text-sm text-muted mt-2">Check back soon for new content in {category.name}.</p>
          </div>
        )}
      </PageContainer>
      <Footer />
    </>
  );
}

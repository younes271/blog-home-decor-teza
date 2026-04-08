// app/page.tsx — homepage with four layout variants driven by config
// Requirements: 12.1, 18.1, 13.7

import config from '@/site.config';
import { getAllPosts, getFeaturedPosts, getPaginatedPosts } from '@/lib/posts';
import { PostCard, PostCardGrid, CategoryPills, Pagination } from '@/components/blog';
import { Header, Footer, PageContainer } from '@/components/layout';
import { ImageWithFallback } from '@/components/ui';
import { NewsletterCTA } from '@/components/mdx/NewsletterCTA';
import { OrganizationJsonLd } from '@/components/seo';
import type { Post } from '@/types/post';

export const revalidate = 3600;

function WelcomeHero() {
  return (
    <section className="relative overflow-hidden rounded-theme bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 border border-primary/10 mb-10">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>
      <div className="relative px-6 py-12 md:px-12 md:py-16 text-center">
        <div className="flex items-center justify-center mb-4">
          <span className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-textOnPrimary font-heading font-bold text-xl shadow-lg">
            {config.identity.name.charAt(0)}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-3">
          Welcome to {config.identity.name}
        </h2>
        <p className="text-lg text-muted max-w-2xl mx-auto mb-6 leading-relaxed">
          {config.identity.description}
        </p>
        <p className="text-sm text-muted">
          {config.identity.tagline}
        </p>
      </div>
    </section>
  );
}

function EmptyState() {
  const categories = config.content.categories.slice(0, 6);
  return (
    <div className="space-y-10">
      {/* Category showcase */}
      <section>
        <h3 className="font-heading font-semibold text-text text-lg mb-4">Explore Topics</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group relative overflow-hidden rounded-theme bg-surface border border-border p-5 hover:border-primary hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3">
                {cat.color && (
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cat.color }}
                    aria-hidden="true"
                  />
                )}
                <span className="font-heading font-semibold text-text group-hover:text-primary transition-colors">
                  {cat.name}
                </span>
              </div>
              {cat.description && (
                <p className="text-xs text-muted mt-2 line-clamp-2">{cat.description}</p>
              )}
            </a>
          ))}
        </div>
      </section>

      {/* Coming soon message */}
      <section className="text-center py-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-3">
          <span>✨</span> Fresh content coming soon
        </div>
        <p className="text-muted text-sm max-w-md mx-auto">
          We&apos;re preparing amazing content for you. Check back soon or subscribe to our newsletter to be the first to know.
        </p>
      </section>
    </div>
  );
}

function MagazineLayout({ featuredPost, posts }: { featuredPost: Post | null; posts: Post[] }) {
  return (
    <div>
      {featuredPost && (
        <section className="mb-8">
          <article className="group relative overflow-hidden rounded-theme">
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              <ImageWithFallback
                src={featuredPost.frontmatter.image.src}
                alt={featuredPost.frontmatter.image.alt}
                width={featuredPost.frontmatter.image.width}
                height={featuredPost.frontmatter.image.height}
                className="object-cover w-full h-full"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span className="inline-block px-3 py-1 rounded-full bg-primary text-textOnPrimary text-xs font-semibold mb-3">
                {config.content.categories.find((c) => c.slug === featuredPost.frontmatter.category)?.name ?? featuredPost.frontmatter.category}
              </span>
              <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-2">
                <a href={`/blog/${featuredPost.frontmatter.slug}`} className="hover:underline">
                  {featuredPost.frontmatter.title}
                </a>
              </h2>
              <p className="text-sm md:text-base text-white/80 line-clamp-2 max-w-2xl">
                {featuredPost.excerpt}
              </p>
            </div>
          </article>
        </section>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <PostCard key={post.frontmatter.slug} post={post} />
        ))}
      </div>
    </div>
  );
}

function GridLayout({ posts }: { posts: Post[] }) {
  return <PostCardGrid posts={posts} />;
}

function ListLayout({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-4">
      {posts.map((post) => {
        const categoryLabel =
          config.content.categories.find((c) => c.slug === post.frontmatter.category)?.name ??
          post.frontmatter.category;

        return (
          <a
            key={post.frontmatter.slug}
            href={`/blog/${post.frontmatter.slug}`}
            className="group flex flex-col sm:flex-row gap-4 rounded-theme overflow-hidden bg-surface border border-border hover:border-primary hover:shadow-md transition-all"
          >
            <div className="relative w-full sm:w-64 shrink-0 aspect-[16/9] sm:aspect-auto sm:h-48 overflow-hidden">
              <ImageWithFallback
                src={post.frontmatter.image.src}
                alt={post.frontmatter.image.alt}
                width={post.frontmatter.image.width}
                height={post.frontmatter.image.height}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 256px"
              />
            </div>
            <div className="flex flex-col justify-center p-4 sm:py-4 sm:pr-4 sm:pl-0">
              <span className="text-xs font-semibold text-primary mb-1">{categoryLabel}</span>
              <h2 className="text-lg font-heading font-semibold text-text line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                {post.frontmatter.title}
              </h2>
              <p className="text-sm text-muted line-clamp-2 mb-2">{post.excerpt}</p>
              <div className="flex items-center gap-2 text-xs text-muted">
                <time dateTime={post.frontmatter.date}>
                  {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
                {config.content.showReadingTime && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTime} min read</span>
                  </>
                )}
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}

function HeroGridLayout({ featuredPost, posts }: { featuredPost: Post | null; posts: Post[] }) {
  return (
    <div>
      {featuredPost && (
        <section className="mb-8">
          <div className="relative w-full aspect-[21/9] overflow-hidden rounded-theme">
            <ImageWithFallback
              src={featuredPost.frontmatter.image.src}
              alt={featuredPost.frontmatter.image.alt}
              width={featuredPost.frontmatter.image.width}
              height={featuredPost.frontmatter.image.height}
              className="object-cover w-full h-full"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-2">
                <a href={`/blog/${featuredPost.frontmatter.slug}`} className="hover:underline">
                  {featuredPost.frontmatter.title}
                </a>
              </h2>
              <p className="text-base text-white/80 line-clamp-2 max-w-3xl">
                {featuredPost.excerpt}
              </p>
            </div>
          </div>
        </section>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <PostCard key={post.frontmatter.slug} post={post} />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const allPosts = getAllPosts();
  const variant = config.layout.homepage.variant;
  const showFeatured = config.layout.homepage.showFeaturedPost;
  const showNewsletter = config.layout.homepage.showNewsletter;
  const postsPerPage = config.layout.homepage.postsPerPage;
  const hasPosts = allPosts.length > 0;

  const featuredPosts = showFeatured ? getFeaturedPosts(1) : [];
  const featuredPost = featuredPosts.length > 0 ? featuredPosts[0] : null;

  const filteredPosts = featuredPost
    ? allPosts.filter((p) => p.frontmatter.slug !== featuredPost.frontmatter.slug)
    : allPosts;

  const { posts, totalPages, currentPage } = getPaginatedPosts(filteredPosts, 1, postsPerPage);

  return (
    <>
      <Header />
      <PageContainer showSidebar={false}>
        <OrganizationJsonLd />

        <h1 className="sr-only">{config.identity.name}</h1>

        {!hasPosts && <WelcomeHero />}

        <section aria-label="Categories" className="mb-8">
          <CategoryPills />
        </section>

        {hasPosts ? (
          <>
            {variant === 'magazine' && (
              <MagazineLayout featuredPost={featuredPost} posts={posts} />
            )}
            {variant === 'grid' && <GridLayout posts={posts} />}
            {variant === 'list' && <ListLayout posts={posts} />}
            {variant === 'hero-grid' && (
              <HeroGridLayout featuredPost={featuredPost} posts={posts} />
            )}
            <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/" />
          </>
        ) : (
          <EmptyState />
        )}

        {showNewsletter && config.newsletter.enabled && (
          <section className="mt-12">
            <NewsletterCTA />
          </section>
        )}
      </PageContainer>
      <Footer />
    </>
  );
}

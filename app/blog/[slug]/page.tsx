// app/blog/[slug]/page.tsx — individual post page
// Requirements: 12.1, 12.2, 13.3, 13.4, 13.5, 13.6, 13.8, 13.9

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import config from '@/site.config';
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts';
import { buildPostMetadata } from '@/lib/seo';
import { compileMdx } from '@/lib/mdx';
import { PostHero, PostHeader, PostFooter, RelatedPosts } from '@/components/blog';
import { PostBody } from '@/components/PostBody';
import { Header, Footer, PageContainer } from '@/components/layout';
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd, HowToJsonLd, PinterestMeta } from '@/components/seo';
import { ShareFloatingBar } from '@/components/social';

export const revalidate = 3600;

/**
 * Extracts step titles from MDX content containing <StepByStep> / <Step> components.
 * Parses <Step title="..."> tags to build HowTo JSON-LD steps.
 */
function extractStepsFromContent(content: string): Array<{ name: string; text: string }> {
  const stepRegex = /<Step\s+title="([^"]+)"[^>]*>([\s\S]*?)(?:<\/Step>)/g;
  const steps: Array<{ name: string; text: string }> = [];
  let match: RegExpExecArray | null;
  while ((match = stepRegex.exec(content)) !== null) {
    steps.push({
      name: match[1],
      text: match[2].replace(/<[^>]+>/g, '').trim().slice(0, 200) || match[1],
    });
  }
  return steps;
}

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: { slug: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return buildPostMetadata(post);
}

export default async function PostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const mdxSource = await compileMdx(post.content);
  const { frontmatter } = post;
  const category = config.content.categories.find((c) => c.slug === frontmatter.category);

  return (
    <>
      <Header />
      <PageContainer>
        <article>
          <ArticleJsonLd post={post} />
          <BreadcrumbJsonLd
            items={[
              { name: 'Blog', url: '/blog' },
              ...(category ? [{ name: category.name, url: `/category/${category.slug}` }] : []),
              { name: frontmatter.title, url: `/blog/${frontmatter.slug}` },
            ]}
          />
          {frontmatter.faq && frontmatter.faq.length > 0 && (
            <FAQJsonLd faq={frontmatter.faq} />
          )}
          {post.content.includes('<StepByStep') && (
            <HowToJsonLd
              title={frontmatter.title}
              description={frontmatter.description}
              steps={extractStepsFromContent(post.content)}
              image={frontmatter.image.src}
            />
          )}
          {config.pinterest.enableRichPins && <PinterestMeta post={post} />}

          <PostHero post={post} />
          <div className="mt-8">
            <PostHeader post={post} />
            <PostBody source={mdxSource} />
            <PostFooter post={post} />
          </div>
        </article>
        <RelatedPosts post={post} />
      </PageContainer>
      {config.layout.postPage.showSocialShare && (
        <ShareFloatingBar
          url={`${config.identity.url}/blog/${frontmatter.slug}`}
          title={frontmatter.title}
          pinImage={frontmatter.pinImage?.src ?? frontmatter.image.src}
        />
      )}
      <Footer />
    </>
  );
}

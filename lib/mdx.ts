// lib/mdx.ts — MDX compilation pipeline and component mappings
// Requirements: 11.3, 11.6

import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeExternalLinks from 'rehype-external-links';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

// ── Compilation ───────────────────────────────────────────────────────────────

/**
 * Compiles an MDX string through the full plugin pipeline.
 * Returns a serialized MDX result ready for <MDXRemote />.
 *
 * Pipeline order (Requirements 11.3):
 *   remark-gfm → remark-unwrap-images →
 *   rehype-slug → rehype-autolink-headings → rehype-pretty-code →
 *   rehype-external-links
 */
export async function compileMdx(source: string): Promise<MDXRemoteSerializeResult> {
  return serialize(source, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        remarkUnwrapImages,
      ],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
            properties: { className: ['anchor'] },
          },
        ],
        [
          rehypePrettyCode,
          {
            theme: 'github-dark',
            keepBackground: true,
          },
        ],
        [
          rehypeExternalLinks,
          {
            // Requirements 11.6: all external links get noopener nofollow + _blank
            rel: ['noopener', 'nofollow'],
            target: '_blank',
          },
        ],
      ],
    },
    parseFrontmatter: false,
  });
}

// ── MDX component mappings ────────────────────────────────────────────────────
// These are placeholder types — actual component implementations are in Task 4.
// The mapping is defined here so PostBody can import it in one place.

export type MdxComponents = Record<string, React.ComponentType<Record<string, unknown>>>;

/**
 * Returns the MDX component map.
 * Components are lazy-imported to avoid bundling them in non-MDX pages.
 * Actual implementations are provided in Task 4.
 */
export function getMdxComponents(overrides?: MdxComponents): MdxComponents {
  // Placeholder stubs — replaced with real components in Task 4
  const stubs: MdxComponents = {
    // Content components
    Callout: createStub('Callout'),
    FAQ: createStub('FAQ'),
    Disclosure: createStub('Disclosure'),
    NewsletterCTA: createStub('NewsletterCTA'),
    RelatedReading: createStub('RelatedReading'),

    // Step / checklist components
    StepByStep: createStub('StepByStep'),
    Step: createStub('Step'),
    Checklist: createStub('Checklist'),
    CheckItem: createStub('CheckItem'),

    // Media / rich components
    Gallery: createStub('Gallery'),
    TableOfContents: createStub('TableOfContents'),
    PinImage: createStub('PinImage'),
    RecipeCard: createStub('RecipeCard'),
    ProductCard: createStub('ProductCard'),
    BeforeAfter: createStub('BeforeAfter'),
    VideoEmbed: createStub('VideoEmbed'),
  };

  return { ...stubs, ...overrides };
}

// ── Internal helpers ──────────────────────────────────────────────────────────

function createStub(name: string): React.ComponentType<Record<string, unknown>> {
  // Minimal stub that renders children (if any) — replaced in Task 4
  const Stub = ({ children }: { children?: React.ReactNode }) => {
    // In a real environment this would render the component.
    // During Task 3 this is intentionally a no-op stub.
    return null as unknown as React.ReactElement;
  };
  Stub.displayName = name;
  return Stub as unknown as React.ComponentType<Record<string, unknown>>;
}

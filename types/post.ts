// PostFrontmatter — schema for all MDX post files
// Requirements: 11.1, 11.2

export interface PostImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface PostFrontmatter {
  // ── Required ──────────────────────────────────────────────────────────────
  title: string;           // < 60 chars
  slug: string;            // URL slug, unique per blog
  description: string;     // < 160 chars
  date: string;            // ISO date "2026-01-15"
  category: string;        // Must match a slug in config.content.categories
  image: PostImage;        // Hero image — src and alt are required

  // ── Optional ──────────────────────────────────────────────────────────────
  updatedDate?: string;
  author?: string;         // Defaults to config.author.name
  tags?: string[];
  pinImage?: PostImage;    // 1000×1500 vertical Pinterest image
  pinDescription?: string; // Pre-filled Pinterest save description
  featured?: boolean;
  draft?: boolean;         // Excluded from build if true
  noindex?: boolean;
  canonicalUrl?: string;
  relatedSlugs?: string[];
  faq?: Array<{ question: string; answer: string }>;
}

// ── Post with computed metadata ───────────────────────────────────────────────

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;         // Raw MDX body
  readingTime: number;     // Minutes (computed)
  wordCount: number;       // (computed)
  excerpt: string;         // Truncated description or first paragraph
}

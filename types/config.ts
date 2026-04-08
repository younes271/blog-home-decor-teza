// SiteConfig — single source of truth for all blog settings
// Requirements: 10.1, 22.2

export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type CardStyle = 'flat' | 'shadow' | 'border' | 'glass';
export type HeaderVariant = 'centered' | 'left-aligned' | 'split';
export type FooterVariant = 'columns' | 'simple' | 'minimal';
export type HomepageVariant = 'magazine' | 'grid' | 'list' | 'hero-grid';
export type SidebarPosition = 'left' | 'right';
export type NewsletterProvider = 'convertkit' | 'mailchimp' | 'beehiiv' | 'buttondown' | 'custom';
export type AdsProvider = 'adsense' | 'mediavine';
export type BlogStatus = 'draft' | 'creating_repo' | 'deploying' | 'live' | 'error' | 'paused' | 'archived';

// ── Identity ──────────────────────────────────────────────────────────────────

export interface SiteIdentity {
  name: string;           // "Cozy Kitchen Prep"
  tagline: string;        // "Simple meal prep for busy families"
  description: string;    // Used in meta description for homepage
  url: string;            // "https://cozykitchenprep.com" (no trailing slash)
  locale: string;         // "en_US"
  language: string;       // "en"
}

// ── Author ────────────────────────────────────────────────────────────────────

export interface SiteAuthor {
  name: string;
  bio: string;
  avatar: string;         // Path or R2 CDN URL
  social?: {
    twitter?: string;
    pinterest?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
}

// ── Theme / Branding ──────────────────────────────────────────────────────────

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  surfaceHover: string;
  text: string;
  textMuted: string;
  textOnPrimary: string;
  border: string;
  borderLight: string;
}

export interface DarkModeColors {
  background: string;
  surface: string;
  surfaceHover: string;
  text: string;
  textMuted: string;
  border: string;
  borderLight: string;
}

export interface ThemeFonts {
  heading: string;   // Google Font name, e.g. "Playfair Display"
  body: string;      // Google Font name, e.g. "Lato"
}

export interface ThemeAnimations {
  enabled: boolean;
}

export interface SiteTheme {
  colors: ThemeColors;
  darkMode: {
    enabled: boolean;
    colors: DarkModeColors;
  };
  fonts: ThemeFonts;
  borderRadius: BorderRadius;
  cardStyle: CardStyle;
  animations: ThemeAnimations;
}

// ── Layout ────────────────────────────────────────────────────────────────────

export interface HomepageLayout {
  variant: HomepageVariant;
  showFeaturedPost: boolean;
  showNewsletter: boolean;
  postsPerPage: number;
}

export interface SidebarLayout {
  enabled: boolean;
  position: SidebarPosition;
  widgets: string[];   // e.g. ["popular-posts", "categories", "newsletter", "tags"]
}

export interface PostPageLayout {
  showTableOfContents: boolean;
  showSocialShare: boolean;
  showRelatedPosts: boolean;
  showAuthorBio: boolean;
  showReadingProgress: boolean;
}

export interface HeaderLayout {
  variant: HeaderVariant;
  sticky: boolean;
  showSearch: boolean;
  showDarkModeToggle: boolean;
}

export interface FooterLayout {
  variant: FooterVariant;
  showNewsletter: boolean;
}

export interface SiteLayout {
  homepage: HomepageLayout;
  sidebar: SidebarLayout;
  postPage: PostPageLayout;
  header: HeaderLayout;
  footer: FooterLayout;
}

// ── Content ───────────────────────────────────────────────────────────────────

export interface ContentCategory {
  name: string;
  slug: string;
  description?: string;
}

export interface SiteContent {
  postsPerPage: number;
  categories: ContentCategory[];
  defaultPostImage: string;   // Fallback image path or R2 URL
  showReadingTime: boolean;
  showWordCount: boolean;
  excerptLength: number;      // Characters
}

// ── SEO ───────────────────────────────────────────────────────────────────────

export interface SiteSEO {
  titleTemplate: string;          // "%s | Cozy Kitchen Prep"
  defaultOgImage: string;         // Path or R2 CDN URL (1200×630)
  twitterHandle?: string;         // "@handle" (without @)
  googleSiteVerification?: string;
  pinterestSiteVerification?: string;
  noindex: boolean;               // Global noindex override
}

// ── Pinterest ─────────────────────────────────────────────────────────────────

export interface SitePinterest {
  enableSaveButtons: boolean;
  enableRichPins: boolean;
  username?: string;
}

// ── Ads ───────────────────────────────────────────────────────────────────────

export interface AdSlots {
  headerBanner: boolean;
  sidebarAd: boolean;
  inArticleFrequency: number;   // 0 = disabled; N = inject after every N paragraphs
  afterPost: boolean;
  betweenCards: number;         // 0 = disabled; N = inject after every N cards
}

export interface SiteAds {
  enabled: boolean;
  provider: AdsProvider;
  adsenseClientId?: string;     // "ca-pub-XXXXXXXXXXXXXXXX"
  mediavineId?: string;
  slots: AdSlots;
}

// ── Newsletter ────────────────────────────────────────────────────────────────

export interface SiteNewsletter {
  enabled: boolean;
  provider: NewsletterProvider;
  formAction: string;           // Form POST URL
  publicApiKey?: string;
  title: string;
  description: string;
  incentive?: string;           // "Get our free 7-day meal prep guide"
  showExitIntent: boolean;
  showInlineForm: boolean;
}

// ── Social ────────────────────────────────────────────────────────────────────

export interface SiteSocial {
  twitter?: string;
  pinterest?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
}

// ── Advanced ──────────────────────────────────────────────────────────────────

export interface SiteAdvanced {
  enableSearchPage: boolean;
  enablePWA: boolean;
  customHeadScripts?: string;   // Raw HTML injected into <head>
  redirects?: Array<{ source: string; destination: string; permanent: boolean }>;
  revalidationSecret?: string;  // REVALIDATION_SECRET env var name
}

// ── Niche Preset ──────────────────────────────────────────────────────────────

export interface NichePreset {
  colors: ThemeColors;
  darkMode: {
    colors: DarkModeColors;
  };
  fonts: ThemeFonts;
  borderRadius: BorderRadius;
  cardStyle: CardStyle;
}

// ── Root SiteConfig ───────────────────────────────────────────────────────────

export interface SiteConfig {
  identity: SiteIdentity;
  author: SiteAuthor;
  theme: SiteTheme;
  layout: SiteLayout;
  content: SiteContent;
  seo: SiteSEO;
  pinterest: SitePinterest;
  ads: SiteAds;
  newsletter: SiteNewsletter;
  social: SiteSocial;
  advanced: SiteAdvanced;
}

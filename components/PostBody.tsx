// PostBody — MDX renderer with in-article ad injection
// Requirements: 11.5, 15.3

import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { getMdxComponents } from '@/lib/mdx';
import { InArticleAd } from '@/components/ads/InArticleAd';
import { getAdInjectionIndices } from '@/lib/adInjection';
import config from '@/site.config';

// ── Real component map (replaces stubs from lib/mdx.ts) ──────────────────────
import { Callout } from '@/components/mdx/Callout';
import { FAQ } from '@/components/mdx/FAQ';
import { Disclosure } from '@/components/mdx/Disclosure';
import { NewsletterCTA } from '@/components/mdx/NewsletterCTA';
import { RelatedReading } from '@/components/mdx/RelatedReading';
import { StepByStep, Step } from '@/components/mdx/StepByStep';
import { Checklist, CheckItem } from '@/components/mdx/Checklist';
import { Gallery } from '@/components/mdx/Gallery';
import { TableOfContents } from '@/components/mdx/TableOfContents';
import { PinImage } from '@/components/mdx/PinImage';
import { RecipeCard } from '@/components/mdx/RecipeCard';
import { ProductCard } from '@/components/mdx/ProductCard';
import { BeforeAfter } from '@/components/mdx/BeforeAfter';
import { VideoEmbed } from '@/components/mdx/VideoEmbed';

// ── Ad-injecting paragraph wrapper ───────────────────────────────────────────

/**
 * Creates a custom `p` component that tracks paragraph count and injects
 * an <InArticleAd> after every N paragraphs when ads are enabled.
 *
 * Uses getAdInjectionIndices logic: inject after paragraphs N, 2N, 3N, ...
 * The counter is held in a closure so it resets per PostBody render.
 */
function createAdInjectingParagraph(frequency: number) {
  let paragraphCount = 0;

  function AdInjectingP({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    paragraphCount += 1;
    // Inject when current count is a multiple of frequency (matches getAdInjectionIndices)
    const shouldInjectAd = frequency > 0 && paragraphCount % frequency === 0;

    return (
      <>
        <p {...props}>{children}</p>
        {shouldInjectAd && <InArticleAd />}
      </>
    );
  }

  AdInjectingP.displayName = 'AdInjectingP';
  return AdInjectingP;
}

// ── PostBody ──────────────────────────────────────────────────────────────────

interface PostBodyProps {
  source: MDXRemoteSerializeResult;
}

export function PostBody({ source }: PostBodyProps) {
  const frequency = config.ads.enabled ? config.ads.slots.inArticleFrequency : 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type AnyComponent = React.ComponentType<any>;

  const components = getMdxComponents({
    // Real component implementations
    Callout: Callout as AnyComponent,
    FAQ: FAQ as AnyComponent,
    Disclosure: Disclosure as AnyComponent,
    NewsletterCTA: NewsletterCTA as AnyComponent,
    RelatedReading: RelatedReading as AnyComponent,
    StepByStep: StepByStep as AnyComponent,
    Step: Step as AnyComponent,
    Checklist: Checklist as AnyComponent,
    CheckItem: CheckItem as AnyComponent,
    Gallery: Gallery as AnyComponent,
    TableOfContents: TableOfContents as AnyComponent,
    PinImage: PinImage as AnyComponent,
    RecipeCard: RecipeCard as AnyComponent,
    ProductCard: ProductCard as AnyComponent,
    BeforeAfter: BeforeAfter as AnyComponent,
    VideoEmbed: VideoEmbed as AnyComponent,
    // Ad-injecting paragraph (frequency=0 means no injection)
    p: createAdInjectingParagraph(frequency) as AnyComponent,
  });

  return (
    <article className="prose prose-lg max-w-none dark:prose-invert">
      <MDXRemote {...source} components={components} />
    </article>
  );
}

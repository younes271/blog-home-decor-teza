// VideoEmbed — responsive YouTube/Vimeo embed for MDX content
// Requirements: 11.4

import React from 'react';

type VideoProvider = 'youtube' | 'vimeo';

interface VideoEmbedProps {
  url: string;
  title?: string;
  caption?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1';
}

function extractVideoId(url: string): { provider: VideoProvider; id: string } | null {
  // YouTube: youtu.be/ID or youtube.com/watch?v=ID or youtube.com/embed/ID
  const ytMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/,
  );
  if (ytMatch) return { provider: 'youtube', id: ytMatch[1] };

  // Vimeo: vimeo.com/ID
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return { provider: 'vimeo', id: vimeoMatch[1] };

  return null;
}

function buildEmbedUrl(provider: VideoProvider, id: string): string {
  if (provider === 'youtube') {
    return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;
  }
  return `https://player.vimeo.com/video/${id}?dnt=1`;
}

const aspectPadding: Record<string, string> = {
  '16/9': 'pb-[56.25%]',
  '4/3': 'pb-[75%]',
  '1/1': 'pb-[100%]',
};

export function VideoEmbed({ url, title = 'Embedded video', caption, aspectRatio = '16/9' }: VideoEmbedProps) {
  const parsed = extractVideoId(url);

  if (!parsed) {
    // Fallback: render a plain link
    return (
      <p className="my-4 text-sm text-textMuted">
        Video:{' '}
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          {url}
        </a>
      </p>
    );
  }

  const embedUrl = buildEmbedUrl(parsed.provider, parsed.id);
  const padding = aspectPadding[aspectRatio] ?? aspectPadding['16/9'];

  return (
    <figure className="my-8">
      <div className={`relative w-full ${padding} rounded-theme overflow-hidden bg-black`}>
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-xs text-textMuted mt-2">{caption}</figcaption>
      )}
    </figure>
  );
}

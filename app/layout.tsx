// app/layout.tsx — root layout
// Injects theme CSS variables from site.config.ts, loads Google Fonts, applies dark mode class
// Requirements: 10.2, 10.6, 10.7, 16.8

import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
import config from '@/site.config';
import { buildThemeStyleTag } from '@/lib/theme';
import { PinterestSDK } from '@/components/pinterest';
import { AdScript } from '@/components/ads';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import '@/styles/globals.css';

// Load fonts via next/font/google — self-hosted, no external requests
// Font names come from config.theme.fonts; we load the defaults here.
// For dynamic font loading per config, the font loader must be called at module level.
// Requirements: 10.7, 16.8
const headingFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading-loaded',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const bodyFont = Lato({
  subsets: ['latin'],
  variable: '--font-body-loaded',
  display: 'swap',
  weight: ['300', '400', '700'],
});

export const metadata: Metadata = {
  title: {
    default: config.identity.name,
    template: config.seo.titleTemplate,
  },
  description: config.identity.description,
  metadataBase: new URL(config.identity.url),
  openGraph: {
    siteName: config.identity.name,
    locale: config.identity.locale,
    type: 'website',
  },
  robots: config.seo.noindex ? { index: false, follow: false } : { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Build inline CSS vars from config — injected into :root at render time
  // Requirements: 10.2, 10.8
  const themeStyle = buildThemeStyleTag(config);

  // Apply dark mode class to <html> when dark mode is enabled and default is dark
  // The actual toggle is handled client-side by useDarkMode hook (Task 12)
  const darkModeEnabled = config.theme.darkMode.enabled;

  return (
    <html
      lang={config.identity.language}
      className={`${headingFont.variable} ${bodyFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Inline theme CSS variables — overrides the fallback values in globals.css */}
        <style dangerouslySetInnerHTML={{ __html: themeStyle }} />
        {/* Dark mode initialization script — applies .dark class before paint to prevent FOUC */}
        {/* Requirements: 10.6 */}
        {darkModeEnabled && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(t==null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
            }}
          />
        )}
        {/* Pinterest site verification */}
        {config.seo.pinterestSiteVerification && (
          <meta name="p:domain_verify" content={config.seo.pinterestSiteVerification} />
        )}
        {/* Google site verification */}
        {config.seo.googleSiteVerification && (
          <meta name="google-site-verification" content={config.seo.googleSiteVerification} />
        )}
        {/* Custom head scripts from advanced config */}
        {config.advanced.customHeadScripts && (
          <div dangerouslySetInnerHTML={{ __html: config.advanced.customHeadScripts }} />
        )}
      </head>
      <body className="bg-background text-text font-body antialiased">
        {/* Skip-to-content link — first focusable element, Requirements: 17.1 */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-on-primary focus:rounded-theme focus:outline-none"
        >
          Skip to content
        </a>
        <main id="main-content">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
        <PinterestSDK />
        <AdScript />
      </body>
    </html>
  );
}

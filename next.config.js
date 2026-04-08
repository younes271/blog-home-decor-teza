/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.blogfactory.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // MDX support via next-mdx-remote (processed in lib/mdx.ts)
  // No need for @next/mdx since we use next-mdx-remote
  experimental: {
    // Enable server actions if needed in future
  },
  // Ensure TypeScript strict mode errors fail the build
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // config.advanced.redirects support — Requirements: 10.1
  async redirects() {
    try {
      const config = require('./site.config').default;
      if (config?.advanced?.redirects && Array.isArray(config.advanced.redirects)) {
        return config.advanced.redirects.map((r) => ({
          source: r.source,
          destination: r.destination,
          permanent: r.permanent ?? false,
        }));
      }
    } catch {
      // Config not available at build time — no redirects
    }
    return [];
  },
};

module.exports = nextConfig;

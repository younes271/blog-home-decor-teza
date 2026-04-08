// tailwind.config.ts — extends Tailwind with all theme tokens from SiteConfig
// Requirements: 10.3
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // bg-primary, text-primary, border-primary, etc.
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'surface-hover': 'var(--color-surface-hover)',
        // text-text, bg-text
        text: 'var(--color-text)',
        // text-muted, bg-muted
        muted: 'var(--color-text-muted)',
        'on-primary': 'var(--color-text-on-primary)',
        // border-border
        border: 'var(--color-border)',
        'border-light': 'var(--color-border-light)',
      },
      borderRadius: {
        // rounded-theme
        theme: 'var(--radius)',
      },
      fontFamily: {
        // font-heading, font-body
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--color-text)',
            a: { color: 'var(--color-primary)' },
            'h1,h2,h3,h4': { color: 'var(--color-text)' },
            code: { color: 'var(--color-text)' },
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;

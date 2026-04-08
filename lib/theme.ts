// lib/theme.ts — config-to-CSS-variable transformer
// Requirements: 10.2, 10.4

import type { SiteConfig, BorderRadius } from '@/types/config';

/** Maps borderRadius config values to pixel values for --radius */
export const BORDER_RADIUS_MAP: Record<BorderRadius, string> = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '16px',
  full: '9999px',
};

/**
 * Generates a CSS string of custom property declarations for the :root element.
 * Covers all color fields, border radius, and font families from SiteConfig.
 * Requirements: 10.2, 10.4, 10.8
 */
export function buildThemeCssVars(config: SiteConfig): string {
  const { colors } = config.theme;
  const radius = BORDER_RADIUS_MAP[config.theme.borderRadius];
  const { heading, body } = config.theme.fonts;

  const vars: Record<string, string> = {
    '--color-primary': colors.primary,
    '--color-primary-hover': colors.primaryHover,
    '--color-secondary': colors.secondary,
    '--color-accent': colors.accent,
    '--color-background': colors.background,
    '--color-surface': colors.surface,
    '--color-surface-hover': colors.surfaceHover,
    '--color-text': colors.text,
    '--color-text-muted': colors.textMuted,
    '--color-text-on-primary': colors.textOnPrimary,
    '--color-border': colors.border,
    '--color-border-light': colors.borderLight,
    '--radius': radius,
    '--font-heading': `'${heading}', serif`,
    '--font-body': `'${body}', sans-serif`,
  };

  return Object.entries(vars)
    .map(([prop, value]) => `  ${prop}: ${value};`)
    .join('\n');
}

/**
 * Generates a CSS string of dark mode custom property overrides for the .dark class.
 * Only overrides the color tokens that differ in dark mode.
 * Requirements: 10.6
 */
export function buildDarkModeCssVars(config: SiteConfig): string {
  const { colors } = config.theme.darkMode;

  const vars: Record<string, string> = {
    '--color-background': colors.background,
    '--color-surface': colors.surface,
    '--color-surface-hover': colors.surfaceHover,
    '--color-text': colors.text,
    '--color-text-muted': colors.textMuted,
    '--color-border': colors.border,
    '--color-border-light': colors.borderLight,
  };

  return Object.entries(vars)
    .map(([prop, value]) => `  ${prop}: ${value};`)
    .join('\n');
}

/**
 * Returns the full inline <style> block string to inject into the root layout.
 * Includes :root light mode vars and optional .dark overrides.
 * Requirements: 10.2, 10.6
 */
export function buildThemeStyleTag(config: SiteConfig): string {
  const rootVars = buildThemeCssVars(config);
  const darkEnabled = config.theme.darkMode.enabled;
  const darkVars = darkEnabled ? buildDarkModeCssVars(config) : '';

  const darkBlock = darkEnabled
    ? `\n.dark {\n${darkVars}\n}`
    : '';

  return `:root {\n${rootVars}\n}${darkBlock}`;
}

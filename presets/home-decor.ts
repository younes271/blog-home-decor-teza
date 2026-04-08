import type { NichePreset } from '@/types/config';

// Home-decor niche preset — warm earth tones with sage and cream
// Cozy, inviting palette for interior design and styling content
// Requirements: 22.1, 22.2

export const homeDecorPreset: NichePreset = {
  colors: {
    primary: '#D4A373',
    primaryHover: '#C49363',
    secondary: '#CCD5AE',
    accent: '#E9EDC9',
    background: '#FEFAE0',
    surface: '#FFFFFF',
    surfaceHover: '#FAF6E9',
    text: '#3B3226',
    textMuted: '#7C7164',
    textOnPrimary: '#FFFFFF',
    border: '#E5DDD0',
    borderLight: '#F0EBE0',
  },
  darkMode: {
    colors: {
      background: '#1C1A17',
      surface: '#262320',
      surfaceHover: '#302D29',
      text: '#F5F0E8',
      textMuted: '#A09585',
      border: '#3D3830',
      borderLight: '#2E2A25',
    },
  },
  fonts: {
    heading: 'Cormorant Garamond',
    body: 'Nunito Sans',
  },
  borderRadius: 'md',
  cardStyle: 'shadow',
};

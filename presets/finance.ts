import type { NichePreset } from '@/types/config';

// Finance niche preset — professional greens and navy
// Trustworthy, clean palette for budgeting and investing content
// Requirements: 22.1, 22.2

export const financePreset: NichePreset = {
  colors: {
    primary: '#2D6A4F',
    primaryHover: '#1B5E3F',
    secondary: '#40916C',
    accent: '#95D5B2',
    background: '#F8FAF9',
    surface: '#FFFFFF',
    surfaceHover: '#F0F5F2',
    text: '#1B2A22',
    textMuted: '#5F7268',
    textOnPrimary: '#FFFFFF',
    border: '#D1DDD6',
    borderLight: '#E8EFE9',
  },
  darkMode: {
    colors: {
      background: '#0F1A14',
      surface: '#162019',
      surfaceHover: '#1E2A22',
      text: '#E8F0EB',
      textMuted: '#8FA898',
      border: '#2A3D31',
      borderLight: '#1E2D24',
    },
  },
  fonts: {
    heading: 'Inter',
    body: 'Source Sans 3',
  },
  borderRadius: 'sm',
  cardStyle: 'border',
};

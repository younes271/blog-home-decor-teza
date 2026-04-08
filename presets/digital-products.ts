import type { NichePreset } from '@/types/config';

// Digital-products niche preset — modern purples and teals
// Bold, tech-forward palette for printables and digital downloads
// Requirements: 22.1, 22.2

export const digitalProductsPreset: NichePreset = {
  colors: {
    primary: '#7209B7',
    primaryHover: '#5E07A0',
    secondary: '#3A0CA3',
    accent: '#4CC9F0',
    background: '#F9F5FF',
    surface: '#FFFFFF',
    surfaceHover: '#F3EDFC',
    text: '#1A0A2E',
    textMuted: '#6E5A8A',
    textOnPrimary: '#FFFFFF',
    border: '#DDD0EE',
    borderLight: '#EDE5F7',
  },
  darkMode: {
    colors: {
      background: '#110A20',
      surface: '#1A1230',
      surfaceHover: '#231A3E',
      text: '#EDE5F7',
      textMuted: '#9A85B8',
      border: '#2E2050',
      borderLight: '#221840',
    },
  },
  fonts: {
    heading: 'Space Grotesk',
    body: 'DM Sans',
  },
  borderRadius: 'md',
  cardStyle: 'glass',
};

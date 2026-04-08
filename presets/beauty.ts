import type { NichePreset } from '@/types/config';

// Beauty niche preset — soft pinks and mauves
// Elegant, feminine palette for skincare and makeup content
// Requirements: 22.1, 22.2

export const beautyPreset: NichePreset = {
  colors: {
    primary: '#D4A5A5',
    primaryHover: '#C49595',
    secondary: '#9E6B6B',
    accent: '#F0E6EF',
    background: '#FDF8F8',
    surface: '#FFFFFF',
    surfaceHover: '#FBF2F2',
    text: '#3D2C2C',
    textMuted: '#8A7070',
    textOnPrimary: '#FFFFFF',
    border: '#EAD8D8',
    borderLight: '#F5ECEC',
  },
  darkMode: {
    colors: {
      background: '#1A1416',
      surface: '#241E20',
      surfaceHover: '#2E2628',
      text: '#F5ECEC',
      textMuted: '#A89090',
      border: '#3D3033',
      borderLight: '#2E2528',
    },
  },
  fonts: {
    heading: 'Cormorant Garamond',
    body: 'Lato',
  },
  borderRadius: 'lg',
  cardStyle: 'glass',
};

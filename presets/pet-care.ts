import type { NichePreset } from '@/types/config';

// Pet-care niche preset — natural greens and warm browns
// Friendly, earthy palette for pet health and training content
// Requirements: 22.1, 22.2

export const petCarePreset: NichePreset = {
  colors: {
    primary: '#606C38',
    primaryHover: '#4E5A2C',
    secondary: '#283618',
    accent: '#DDA15E',
    background: '#FAFAF5',
    surface: '#FFFFFF',
    surfaceHover: '#F5F5ED',
    text: '#1E2410',
    textMuted: '#6B7258',
    textOnPrimary: '#FFFFFF',
    border: '#D5D9C4',
    borderLight: '#E8EBDD',
  },
  darkMode: {
    colors: {
      background: '#141810',
      surface: '#1C2116',
      surfaceHover: '#252C1E',
      text: '#E8EBDD',
      textMuted: '#95A07A',
      border: '#333D26',
      borderLight: '#252E1C',
    },
  },
  fonts: {
    heading: 'Nunito',
    body: 'Mulish',
  },
  borderRadius: 'lg',
  cardStyle: 'shadow',
};

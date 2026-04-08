import type { NichePreset } from '@/types/config';

// Meal-prep niche preset — warm, kitchen-friendly palette
// Terracotta/coral primary with warm neutrals
// Requirements: 22.1, 22.2

export const mealPrepPreset: NichePreset = {
  colors: {
    primary: '#E07A5F',
    primaryHover: '#C96A4F',
    secondary: '#3D405B',
    accent: '#81B29A',
    background: '#FAFAF8',
    surface: '#FFFFFF',
    surfaceHover: '#F5F5F0',
    text: '#2D2D2D',
    textMuted: '#6B7280',
    textOnPrimary: '#FFFFFF',
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
  },
  darkMode: {
    colors: {
      background: '#1A1A1A',
      surface: '#242424',
      surfaceHover: '#2E2E2E',
      text: '#F5F5F0',
      textMuted: '#9CA3AF',
      border: '#374151',
      borderLight: '#2D2D2D',
    },
  },
  fonts: {
    heading: 'Playfair Display',
    body: 'Lato',
  },
  borderRadius: 'md',
  cardStyle: 'shadow',
};

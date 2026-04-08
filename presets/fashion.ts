import type { NichePreset } from '@/types/config';

// Fashion niche preset — sophisticated dark tones (charcoal, teal, gold)
// Elegant, editorial palette for outfit ideas and style guides
// Requirements: 22.1, 22.2

export const fashionPreset: NichePreset = {
  colors: {
    primary: '#264653',
    primaryHover: '#1A3640',
    secondary: '#2A9D8F',
    accent: '#E9C46A',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceHover: '#F5F5F5',
    text: '#1A1A1A',
    textMuted: '#6B6B6B',
    textOnPrimary: '#FFFFFF',
    border: '#E0E0E0',
    borderLight: '#F0F0F0',
  },
  darkMode: {
    colors: {
      background: '#0D1117',
      surface: '#161B22',
      surfaceHover: '#1F252D',
      text: '#F0F0F0',
      textMuted: '#8B949E',
      border: '#30363D',
      borderLight: '#21262D',
    },
  },
  fonts: {
    heading: 'Playfair Display',
    body: 'Raleway',
  },
  borderRadius: 'none',
  cardStyle: 'border',
};

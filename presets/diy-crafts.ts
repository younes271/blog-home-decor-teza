import type { NichePreset } from '@/types/config';

// DIY & Crafts niche preset — vibrant warm colors (orange, yellow, coral)
// Energetic, creative palette for handmade projects and tutorials
// Requirements: 22.1, 22.2

export const diyCraftsPreset: NichePreset = {
  colors: {
    primary: '#E76F51',
    primaryHover: '#D45D3F',
    secondary: '#F4A261',
    accent: '#E9C46A',
    background: '#FFFBF5',
    surface: '#FFFFFF',
    surfaceHover: '#FFF5EB',
    text: '#2C2017',
    textMuted: '#7A6B5D',
    textOnPrimary: '#FFFFFF',
    border: '#EDE0D4',
    borderLight: '#F5EDE4',
  },
  darkMode: {
    colors: {
      background: '#1A1512',
      surface: '#24201B',
      surfaceHover: '#2E2924',
      text: '#F5EDE4',
      textMuted: '#A89888',
      border: '#3D3429',
      borderLight: '#2E2720',
    },
  },
  fonts: {
    heading: 'Fredoka',
    body: 'Quicksand',
  },
  borderRadius: 'lg',
  cardStyle: 'shadow',
};

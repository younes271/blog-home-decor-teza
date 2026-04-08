import type { NichePreset } from '@/types/config';

// Travel niche preset — ocean blues and sky tones
// Adventurous, open palette for destination guides and travel tips
// Requirements: 22.1, 22.2

export const travelPreset: NichePreset = {
  colors: {
    primary: '#0077B6',
    primaryHover: '#005F92',
    secondary: '#00B4D8',
    accent: '#90E0EF',
    background: '#F5FBFF',
    surface: '#FFFFFF',
    surfaceHover: '#EDF7FC',
    text: '#0A1628',
    textMuted: '#5A6E80',
    textOnPrimary: '#FFFFFF',
    border: '#C8E0ED',
    borderLight: '#E4F0F8',
  },
  darkMode: {
    colors: {
      background: '#0A1220',
      surface: '#111C2E',
      surfaceHover: '#1A2740',
      text: '#E4F0F8',
      textMuted: '#7FA0B8',
      border: '#1E3450',
      borderLight: '#152840',
    },
  },
  fonts: {
    heading: 'Montserrat',
    body: 'Open Sans',
  },
  borderRadius: 'md',
  cardStyle: 'shadow',
};

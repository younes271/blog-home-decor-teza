import type { NichePreset } from '@/types/config';

// Organization niche preset — clean blues and grays
// Structured, minimal palette for productivity and decluttering content
// Requirements: 22.1, 22.2

export const organizationPreset: NichePreset = {
  colors: {
    primary: '#457B9D',
    primaryHover: '#356A8A',
    secondary: '#1D3557',
    accent: '#A8DADC',
    background: '#F8FAFB',
    surface: '#FFFFFF',
    surfaceHover: '#F0F4F7',
    text: '#1A2332',
    textMuted: '#5E6E7E',
    textOnPrimary: '#FFFFFF',
    border: '#D0DBE3',
    borderLight: '#E6ECF0',
  },
  darkMode: {
    colors: {
      background: '#0E1520',
      surface: '#151E2C',
      surfaceHover: '#1D2838',
      text: '#E6ECF0',
      textMuted: '#7E94A8',
      border: '#253548',
      borderLight: '#1C2A3C',
    },
  },
  fonts: {
    heading: 'Inter',
    body: 'IBM Plex Sans',
  },
  borderRadius: 'sm',
  cardStyle: 'flat',
};

import type { NichePreset } from '@/types/config';

// Barrel export for all 10 niche presets
// Requirements: 22.1, 22.3

export { mealPrepPreset } from './meal-prep';
export { homeDecorPreset } from './home-decor';
export { financePreset } from './finance';
export { diyCraftsPreset } from './diy-crafts';
export { fashionPreset } from './fashion';
export { beautyPreset } from './beauty';
export { travelPreset } from './travel';
export { petCarePreset } from './pet-care';
export { organizationPreset } from './organization';
export { digitalProductsPreset } from './digital-products';

import { mealPrepPreset } from './meal-prep';
import { homeDecorPreset } from './home-decor';
import { financePreset } from './finance';
import { diyCraftsPreset } from './diy-crafts';
import { fashionPreset } from './fashion';
import { beautyPreset } from './beauty';
import { travelPreset } from './travel';
import { petCarePreset } from './pet-care';
import { organizationPreset } from './organization';
import { digitalProductsPreset } from './digital-products';

/** Map of niche ID → NichePreset for pipeline lookup */
export const PRESET_MAP: Record<string, NichePreset> = {
  'meal-prep': mealPrepPreset,
  'home-decor': homeDecorPreset,
  'finance': financePreset,
  'diy-crafts': diyCraftsPreset,
  'fashion': fashionPreset,
  'beauty': beautyPreset,
  'travel': travelPreset,
  'pet-care': petCarePreset,
  'organization': organizationPreset,
  'digital-products': digitalProductsPreset,
};

/** All supported niche IDs */
export const NICHE_IDS = Object.keys(PRESET_MAP);

/**
 * Look up a niche preset by ID.
 * Returns undefined if the niche is not found.
 */
export function getPreset(nicheId: string): NichePreset | undefined {
  return PRESET_MAP[nicheId];
}

/**
 * Merge a niche preset with user-provided overrides.
 * User overrides take precedence over preset defaults (Req 22.3).
 * Supports partial nested overrides — e.g. overriding only `colors.primary`
 * keeps all other preset color values intact.
 */
export function mergePresetWithOverrides(
  preset: NichePreset,
  overrides: DeepPartial<NichePreset>,
): NichePreset {
  return {
    colors: { ...preset.colors, ...overrides.colors },
    darkMode: {
      colors: { ...preset.darkMode.colors, ...overrides.darkMode?.colors },
    },
    fonts: { ...preset.fonts, ...overrides.fonts },
    borderRadius: overrides.borderRadius ?? preset.borderRadius,
    cardStyle: overrides.cardStyle ?? preset.cardStyle,
  };
}

/** Recursive partial type for nested override support */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

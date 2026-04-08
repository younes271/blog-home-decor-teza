// lib/adInjection.ts — pure ad injection logic, extracted for testability
// Requirements: 11.5, 15.3

/**
 * Given a total paragraph count P and a frequency N,
 * returns the indices (1-based) of paragraphs after which an ad should be injected.
 *
 * Property 31: floor(P / N) ads are injected, after paragraphs N, 2N, 3N, ...
 *
 * @param paragraphCount  Total number of paragraphs in the post body
 * @param frequency       Inject after every N paragraphs (0 = disabled)
 * @returns               Array of 1-based paragraph indices after which to inject
 */
export function getAdInjectionIndices(paragraphCount: number, frequency: number): number[] {
  if (frequency <= 0 || paragraphCount <= 0) return [];

  const indices: number[] = [];
  for (let i = frequency; i <= paragraphCount; i += frequency) {
    indices.push(i);
  }
  return indices;
}

/**
 * Returns the total number of ads that will be injected.
 * Equivalent to Math.floor(paragraphCount / frequency).
 */
export function countAdsInjected(paragraphCount: number, frequency: number): number {
  if (frequency <= 0 || paragraphCount <= 0) return 0;
  return Math.floor(paragraphCount / frequency);
}

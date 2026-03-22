/**
 * Threshold on baked `sizes[]` so only the largest particles (SVG “bright” gems) pick up white.
 * Uses a high percentile (~top 12%) so medium/small stay cyan-atom.
 */
export const getHighlightScaleThreshold = (sizes: number[]): number => {
  if (sizes.length === 0) {
    return 1
  }
  const sorted = [...sizes].sort((a, b) => a - b)
  const idx = Math.min(sorted.length - 1, Math.floor(sorted.length * 0.88))
  return sorted[idx]!
}

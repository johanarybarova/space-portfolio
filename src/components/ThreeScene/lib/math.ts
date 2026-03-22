/** Clamps `value` to `[min, max]` — used for scroll progress and shader-friendly ranges. */
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

/** Smoothstep-style easing used across scroll-driven opacity and motion. */
export const easeInOutCubic = (x: number): number =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2

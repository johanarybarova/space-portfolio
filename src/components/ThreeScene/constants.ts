/** Layout breakpoint (hands/galaxy math when visible). */
export const MOBILE_BREAKPOINT = 768

/**
 * Galaxy + Michelangelo only render at this width and up.
 * Many phones report ≥768px (landscape / large devices); 1024 matches common `lg` desktop cutoff.
 */
export const DESKTOP_HERO_MIN_WIDTH = 1024

/** Responsive Z placement: scales with viewport width vs design baseline. */
export const GALAXY_Z_OFFSET_BASE_WIDTH = 1470
export const GALAXY_Z_OFFSET_MULTIPLIER = 0.005

export const BACKGROUND_STAR_COUNT = 2000
export const BACKGROUND_STAR_SPREAD = 100
export const BACKGROUND_STAR_SPREAD_ALT = 120

/** Default Reinhard tone mapping exposure (also reset after explosion flash). */
export const DEFAULT_TONE_MAPPING_EXPOSURE = 1.6

/** Default bloom pass strength (matches original scene tuning). */
export const DEFAULT_BLOOM_STRENGTH = 0.8

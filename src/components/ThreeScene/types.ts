/** World-space placement for the spiral galaxy Points mesh. */
export type GalaxyTransform = {
  x: number
  y: number
  z: number
  rotX: number
  rotZ: number
}

/** Cached DOM section positions used for scroll-driven scene logic. */
export type SectionOffsets = {
  heroOffset: number
  heroHeight: number
  contactOffset: number
}

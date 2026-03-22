/** Particle cloud baked from SVG / preprocessing (see michelangeloHandParticles.json). */
export type HandParticleCloud = {
  viewBox: [number, number]
  count: number
  positions: number[]
  colors: number[]
  sizes: number[]
  randoms: number[]
}

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
  michelangeloOffset: number
  michelangeloHeight: number
  contactOffset: number
  cvFolderOffset: number
}

/** Spiral + dense core — tuned for the scroll “fly through” sequence. */
export const defaultGalaxyParameters = {
  count: 50000,
  coreCount: 3000,
  size: 1,
  radius: 3,
  branches: 2,
  spin: 4,
  randomness: 0.3,
  randomnessPower: 3,
  insideColor: '#ffffff',
  midColor: '#97aaad',
  outsideColor: '#00deff',
} as const

export type GalaxyParameters = typeof defaultGalaxyParameters

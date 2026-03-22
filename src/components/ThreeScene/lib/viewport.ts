import type * as THREE from 'three'
import {
  DESKTOP_HERO_MIN_WIDTH,
  GALAXY_Z_OFFSET_BASE_WIDTH,
  GALAXY_Z_OFFSET_MULTIPLIER,
  MOBILE_BREAKPOINT,
} from '../constants'
import type { GalaxyTransform } from '../types'

export const isMobileViewport = () => window.innerWidth < MOBILE_BREAKPOINT

/** Spiral galaxy + particle hands: desktop / large screens only (not phone or small tablet). */
export const isDesktopHeroViewport = () =>
  typeof window !== 'undefined' && window.innerWidth >= DESKTOP_HERO_MIN_WIDTH

/** Galaxy Z baseline shifts slightly with viewport width so framing stays consistent. */
export const getGalaxyBaseZ = () =>
  (window.innerWidth - GALAXY_Z_OFFSET_BASE_WIDTH) * GALAXY_Z_OFFSET_MULTIPLIER

/** Rest pose for the galaxy before scroll modifiers and fly-through. */
export const getGalaxyBaseTransform = (): GalaxyTransform => {
  const isMobile = isMobileViewport()
  const zOffset = getGalaxyBaseZ()

  if (isMobile) {
    return {
      x: 0,
      y: 0,
      z: Math.min(0, zOffset - 2),
      rotX: 0.6,
      rotZ: 0,
    }
  }

  return {
    x: 4.5,
    y: 0.8,
    z: Math.min(2, zOffset),
    rotX: 0.2,
    rotZ: -0.2,
  }
}

export const applyGalaxyTransform = (points: THREE.Points, transform: GalaxyTransform) => {
  points.position.set(transform.x, transform.y, transform.z)
  points.rotation.x = transform.rotX
  points.rotation.z = transform.rotZ
}

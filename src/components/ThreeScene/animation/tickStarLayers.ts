import type * as THREE from 'three'

/** Slow drift on both layers — speed scales with scroll “energy” for a subtle effect. */
export const tickStarLayers = (
  delta: number,
  speedMultiplier: number,
  particlesMesh: THREE.Points,
  particlesMesh2: THREE.Points
) => {
  particlesMesh.rotation.y += 0.05 * speedMultiplier * delta
  particlesMesh.rotation.x += 0.01 * speedMultiplier * delta
  particlesMesh2.rotation.y += 0.03 * speedMultiplier * delta
  particlesMesh2.rotation.x -= 0.01 * speedMultiplier * delta
}

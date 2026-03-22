import * as THREE from 'three'
import {
  BACKGROUND_STAR_COUNT,
  BACKGROUND_STAR_SPREAD,
  BACKGROUND_STAR_SPREAD_ALT,
} from '../constants'

export type BackgroundStarLayers = {
  meshA: THREE.Points
  meshB: THREE.Points
  geometryA: THREE.BufferGeometry
  geometryB: THREE.BufferGeometry
  materialA: THREE.PointsMaterial
  materialB: THREE.PointsMaterial
}

/**
 * Two layered star fields (cyan + white) for parallax depth when rotating slowly.
 */
export const createBackgroundStarLayers = (
  starTexture: THREE.CanvasTexture | null
): BackgroundStarLayers => {
  const particlesGeometry = new THREE.BufferGeometry()
  const posArray = new Float32Array(BACKGROUND_STAR_COUNT * 3)

  for (let i = 0; i < BACKGROUND_STAR_COUNT * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * BACKGROUND_STAR_SPREAD
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

  const material = new THREE.PointsMaterial({
    size: 0.2,
    color: 0x00deff,
    map: starTexture || undefined,
    transparent: true,
    opacity: 0.8,
    alphaTest: 0.01,
  })

  const particlesGeometry2 = new THREE.BufferGeometry()
  const posArray2 = new Float32Array(BACKGROUND_STAR_COUNT * 3)
  for (let i = 0; i < BACKGROUND_STAR_COUNT * 3; i++) {
    posArray2[i] = (Math.random() - 0.5) * BACKGROUND_STAR_SPREAD_ALT
  }
  particlesGeometry2.setAttribute('position', new THREE.BufferAttribute(posArray2, 3))
  const material2 = new THREE.PointsMaterial({
    size: 0.1,
    color: 0xffffff,
    map: starTexture || undefined,
    transparent: true,
    opacity: 0.8,
    alphaTest: 0.01,
  })

  const meshA = new THREE.Points(particlesGeometry, material)
  const meshB = new THREE.Points(particlesGeometry2, material2)

  return { meshA, meshB, geometryA: particlesGeometry, geometryB: particlesGeometry2, materialA: material, materialB: material2 }
}

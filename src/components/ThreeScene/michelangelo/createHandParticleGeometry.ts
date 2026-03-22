import * as THREE from 'three'
import type { HandParticleCloud } from '../types'

export const createHandParticleGeometry = (data: HandParticleCloud): THREE.BufferGeometry => {
  const geometry = new THREE.BufferGeometry()

  geometry.setAttribute('position', new THREE.BufferAttribute(Float32Array.from(data.positions), 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(Float32Array.from(data.colors), 3))
  geometry.setAttribute('aScale', new THREE.BufferAttribute(Float32Array.from(data.sizes), 1))
  geometry.setAttribute('aRandom', new THREE.BufferAttribute(Float32Array.from(data.randoms), 3))

  return geometry
}

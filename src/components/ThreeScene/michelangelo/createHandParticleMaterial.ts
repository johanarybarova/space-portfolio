import * as THREE from 'three'
import { createStarTexture } from '../textures/createStarTexture'
import { handFragmentShader, handVertexShader } from './handShaders'

const getCyanAtomColor = (): THREE.Color => {
  const cssCyanAtom = getComputedStyle(document.documentElement).getPropertyValue('--cyan-atom').trim()

  return new THREE.Color(cssCyanAtom || '#00defe')
}

/**
 * `diamondMap` — same canvas diamond as star Points (see `createStarTexture`) so silhouettes match.
 */
export const createHandParticleMaterial = (diamondMap: THREE.Texture | null): THREE.ShaderMaterial => {
  const map = diamondMap ?? createStarTexture()
  if (!map) {
    throw new Error('createHandParticleMaterial: diamond texture unavailable')
  }
  map.minFilter = THREE.LinearFilter
  map.magFilter = THREE.LinearFilter
  map.generateMipmaps = false

  const highlightSoft = new THREE.Color(0xd5faff)
  const highlightPeak = new THREE.Color(0xf2fdff)

  return new THREE.ShaderMaterial({
    depthWrite: false,
    blending: THREE.NormalBlending,
    vertexColors: true,
    transparent: true,
    uniforms: {
      uPointSizeMultiplier: { value: 1.0 },
      uOpacity: { value: 0 },
      uAssembleProgress: { value: 0.0 },
      uViewportHeight: { value: 10.0 },
      uTravelProgress: { value: 0.0 },
      uTravelDirection: { value: 0.0 },
      uTravelDistance: { value: 0.0 },
      uTravelVerticalDirection: { value: 0.0 },
      uTravelVerticalDistance: { value: 0.0 },
      uEndColor: { value: getCyanAtomColor() },
      uDiamondMap: { value: map },
      uHighlightScaleThreshold: { value: 1e9 },
      uHighlightSoft: { value: highlightSoft },
      uHighlightPeak: { value: highlightPeak },
    },
    vertexShader: handVertexShader,
    fragmentShader: handFragmentShader,
  })
}

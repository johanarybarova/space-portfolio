import * as THREE from 'three'
import { handFragmentShader, handVertexShader } from './handShaders'

const getCyanAtomColor = (): THREE.Color => {
  const cssCyanAtom = getComputedStyle(document.documentElement).getPropertyValue('--cyan-atom').trim()

  return new THREE.Color(cssCyanAtom || '#00defe')
}

export const createHandParticleMaterial = (): THREE.ShaderMaterial => {
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
    },
    vertexShader: handVertexShader,
    fragmentShader: handFragmentShader,
  })
}

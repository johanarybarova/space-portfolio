import type * as THREE from 'three'

export const tickGalaxyUniforms = (galaxyMaterial: THREE.ShaderMaterial | null, delta: number) => {
  if (!galaxyMaterial) {
    return
  }
  galaxyMaterial.uniforms.uTime.value += delta
  galaxyMaterial.uniforms.uOpacity.value = 1.0
}

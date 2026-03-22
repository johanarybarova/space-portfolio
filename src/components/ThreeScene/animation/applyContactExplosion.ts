import { DEFAULT_BLOOM_STRENGTH, DEFAULT_TONE_MAPPING_EXPOSURE } from '../constants'
import type * as THREE from 'three'
import type { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

type ApplyContactExplosionParams = {
  contactOffset: number
  currentScrollY: number
  renderer: THREE.WebGLRenderer
  bloomPass: UnrealBloomPass
  galaxyPoints: THREE.Points | null
}

/**
 * After the contact section: brief tone-map + bloom “flash”, then hyper-drive Z on the galaxy.
 */
export const applyContactExplosion = (params: ApplyContactExplosionParams) => {
  const { contactOffset, currentScrollY, renderer, bloomPass, galaxyPoints } = params

  if (contactOffset === Infinity) {
    return
  }

  const startExplosionY = contactOffset + 550
  const explosionDistance = 700
  const pixelsIntoExplosion = currentScrollY - startExplosionY

  if (pixelsIntoExplosion > 0) {
    // Flash + bloom ramp are paired with the galaxy hyper-drive; without a galaxy they only blow out the hands/stars.
    if (!galaxyPoints) {
      renderer.toneMappingExposure = DEFAULT_TONE_MAPPING_EXPOSURE
      bloomPass.strength = DEFAULT_BLOOM_STRENGTH

      return
    }

    const explosionProgress = Math.max(0, Math.min(1.0, pixelsIntoExplosion / explosionDistance))

    let flashProgress = 0

    if (explosionProgress < 0.2) {
      flashProgress = explosionProgress / 0.2
      flashProgress = Math.pow(flashProgress, 3.0)
    } else {
      flashProgress = 1.0 - (explosionProgress - 0.2) / 0.8
      flashProgress = Math.max(0, flashProgress)
      flashProgress = Math.pow(flashProgress, 2.0)
    }

    renderer.toneMappingExposure =
      DEFAULT_TONE_MAPPING_EXPOSURE +
      (flashProgress || 0) * (2000.0 - DEFAULT_TONE_MAPPING_EXPOSURE)

    bloomPass.strength =
      DEFAULT_BLOOM_STRENGTH + (flashProgress || 0) * (80.0 - DEFAULT_BLOOM_STRENGTH)

    const driveProgress = Math.max(0, (explosionProgress - 0.2) / 0.8)
    const extraZ = (Math.pow(driveProgress, 5.0) || 0) * 200.0

    const currentX = galaxyPoints.position.x
    const currentY = galaxyPoints.position.y
    const currentZ = galaxyPoints.position.z

    const finalZ = currentZ + extraZ
    const finalX = 0
    const finalY = finalZ * 0.5

    const centerForce = Math.min(1.0, driveProgress * 2.5)

    galaxyPoints.position.z = finalZ

    galaxyPoints.position.x = currentX * (1.0 - centerForce) + finalX * centerForce

    const yWithExtraZ = currentY + extraZ * 0.5
    galaxyPoints.position.y = yWithExtraZ * (1.0 - centerForce) + finalY * centerForce

    galaxyPoints.rotation.x = galaxyPoints.rotation.x * (1.0 - centerForce) + -0.1 * centerForce
    galaxyPoints.rotation.z = galaxyPoints.rotation.z * (1.0 - centerForce) + 0 * centerForce
  } else {
    renderer.toneMappingExposure = DEFAULT_TONE_MAPPING_EXPOSURE
    bloomPass.strength = DEFAULT_BLOOM_STRENGTH
  }
}

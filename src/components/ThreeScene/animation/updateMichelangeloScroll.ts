import type * as THREE from 'three'
import { clamp, easeInOutCubic } from '../lib/math'
import type { SectionOffsets } from '../types'

type UpdateMichelangeloScrollParams = {
  offsets: SectionOffsets
  currentScrollY: number
  worldPerPixel: number
  michelangeloGroup: THREE.Group
  applyHandUniforms: (fn: (material: THREE.ShaderMaterial) => void) => void
}

/**
 * Reveal / fade particle hands and sync vertical lock with the CV folder center when present.
 */
export const updateMichelangeloScroll = (params: UpdateMichelangeloScrollParams) => {
  const { offsets, currentScrollY, worldPerPixel, michelangeloGroup, applyHandUniforms } = params
  const { michelangeloOffset, michelangeloHeight, contactOffset, cvFolderOffset } = offsets

  if (michelangeloOffset === Infinity || michelangeloHeight <= 0) {
    michelangeloGroup.visible = false
    michelangeloGroup.position.y = 0
    applyHandUniforms(material => {
      material.uniforms.uOpacity.value = 0
      material.uniforms.uAssembleProgress.value = 0
      material.uniforms.uTravelProgress.value = 0
    })
    return
  }

  const lockScrollY =
    cvFolderOffset !== Infinity
      ? cvFolderOffset - window.innerHeight / 2
      : michelangeloOffset + michelangeloHeight * 0.5 - window.innerHeight / 2

  const defaultRevealStart = lockScrollY - window.innerHeight * 1.2
  const revealStart =
    contactOffset !== Infinity ? Math.min(contactOffset + 1800, defaultRevealStart) : defaultRevealStart
  const revealEnd = lockScrollY
  const fadeOutStart = michelangeloOffset + michelangeloHeight * 0.2
  const fadeOutEnd = fadeOutStart + window.innerHeight * 0.55
  const revealProgress = clamp(
    (currentScrollY - revealStart) / (revealEnd - revealStart || 1),
    0,
    1
  )
  const fadeOutProgress = clamp(
    (currentScrollY - fadeOutStart) / (fadeOutEnd - fadeOutStart || 1),
    0,
    1
  )
  const opacity = easeInOutCubic(revealProgress) * (1 - fadeOutProgress)

  michelangeloGroup.visible = opacity > 0.001

  applyHandUniforms(material => {
    material.uniforms.uOpacity.value = opacity
  })

  const assembleWindowStart = 0.35
  const assembleProgress = easeInOutCubic(
    clamp((revealProgress - assembleWindowStart) / (1 - assembleWindowStart), 0, 1)
  )
  const travelProgress = easeInOutCubic(revealProgress)
  applyHandUniforms(material => {
    material.uniforms.uAssembleProgress.value = assembleProgress
    material.uniforms.uTravelProgress.value = travelProgress
  })

  if (cvFolderOffset !== Infinity) {
    if (currentScrollY > lockScrollY) {
      const pixelsMoved = currentScrollY - lockScrollY
      michelangeloGroup.position.y = pixelsMoved * worldPerPixel
    } else {
      michelangeloGroup.position.y = 0
    }
  }
}

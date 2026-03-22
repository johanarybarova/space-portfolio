import * as THREE from 'three'
import type { HandParticleCloud } from '../types'

type UpdateHandLayoutParams = {
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  leftHandData: HandParticleCloud
  leftHandPoints: THREE.Points
  rightHandPoints: THREE.Points
  applyHandUniforms: (fn: (material: THREE.ShaderMaterial) => void) => void
  isMobileViewport: () => boolean
}

/**
 * Places hands at screen edges (matching CSS `left:0` / `right:0`) and pushes shader uniforms
 * for pixel-sized points and travel distance in world units.
 */
export const updateHandLayout = (params: UpdateHandLayoutParams): number => {
  const {
    camera,
    renderer,
    leftHandData,
    leftHandPoints,
    rightHandPoints,
    applyHandUniforms,
    isMobileViewport,
  } = params

  const cameraDistance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0))
  const vFov = (camera.fov * Math.PI) / 180
  const height = 2 * Math.tan(vFov / 2) * cameraDistance
  const width = height * camera.aspect

  const isMobile = isMobileViewport()

  const worldPerPixel = width / window.innerWidth

  const paddingPixelsLayout = isMobile ? 16 : 64
  const targetPixelWidth = Math.min(leftHandData.viewBox[0], window.innerWidth * 0.5 - paddingPixelsLayout)

  const handWorldWidth = targetPixelWidth * worldPerPixel
  const handScale = handWorldWidth / leftHandData.viewBox[0]

  const verticalOffset = isMobile ? -height * 0.02 : 0

  leftHandPoints.scale.setScalar(handScale)
  rightHandPoints.scale.setScalar(handScale)

  const leftScreenEdge = -width / 2
  const rightScreenEdge = width / 2

  const viewBoxWorldWidth = leftHandData.viewBox[0] * handScale

  const leftHandX = leftScreenEdge + viewBoxWorldWidth / 2
  const rightHandX = rightScreenEdge - viewBoxWorldWidth / 2

  leftHandPoints.position.set(leftHandX, verticalOffset, 0)
  rightHandPoints.position.set(rightHandX, verticalOffset, 0)

  leftHandPoints.rotation.set(0, 0, 0)
  rightHandPoints.rotation.set(0, 0, 0)

  const pixelSizeMultiplier = (handScale / worldPerPixel) * renderer.getPixelRatio()
  const travelDistanceXPixels = isMobile ? window.innerWidth * 0.49 : window.innerWidth * 0.4
  const travelDistanceYPixels = isMobile ? window.innerHeight * 0.36 : window.innerHeight * 0.3
  const travelDistanceXWorld = travelDistanceXPixels * worldPerPixel
  const travelDistanceYWorld = travelDistanceYPixels * worldPerPixel
  applyHandUniforms(material => {
    material.uniforms.uPointSizeMultiplier.value = pixelSizeMultiplier
    material.uniforms.uViewportHeight.value = height
    material.uniforms.uTravelDistance.value = travelDistanceXWorld
    material.uniforms.uTravelVerticalDistance.value = travelDistanceYWorld
  })

  return worldPerPixel
}

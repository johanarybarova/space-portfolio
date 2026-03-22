import * as THREE from 'three'

/** Procedural diamond sprite for `PointsMaterial` (Manhattan distance matches fragment diamond). */
export const createStarTexture = (): THREE.CanvasTexture | null => {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return null
  }

  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.moveTo(16, 0)
  ctx.lineTo(32, 16)
  ctx.lineTo(16, 32)
  ctx.lineTo(0, 16)
  ctx.closePath()
  ctx.fill()

  return new THREE.CanvasTexture(canvas)
}

import type * as THREE from 'three'
import { easeInOutCubic } from '../lib/math'
import type { GalaxyTransform } from '../types'

type UpdateGalaxyScrollParams = {
  galaxyPoints: THREE.Points
  delta: number
  currentScrollY: number
  currentSpeedMultiplier: number
  michelangeloOffset: number
  isMobileViewport: () => boolean
  getGalaxyBaseTransform: () => GalaxyTransform
}

/**
 * Desktop: eases galaxy from corner toward center over first ~600px scroll.
 * All viewports: “fly” segment interpolates Z and adds lateral overshoot until past Michelangelo.
 */
export const updateGalaxyScroll = (params: UpdateGalaxyScrollParams) => {
  const {
    galaxyPoints,
    delta,
    currentScrollY,
    currentSpeedMultiplier,
    michelangeloOffset,
    isMobileViewport,
    getGalaxyBaseTransform,
  } = params

  galaxyPoints.rotation.y += -0.08 * currentSpeedMultiplier * delta

  const isMobile = isMobileViewport()
  const baseTransform = getGalaxyBaseTransform()

  let targetX = baseTransform.x
  let targetY = baseTransform.y
  let targetZ = baseTransform.z

  let targetRotX = baseTransform.rotX
  let targetRotZ = baseTransform.rotZ

  if (!isMobile) {
    const rawScrollProgress = Math.min(1, currentScrollY / 600)
    const scrollProgress = easeInOutCubic(rawScrollProgress)

    targetX = 4.5 * (1 - scrollProgress)
    targetY = 0.8 * (1 - scrollProgress)
    targetRotX = 0.2 + 0.4 * scrollProgress
    targetRotZ = -0.2 * (1 - scrollProgress)
  }

  const startFlyY = 0
  const pixelsIntoFly = currentScrollY - startFlyY

  if (pixelsIntoFly > 0) {
    const finishFlyY = michelangeloOffset + 800
    const totalFlyDistance = finishFlyY - startFlyY

    const linearProgress = Math.max(0, Math.min(1.0, pixelsIntoFly / totalFlyDistance))

    const flyProgress = Math.pow(linearProgress, 5.0)

    const travelMultiplier = 1.2
    const coreFlyThroughZ = 18

    const zProgress = flyProgress * travelMultiplier
    targetZ = baseTransform.z + zProgress * (coreFlyThroughZ - baseTransform.z)

    const startX = isMobile ? 0 : 4.5
    const startY = isMobile ? 0 : 0.8

    const centerLinearProgress = Math.min(1.0, linearProgress * 1.8)
    const centerEase = -(Math.cos(Math.PI * centerLinearProgress) - 1) / 2

    const viewRayX = 0
    const viewRayY = targetZ * 0.5

    const lerpX = startX + centerEase * (viewRayX - startX)
    const lerpY = startY + centerEase * (viewRayY - startY)

    const overshootAmount = isMobile ? 0 : -4.5
    const leftOvershoot = Math.sin(centerEase * Math.PI) * overshootAmount

    targetX = lerpX + leftOvershoot
    targetY = lerpY

    targetRotX = targetRotX + flyProgress * (-0.1 - targetRotX)
    targetRotZ = targetRotZ + flyProgress * (0 - targetRotZ)
  }

  galaxyPoints.position.set(targetX, targetY, targetZ)
  galaxyPoints.rotation.x = targetRotX
  galaxyPoints.rotation.z = targetRotZ
}

import * as THREE from 'three'
import { defaultGalaxyParameters } from './galaxyParameters'
import { galaxyFragmentShader, galaxyVertexShader } from './galaxyShaders'
import type { GalaxyParameters } from './galaxyParameters'

/**
 * Builds the dense spiral + spherical core used as the main “galaxy” focal object.
 * Caller owns `scene.add` / disposal.
 */
export const createSpiralGalaxy = (
  renderer: THREE.WebGLRenderer,
  parameters: GalaxyParameters = defaultGalaxyParameters,
  applyInitialTransform: (points: THREE.Points) => void
): {
  geometry: THREE.BufferGeometry
  material: THREE.ShaderMaterial
  points: THREE.Points
} => {
  const galaxyGeometry = new THREE.BufferGeometry()

  const totalParticles = parameters.count + parameters.coreCount
  const positions = new Float32Array(totalParticles * 3)
  const colors = new Float32Array(totalParticles * 3)
  const scales = new Float32Array(totalParticles)

  const colorInside = new THREE.Color(parameters.insideColor)
  const colorMid = new THREE.Color(parameters.midColor)
  const colorOutside = new THREE.Color(parameters.outsideColor)

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3
    const rRatio = Math.random()
    const radius = Math.pow(rRatio, 1.2) * parameters.radius
    const spinAngle = radius * parameters.spin
    const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2

    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
    positions[i3 + 1] = randomY * (0.5 + radius * 0.1) * 0.5
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

    scales[i] = Math.random()

    const mixedColor = colorInside.clone()
    if (radius < parameters.radius * 0.25) {
      mixedColor.lerp(colorMid, radius / (parameters.radius * 0.25))
    } else {
      mixedColor.copy(colorMid)
      mixedColor.lerp(
        colorOutside,
        (radius - parameters.radius * 0.25) / (parameters.radius * 0.75)
      )
    }

    colors[i3] = mixedColor.r
    colors[i3 + 1] = mixedColor.g
    colors[i3 + 2] = mixedColor.b
  }

  for (let i = 0; i < parameters.coreCount; i++) {
    const i3 = (parameters.count + i) * 3
    const scaleIdx = parameters.count + i

    const r = Math.pow(Math.random(), 5) * 0.08
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)

    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.sin(phi) * Math.sin(theta) * 0.25
    const z = r * Math.cos(phi)

    positions[i3] = x
    positions[i3 + 1] = y
    positions[i3 + 2] = z

    scales[scaleIdx] = Math.random() * 1.5 + 0.5

    const intensity = 1.0 + (0.5 - r / 0.08)
    colors[i3] = colorInside.r * intensity
    colors[i3 + 1] = colorInside.g * intensity
    colors[i3 + 2] = colorInside.b * intensity
  }

  galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  galaxyGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  galaxyGeometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))

  const galaxyMaterial = new THREE.ShaderMaterial({
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    transparent: true,
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: 30 * renderer.getPixelRatio() },
      uOpacity: { value: 1.0 },
    },
    vertexShader: galaxyVertexShader,
    fragmentShader: galaxyFragmentShader,
  })

  const galaxyPoints = new THREE.Points(galaxyGeometry, galaxyMaterial)

  applyInitialTransform(galaxyPoints)

  return { geometry: galaxyGeometry, material: galaxyMaterial, points: galaxyPoints }
}

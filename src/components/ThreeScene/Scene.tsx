'use client'

import * as THREE from 'three'
import { DEFAULT_BLOOM_STRENGTH, DEFAULT_TONE_MAPPING_EXPOSURE } from './constants'
import { applyContactExplosion } from './animation/applyContactExplosion'
import {
  applyGalaxyTransform,
  getGalaxyBaseTransform,
  isDesktopHeroViewport,
  isMobileViewport,
} from './lib/viewport'
import { createBackgroundStarLayers } from './stars/createBackgroundStarLayers'
import { createBloomComposer } from './postprocessing/createBloomComposer'
import { createHandParticleGeometry } from './michelangelo/createHandParticleGeometry'
import { createHandParticleMaterial } from './michelangelo/createHandParticleMaterial'
import { createSpiralGalaxy } from './galaxy/createSpiralGalaxy'
import { createStarTexture } from './textures/createStarTexture'
import { defaultGalaxyParameters } from './galaxy/galaxyParameters'
import { measureSectionOffsets } from './scroll/measureSectionOffsets'
import { tickGalaxyUniforms } from './animation/tickGalaxyUniforms'
import { tickStarLayers } from './animation/tickStarLayers'
import { updateGalaxyScroll } from './animation/updateGalaxyScroll'
import { updateHandLayout } from './michelangelo/updateHandLayout'
import { updateMichelangeloScroll } from './animation/updateMichelangeloScroll'
import { useEffect, useRef } from 'react'
import michelangeloHandParticles from '@/src/data/michelangeloHandParticles.json'
import type { HandParticleCloud, SectionOffsets } from './types'

const ThreeScene = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: false,
      powerPreference: 'high-performance',
      depth: true,
      stencil: false,
      alpha: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.toneMappingExposure = 1.6

    // Dithering reduces banding on dark gradients (e.g. external monitors).
    // @ts-expect-error — three.js types omit legacy `dither` on WebGLRenderer
    renderer.dither = true

    camera.position.set(0, 5, 10)
    camera.lookAt(0, 0, 0)

    const starTexture = createStarTexture()
    const {
      meshA: particlesMesh,
      meshB: particlesMesh2,
      geometryA: particlesGeometry,
      geometryB: particlesGeometry2,
      materialA: material,
      materialB: material2,
    } = createBackgroundStarLayers(starTexture)
    scene.add(particlesMesh)
    scene.add(particlesMesh2)

    const {
      geometry: galaxyGeometry,
      material: galaxyMaterial,
      points: galaxyPoints,
    } = createSpiralGalaxy(renderer, defaultGalaxyParameters, points =>
      applyGalaxyTransform(points, getGalaxyBaseTransform())
    )
    scene.add(galaxyPoints)

    const leftHandData = michelangeloHandParticles.left as HandParticleCloud
    const rightHandData = michelangeloHandParticles.right as HandParticleCloud

    const michelangeloGroup = new THREE.Group()
    michelangeloGroup.quaternion.copy(camera.quaternion)

    const leftHandGeometry = createHandParticleGeometry(leftHandData)
    const rightHandGeometry = createHandParticleGeometry(rightHandData)
    const leftHandMaterial = createHandParticleMaterial()
    const rightHandMaterial = createHandParticleMaterial()
    leftHandMaterial.uniforms.uTravelDirection.value = -1
    leftHandMaterial.uniforms.uTravelVerticalDirection.value = -1
    rightHandMaterial.uniforms.uTravelDirection.value = 1
    rightHandMaterial.uniforms.uTravelVerticalDirection.value = 1
    const leftHandPoints = new THREE.Points(leftHandGeometry, leftHandMaterial)
    const rightHandPoints = new THREE.Points(rightHandGeometry, rightHandMaterial)
    const applyHandUniforms = (valueByMaterial: (material: THREE.ShaderMaterial) => void) => {
      valueByMaterial(leftHandMaterial)
      valueByMaterial(rightHandMaterial)
    }

    michelangeloGroup.visible = false
    michelangeloGroup.add(leftHandPoints)
    michelangeloGroup.add(rightHandPoints)
    scene.add(michelangeloGroup)

    let sectionOffsets: SectionOffsets = measureSectionOffsets()
    const refreshSectionOffsets = () => {
      sectionOffsets = measureSectionOffsets()
    }

    let currentWorldPerPixel = 1

    const runHandLayout = () => {
      if (!isDesktopHeroViewport()) {
        return
      }
      currentWorldPerPixel = updateHandLayout({
        camera,
        renderer,
        leftHandData,
        leftHandPoints,
        rightHandPoints,
        applyHandUniforms,
        isMobileViewport,
      })
    }

    const { composer, renderPass, bloomPass } = createBloomComposer(renderer, scene, camera)

    /** Hide hero meshes and reset bloom/exposure when viewport is phone-sized. */
    const suppressDesktopHeroEffects = () => {
      galaxyPoints.visible = false
      michelangeloGroup.visible = false
      michelangeloGroup.position.y = 0
      applyHandUniforms(material => {
        material.uniforms.uOpacity.value = 0
        material.uniforms.uAssembleProgress.value = 0
        material.uniforms.uTravelProgress.value = 0
      })
      renderer.toneMappingExposure = DEFAULT_TONE_MAPPING_EXPOSURE
      bloomPass.strength = DEFAULT_BLOOM_STRENGTH
    }

    const applyResponsiveHeroVisibility = () => {
      if (isDesktopHeroViewport()) {
        galaxyPoints.visible = true
        runHandLayout()
        applyGalaxyTransform(galaxyPoints, getGalaxyBaseTransform())
      } else {
        suppressDesktopHeroEffects()
      }
    }

    applyResponsiveHeroVisibility()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      composer.setSize(window.innerWidth, window.innerHeight)

      refreshSectionOffsets()
      applyResponsiveHeroVisibility()
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    window.visualViewport?.addEventListener('resize', handleResize)

    const clock = new THREE.Clock()

    let isScrolling = false
    let scrollTimeout: ReturnType<typeof setTimeout>
    let currentScrollY = 0

    const handleScroll = () => {
      currentScrollY = window.scrollY
      isScrolling = true
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isScrolling = false
      }, 100)
    }

    window.addEventListener('scroll', handleScroll)

    let currentSpeedMultiplier = 1

    setTimeout(() => {
      refreshSectionOffsets()
      applyResponsiveHeroVisibility()
    }, 100)

    let animationFrameId = 0

    const animate = () => {
      const delta = clock.getDelta()

      const targetSpeedMultiplier = isScrolling ? 2.5 : 0.5
      currentSpeedMultiplier += (targetSpeedMultiplier - currentSpeedMultiplier) * delta * 5

      tickStarLayers(delta, currentSpeedMultiplier, particlesMesh, particlesMesh2)

      if (isDesktopHeroViewport()) {
        tickGalaxyUniforms(galaxyMaterial, delta)

        updateGalaxyScroll({
          galaxyPoints,
          delta,
          currentScrollY,
          currentSpeedMultiplier,
          michelangeloOffset: sectionOffsets.michelangeloOffset,
          isMobileViewport,
          getGalaxyBaseTransform,
        })

        updateMichelangeloScroll({
          offsets: sectionOffsets,
          currentScrollY,
          worldPerPixel: currentWorldPerPixel,
          michelangeloGroup,
          applyHandUniforms,
        })

        applyContactExplosion({
          contactOffset: sectionOffsets.contactOffset,
          currentScrollY,
          renderer,
          bloomPass,
          galaxyPoints,
        })
      } else {
        suppressDesktopHeroEffects()
      }

      composer.render()
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      window.visualViewport?.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)

      cancelAnimationFrame(animationFrameId)

      renderer.dispose()

      scene.clear()

      leftHandGeometry.dispose()
      rightHandGeometry.dispose()
      leftHandMaterial.dispose()
      rightHandMaterial.dispose()

      galaxyGeometry.dispose()
      galaxyMaterial.dispose()

      particlesGeometry.dispose()
      material.dispose()
      particlesGeometry2.dispose()
      material2.dispose()

      renderPass.dispose()
      bloomPass.dispose()
      composer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} id='bg' className='three-canvas' />
}

export default ThreeScene

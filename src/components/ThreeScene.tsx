'use client'

import * as THREE from 'three'
import { useEffect, useRef } from 'react'

const ThreeScene = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.position.setZ(30)

    // Generate Diamond Texture
    const getStarTexture = () => {
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

    const starTexture = getStarTexture()

    // Particles (Stars)
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000 // More stars

    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      // Spread stars nicely
      posArray[i] = (Math.random() - 0.5) * 100 // Scale up the spread
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

    // Material
    const material = new THREE.PointsMaterial({
      size: 0.2,
      color: 0x00deff, // Cyan accent
      map: starTexture || undefined,
      transparent: true,
      opacity: 0.8,
      alphaTest: 0.01,
    })

    // White stars as well for depth
    const particlesGeometry2 = new THREE.BufferGeometry()
    const posArray2 = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray2[i] = (Math.random() - 0.5) * 120
    }
    particlesGeometry2.setAttribute('position', new THREE.BufferAttribute(posArray2, 3))
    const material2 = new THREE.PointsMaterial({
      size: 0.1,
      color: 0xffffff,
      map: starTexture || undefined,
      transparent: true,
      opacity: 0.8,
      alphaTest: 0.01,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, material)
    const particlesMesh2 = new THREE.Points(particlesGeometry2, material2)
    scene.add(particlesMesh)
    scene.add(particlesMesh2)

    // Mouse Interaction
    let mouseX = 0
    let mouseY = 0

    const animateParticles = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('mousemove', animateParticles)

    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Rotate entire system slowly
      particlesMesh.rotation.y = elapsedTime * 0.05
      particlesMesh.rotation.x = elapsedTime * 0.01 // gentle tilt
      particlesMesh2.rotation.y = elapsedTime * 0.03
      particlesMesh2.rotation.x = -elapsedTime * 0.01

      // Mouse Parallax (subtle)
      // camera.position.x += (mouseX * 0.001 - camera.position.x) * 0.05
      // camera.position.y += (-mouseY * 0.001 - camera.position.y) * 0.05

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousemove', animateParticles)
    }
  }, [])

  return <canvas ref={canvasRef} id='bg' className='three-canvas' />
}

export default ThreeScene

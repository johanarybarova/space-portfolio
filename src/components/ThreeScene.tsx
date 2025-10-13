'use client'

import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useEffect, useRef } from 'react'
// import gsap from 'gsap'
// Uncomment below if you want OrbitControls

const ThreeScene = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window?.innerWidth / window?.innerHeight,
      0.1,
      1000
    )

    // Orbit Controls
    // const controls = new OrbitControls(camera, canvasRef.current)

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current })
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.position.setZ(30)
    camera.position.setX(-3)
    // Torus
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(10, 3, 16, 20),
      new THREE.MeshBasicMaterial({
        color: 0x00deff, // primary color
        wireframe: true,
      })
    )
    // scene.add(torus)

    // Lights
    const pointLight = new THREE.PointLight(0xffffff)
    pointLight.position.set(5, 5, 5)
    // const lightHelper1 = new THREE.PointLightHelper(pointLight)

    const pointLight2 = new THREE.PointLight(0xffffff)
    pointLight2.position.set(-5, -5, -5)
    // const lightHelper2 = new THREE.PointLightHelper(pointLight2)

    // grid helper
    // const gridHelper = new THREE.GridHelper(100, 100, 0x000000, 0x000000)
    // scene.add(lightHelper1, lightHelper2, gridHelper)

    const ambientLight = new THREE.AmbientLight(0xffffff)
    scene.add(pointLight, pointLight2, ambientLight)

    // Background
    // const spaceTexture = new THREE.TextureLoader().load('/images/space.jpg')
    // spaceTexture.colorSpace = THREE.SRGBColorSpace
    // scene.background = spaceTexture

    // Avatar
    const imageTexture = new THREE.TextureLoader().load('/images/lukas.png')
    imageTexture.colorSpace = THREE.SRGBColorSpace
    const image = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 3),
      new THREE.MeshBasicMaterial({ map: imageTexture })
    )
    image.position.set(2, 0, -5)
    scene.add(image)

    // // square
    // const square = new THREE.Mesh(
    //   new THREE.BoxGeometry(4, 4, 4),
    //   new THREE.MeshBasicMaterial({
    //     color: 0x00deff, // primary color
    //     wireframe: true,
    //   })
    // )
    // square.position.set(2, 0, -5)
    // scene.add(square)

    // Moon
    const moonTexture = new THREE.TextureLoader().load('/images/moon.jpg')
    moonTexture.colorSpace = THREE.SRGBColorSpace
    const normalTexture = new THREE.TextureLoader().load('/images/normal.jpg')
    normalTexture.colorSpace = THREE.SRGBColorSpace
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(3, 50, 50),
      new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
      })
    )
    moon.position.set(-10, 0, 30)
    scene.add(moon)

    // Stars
    const addStar = () => {
      const star = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 10, 10),
        new THREE.MeshStandardMaterial({ color: 0xfffffff })
      )
      const [x, y, z] = Array(3)
        .fill(0)
        .map(() => THREE.MathUtils.randFloatSpread(100))
      star.position.set(x, y, z)
      scene.add(star)
    }
    Array(1000).fill(0).forEach(addStar)

    // Scroll animation
    const moveCamera = () => {
      const t = document.body.getBoundingClientRect().top
      moon.rotation.x += 0.005
      moon.rotation.y += 0.0075
      moon.rotation.z += 0.005
      image.rotation.y += 0.01
      image.rotation.z += 0.01
      camera.position.z = t * -0.01
      camera.position.x = t * -0.0002
      camera.rotation.y = t * -0.0002
    }
    document.body.onscroll = moveCamera

    moveCamera()

    const clock = new THREE.Clock()

    // GSAP
    // gsap.to(jo.position, {
    //   y: 2,
    //   duration: 1,
    //   ease: 'linear',
    // })
    // gsap.to(jo.position, {
    //   y: 0,
    //   duration: 1,
    //   delay: 1,
    //   ease: 'linear',
    // })

    // Animate loop
    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      requestAnimationFrame(animate)
      torus.rotation.x = 0.1 * elapsedTime
      torus.rotation.y = 0.5 * elapsedTime
      torus.rotation.z = 0.1 * elapsedTime
      moon.rotation.x = 0.3 * elapsedTime
      renderer.render(scene, camera)
    }
    animate()

    // Clean-up (optional, useful for route changes)
    return () => {
      document.body.onscroll = null
    }
  }, [])

  return <canvas ref={canvasRef} id='bg' className='three-canvas' />
}

export default ThreeScene

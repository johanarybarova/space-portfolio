import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

export type BloomComposerBundle = {
  composer: EffectComposer
  renderPass: RenderPass
  bloomPass: UnrealBloomPass
}

/**
 * Render pass + UnrealBloom — tuned for the “stellar core” look; explosion pushes these harder.
 */
export const createBloomComposer = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera
): BloomComposerBundle => {
  const renderPass = new RenderPass(scene, camera)
  renderPass.clearAlpha = 0

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
  )
  bloomPass.threshold = 0.2
  bloomPass.strength = 0.8
  bloomPass.radius = 0.4

  const composer = new EffectComposer(renderer)
  composer.addPass(renderPass)
  composer.addPass(bloomPass)

  return { composer, renderPass, bloomPass }
}

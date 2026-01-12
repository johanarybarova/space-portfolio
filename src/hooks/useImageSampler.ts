import { useEffect, useState } from 'react'

export interface Particle {
  x: number // Percentage 0-100
  y: number // Percentage 0-100
  alpha: number // Brightness (0-1)
  key: string
}

export const useImageSampler = (
  imagePath: string,
  sampleRate: number = 10, // Check every Nth pixel
  threshold: number = 30 // Minimum brightness to spawn a particle (0-255)
) => {
  const [particles, setParticles] = useState<Particle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const img = new Image()
    img.src = imagePath
    img.crossOrigin = 'Anonymous'

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) return

      const MAX_WIDTH = 800
      const scale = Math.min(1, MAX_WIDTH / img.width)
      
      canvas.width = img.width * scale
      canvas.height = img.height * scale

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      const { width, height } = canvas
      const imageData = ctx.getImageData(0, 0, width, height)
      const data = imageData.data
      
      const rawParticles: { x: number; y: number; brightness: number; key: string }[] = []
      let minB = 255
      let maxB = 0

      // First Pass: Collect candidates and find dynamic range
      for (let y = 0; y < height; y += sampleRate) {
        for (let x = 0; x < width; x += sampleRate) {
          const i = (y * width + x) * 4
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]

          const brightness = (r + g + b) / 3

          if (brightness > threshold) {
            if (brightness < minB) minB = brightness
            if (brightness > maxB) maxB = brightness
            
            rawParticles.push({
              x: (x / width) * 100,
              y: (y / height) * 100,
              brightness,
              key: `${x}-${y}`,
            })
          }
        }
      }

      const range = maxB - minB || 1
      // Reduced Gamma from 2.5 to 1.8
      // This allows more "mid-bright" pixels to become larger diamonds
      // creating a richer, fuller look instead of just skeleton + highlights
      const GAMMA = 1.8 

      const processedParticles: Particle[] = rawParticles.map((p) => {
        const normalized = (p.brightness - minB) / range
        const contrastEnhanced = Math.pow(normalized, GAMMA)

        return {
          x: p.x,
          y: p.y,
          alpha: contrastEnhanced,
          key: p.key
        }
      })

      setParticles(processedParticles)
      setLoading(false)
    }

    img.onerror = () => {
      console.error(`Failed to load image at ${imagePath}`)
      setLoading(false)
    }
  }, [imagePath, sampleRate, threshold])

  return { particles, loading }
}

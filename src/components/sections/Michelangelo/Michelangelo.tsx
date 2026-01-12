'use client'

import { useMemo, useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './Michelangelo.module.scss'
import { useImageSampler } from '@/src/hooks/useImageSampler'

export const Michelangelo = () => {
  // Use the sampler hook
  // sampleRate: controls density (higher number = fewer particles)
  // Low number = Higher DPI / Density
  // Let's try 6 for high resolution (beware of performance if image is huge, but we scale it down in hook)
  // threshold: controls sensitivity (higher number = only brighter parts)
  const { particles, loading } = useImageSampler('/images/hands-map.png', 6, 20)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Add some random variety to the particles for the animation
  // We memorize this so it doesn't re-roll on every render, but we map it to the particle key
  const renderParticles = useMemo(() => {
    if (!isMounted) return [];
    
    return particles.map((p) => {
      // Map brightness (alpha) to size
      // p.alpha is 0 to 1 (Gamma corrected)
      
      // High Density & Non-Overlapping Logic:
      // Grid spacing is ~6px
      
      const baseSize = 0.8 // Smaller base for cleaner dark areas
      
      // We push the maxVariable up to 5px. 
      // 0.8 + 5 = 5.8px max.
      // Since spacing is ~6px, this is VERY close to touching, 
      // creating a solid block of light in the brightest spots (desired).
      const maxVariable = 5 
      
      // Non-linear Size Boost
      // Instead of linear `p.alpha * maxVariable`, we use a power curve < 1
      // e.g. alpha^0.5 pushes mid-tones up to be larger
      // BUT we already gamma-corrected in the hook to suppress darks.
      // So here we just want to ensure the highlights are MAXED out.
      
      let size = baseSize + (p.alpha * maxVariable)

      // Optional: Hard floor for very dark particles to reduce noise
      if (p.alpha < 0.1) size = baseSize;

      // Color Interpolation Logic:
      // Map alpha (0 to 1) from Cyan (#00deff) to White (#ffffff)
      // Cyan: R=0, G=222, B=255
      // White: R=255, G=255, B=255
      
      const r = Math.round(255 * p.alpha)
      const g = Math.round(222 + (33 * p.alpha))
      const b = 255
      const baseColor = `rgb(${r}, ${g}, ${b})`

      // Wave Logic:
      // Calculate delay based on diagonal position (Top-Left to Bottom-Right)
      // x + y ranges from 0 to 200
      // We want the wave to traverse in about 3-4 seconds
      const waveDelay = (p.x + p.y) * 0.02

      // Shorter, fixed duration for the wave to be visible and rhythmic
      const duration = 1.25

      // Conditional Glow Color Logic:
      // Bright particles (alpha > 0.8) get a black glow to create contrast
      // Darker/Standard particles get the cyan glow
      const isBright = p.alpha > 0.8;
      const glowColor = isBright ? 'rgba(0,0,0,0.8)' : 'var(--cyan-atom, #00deff)';
      
      return {
        ...p,
        size,
        style: {
          top: `${p.y}%`,
          left: `${p.x}%`,
          width: `calc(${size} / 1470 * 100vw)`,
          height: `calc(${size} / 1470 * 100vw)`,
          '--base-color': baseColor,
          '--glow-color': glowColor,
          animationDelay: `${waveDelay}s`,
          animationDuration: `${duration}s`,
          opacity: 1, // Full opacity always
        } as React.CSSProperties
      }
    })
  }, [particles, isMounted])

  if (!isMounted) return null;

  return (
    <section className={styles.container}>
      <div className={styles.visualization}>
        {loading && <div className={styles.loading}>Generating Geometry...</div>}
        
        {!loading && renderParticles.map((p) => (
          <div
            key={p.key}
            className={styles.diamond}
            style={p.style}
          />
        ))}

        {/* The Spark */}
        {!loading && (
          <div className={styles.folderContainer}>
            <Image
              src="/images/folder.png"
              alt="Folder"
              width={50}
              height={50}
              className={styles.folderIcon}
            />
            <span className={styles.folderLabel}>my cv</span>
          </div>
        )}
      </div>
    </section>
  )
}

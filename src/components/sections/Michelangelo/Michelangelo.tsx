'use client'

import { Typography } from '@/src/components/shared/Typography/Typography'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import styles from './Michelangelo.module.scss'

export const Michelangelo = () => {
  const revealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const inner = revealRef.current
    if (!inner) {
      return
    }

    gsap.set(inner, { opacity: 0, y: 18 })

    const ctx = gsap.context(() => {})
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          ctx.add(() => {
            gsap.to(inner, {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: 'power3.out',
            })
          })
          observer.disconnect()
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(inner)

    return () => {
      observer.disconnect()
      ctx.revert()
    }
  }, [])

  return (
    <section id='michelangelo-section' className={styles.container}>
      <div id='cv-folder' className={styles.folderContainer}>
        <div ref={revealRef} className={styles.folderReveal}>
          <Image
            src='/images/folder.png'
            alt='Folder'
            width={50}
            height={50}
            className={styles.folderIcon}
          />
          <Typography as='span' variant='T14Soft' className={styles.folderLabel}>
            my cv
          </Typography>
        </div>
      </div>
    </section>
  )
}

import { Button } from '@/src/components/shared/Button/Button'
import { Flex } from '@/src/components/shared/Flex/Flex'
import { Typography } from '@/src/components/shared/Typography/Typography'
import styles from './HomeHero.module.scss'

export const HomeHero = () => (
  <Flex flexCol justifyCenter itemsCenter as='section' className={styles.section}>
    {/* Background Glow */}
    <div className={styles.glow} />

    <div className={styles.contentWrapper}>
      {/* Freelance Pill */}
      <Typography as='p' variant='T12Strong' className={styles.statusText}>
        [ AVAILABLE FOR FREELANCE ]
      </Typography>

      {/* Main Headline */}
      <Typography as='h1' variant='L96Soft' className={styles.headline}>
        Crafting immersive
        <br />
        <span className={styles.gradientText}>digital universes</span>
      </Typography>

      {/* Description */}
      <Typography as='p' variant='T20Soft' className={styles.description}>
        React Frontend Developer focused on building high-performance, accessible, and visually
        stunning web experiences using modern technologies.
      </Typography>

      {/* Buttons */}
      <Flex gap='var(--gap-m)' className={styles.buttonRow}>
        <Button variant='solid'>
          View Projects
          <span className={styles.arrow}>→</span>
        </Button>
        <Button variant='spark'>Get in touch</Button>
      </Flex>
    </div>
  </Flex>
)

export default HomeHero

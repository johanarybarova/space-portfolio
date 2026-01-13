import { Button } from '@/src/components/shared/Button/Button'
import { Flex } from '@/src/components/shared/Flex/Flex'
import { Typography } from '@/src/components/shared/Typography/Typography'
import styles from './HomeHero.module.scss'

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox='0 0 24 24'
    fill='currentColor'
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    style={{ width: '1.2em', height: '1.2em' }}
  >
    <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.05-.015-2.055-3.33.72-4.035-1.605-4.035-1.605-.54-1.38-1.32-1.755-1.32-1.755-1.095-.75.075-.735.075-.735 1.215.09 1.86 1.245 1.86 1.245 1.08 1.845 2.805 1.32 3.495 1.005.105-.78.42-1.32.765-1.62-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z' />
  </svg>
)

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
          <Flex itemsCenter gap='8px' as='span'>
            <GithubIcon />
            GitHub
          </Flex>
        </Button>
        <Button variant='spark'>Get in Touch</Button>
      </Flex>
    </div>
  </Flex>
)

export default HomeHero

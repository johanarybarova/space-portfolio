import { Button } from '@/src/components/shared/Button/Button'
import { Flex } from '@/src/components/shared/Flex/Flex'
import { GithubIcon } from '@/src/components/icons/GithubIcon'
import { Typography } from '@/src/components/shared/Typography/Typography'
import Link from 'next/link'
import styles from './HomeHero.module.scss'

export const HomeHero = () => (
  <Flex flexCol justifyCenter itemsCenter as='section' className={styles.section}>
    <Flex flexCol itemsCenter fullWidth className={styles.contentWrapper}>
      <Typography as='p' variant='T12Strong' className={styles.statusText}>
        [ AVAILABLE FOR FREELANCE ]
      </Typography>

      <Typography as='h1' className={styles.headline}>
        Crafting immersive
        <br />
        digital universes
      </Typography>

      <Typography as='p' variant='T20Soft' className={styles.description}>
        Senior React Frontend Developer focused on building high-performance, accessible, and
        visually stunning web experiences using modern technologies.
      </Typography>

      <Flex gap='var(--gap-m)' className={styles.buttonRow}>
        <Button
          as={Link}
          href='https://github.com/GLObus303'
          target='_blank'
          rel='noopener noreferrer'
          variant='solid'
        >
          <Flex itemsCenter gap='8px' as='div'>
            <GithubIcon className={styles.icon} />
            <Typography as='span' variant='T16Strong'>
              GitHub
            </Typography>
          </Flex>
        </Button>
        <Button as={Link} href='#contact' variant='spark'>
          Get in Touch
        </Button>
      </Flex>
    </Flex>
  </Flex>
)

export default HomeHero

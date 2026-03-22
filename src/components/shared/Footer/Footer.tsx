import { Flex } from '@/src/components/shared/Flex/Flex'
import { GithubIcon } from '@/src/components/icons/GithubIcon'
import { LinkedinIcon } from '@/src/components/icons/LinkedinIcon'
import { MessageIcon } from '@/src/components/icons/MessageIcon'
import { Typography } from '@/src/components/shared/Typography/Typography'
import Link from 'next/link'
import styles from './Footer.module.scss'

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.horizonGlow} />

    <Flex flexCol fullWidth className={styles.content}>
      <Flex className={styles.topRow}>
        <Flex flexCol gap='20px'>
          <Typography as='h4' variant='T12Strong' className={styles.colTitle}>
            EXPLORE
          </Typography>
          <Flex flexWrap itemsCenter gap='24px'>
            <Link href='#intro' className={styles.link}>
              <Typography as='span' variant='T14Soft' className={styles.linkText}>
                Intro
              </Typography>
            </Link>
            <Link href='#galaxy' className={styles.link}>
              <Typography as='span' variant='T14Soft' className={styles.linkText}>
                Galaxy of Roles
              </Typography>
            </Link>
            <Link href='#core' className={styles.link}>
              <Typography as='span' variant='T14Soft' className={styles.linkText}>
                Technical Core
              </Typography>
            </Link>
            <Link href='#beyond' className={styles.link}>
              <Typography as='span' variant='T14Soft' className={styles.linkText}>
                Beyond
              </Typography>
            </Link>
            <Link href='#contact' className={styles.link}>
              <Typography as='span' variant='T14Soft' className={styles.linkText}>
                Get in touch
              </Typography>
            </Link>
          </Flex>
        </Flex>

        <Flex flexCol gap='20px'>
          <Typography as='h4' variant='T12Strong' className={styles.colTitle}>
            CONNECT
          </Typography>
          <Flex itemsCenter gap='12px'>
            <Link
              href='mailto:globus303@gmail.com'
              className={styles.socialPill}
              aria-label='Email'
            >
              <span className={styles.sparkContainer} aria-hidden='true' />
              <MessageIcon className={styles.socialIcon} />
            </Link>
            <Link
              href='https://www.linkedin.com/in/lukascizek/'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socialPill}
              aria-label='LinkedIn'
            >
              <span className={styles.sparkContainer} aria-hidden='true' />
              <LinkedinIcon className={styles.socialIcon} />
            </Link>
            <Link
              href='https://github.com/GLObus303'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socialPill}
              aria-label='GitHub'
            >
              <span className={styles.sparkContainer} aria-hidden='true' />
              <GithubIcon className={styles.socialIcon} />
            </Link>
          </Flex>
        </Flex>
      </Flex>

      <Flex flexCol justifyBetween itemsCenter className={styles.bottomRow}>
        <div className={styles.copyright}>
          <Typography as='span' variant='L12Soft'>
            © {new Date().getFullYear()} Lucas Cizek
          </Typography>
        </div>
        <div className={styles.madeWith}>
          <Typography as='span' variant='L12Soft'>
            Made with Next.js, React… and a sprinkle of stardust.
          </Typography>
        </div>
      </Flex>
    </Flex>
  </footer>
)

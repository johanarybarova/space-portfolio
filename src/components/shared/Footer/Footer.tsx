import { Flex } from '../Flex/Flex'
import { Typography } from '../Typography/Typography'
import styles from './Footer.module.scss'

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.horizonGlow} />

    <div className={styles.content}>
      <div className={styles.topRow}>
        {/* Links Column */}
        <div className={styles.column}>
          <Typography as='h4' variant='T12Strong' className={styles.colTitle}>
            EXPLORE
          </Typography>
          <div className={styles.linksList}>
            <a href='#intro' className={styles.link}>
              Intro
            </a>
            <a href='#galaxy' className={styles.link}>
              Galaxy of Roles
            </a>
            <a href='#core' className={styles.link}>
              Technical Core
            </a>
            <a href='#beyond' className={styles.link}>
              Beyond
            </a>
            <a href='#contact' className={styles.link}>
              Get in touch
            </a>
          </div>
        </div>

        {/* Socials Column */}
        <div className={styles.column}>
          <Typography as='h4' variant='T12Strong' className={styles.colTitle}>
            CONNECT
          </Typography>
          <div className={styles.socialRow}>
            <a href='mailto:globus303@gmail.com' className={styles.socialPill} aria-label='Email'>
              <svg
                viewBox='0 0 24 24'
                fill='none'
                className={styles.socialIcon}
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  x='2'
                  y='4'
                  width='20'
                  height='16'
                  rx='2'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='square'
                  strokeLinejoin='miter'
                />
                <path
                  d='M22 7L13.03 12.7C12.7213 12.8934 12.3643 12.996 12 12.996C11.6357 12.996 11.2787 12.8934 10.97 12.7L2 7'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='square'
                  strokeLinejoin='miter'
                />
              </svg>
            </a>
            <a
              href='https://www.linkedin.com/in/lukascizek/'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socialPill}
              aria-label='LinkedIn'
            >
              <svg
                viewBox='0 0 24 24'
                fill='none'
                className={styles.socialIcon}
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='square'
                  strokeLinejoin='miter'
                />
                <rect
                  x='2'
                  y='9'
                  width='4'
                  height='12'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='square'
                  strokeLinejoin='miter'
                />
                <circle
                  cx='4'
                  cy='4'
                  r='2'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='square'
                  strokeLinejoin='miter'
                />
              </svg>
            </a>
            <a
              href='https://github.com/GLObus303'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socialPill}
              aria-label='GitHub'
            >
              <svg
                viewBox='0 0 24 24'
                fill='none'
                className={styles.socialIcon}
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M15 22V18C15 16.9391 14.5786 15.9217 13.8284 15.1716C13.0783 14.4214 12.0609 14 11 14C11.08 12.75 10.73 11.52 10 10.5C10.28 9.35 10.28 8.15 10 7C10 7 9 7 6 8.5C3.36 8 0.64 8 3.5 10.5C2.77 11.52 2.42 12.75 2.5 14C1.43913 14 0.421715 14.4214 -0.328427 15.1716C-1.07857 15.9217 -1.5 16.9391 -1.5 18V22'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='square'
                  strokeLinejoin='miter'
                />
                <path
                  d='M9 18C4.49 20 4 16 2 16'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='square'
                  strokeLinejoin='miter'
                />
                <path
                  d='M15 22V18C14.92 17.38 14.87 16.75 14.7 16.15C14.53 15.55 14.24 14.99 13.85 14.5C16.85 14.5 19.85 12.5 19.85 9C19.85 8.13 19.52 7.29 18.93 6.65C19 6.03 19.12 4.8 18.8 3.5C18.8 3.5 17.8 3.5 15.2 5C14.28 4.74 13.32 4.61 12.36 4.61C11.4 4.61 10.44 4.74 9.52 5C6.92 3.5 5.92 3.5 5.92 3.5C5.6 4.8 5.72 6.03 5.79 6.65C5.2 7.29 4.87 8.13 4.87 9C4.87 12.5 7.87 14.5 10.87 14.5C10.48 14.99 10.19 15.55 10.02 16.15C9.85 16.75 9.8 17.38 9.72 18V22'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='square'
                  strokeLinejoin='miter'
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.copyright}>
          <span>© {new Date().getFullYear()} Lucas Cizek.</span>
        </div>
        <div className={styles.madeWith}>
          <span>Made with Next.js, React & Stardust</span>
        </div>
      </div>
    </div>
  </footer>
)

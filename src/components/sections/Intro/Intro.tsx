import { Counter } from '@/src/components/shared/Counter/Counter'
import { Flex } from '@/src/components/shared/Flex/Flex'
import { Number } from '@/src/components/shared/Number/Number'
import { Section } from '@/src/components/shared/Section/Section'
import { SectionHeadings } from '@/src/components/shared/SectionHeadings/SectionHeadings'
import { Typography } from '@/src/components/shared/Typography/Typography'
import styles from './Intro.module.scss'

export const Intro = () => (
  <Section id='intro'>
    <Flex flexCol fullWidth justifyBetween className={styles.container}>
      <Number number='01' />

      <Flex fullWidth className={styles.splitLayout}>
        {/* Left Glass Panel */}
        <Flex flexCol className={styles.leftPanel}>
          <SectionHeadings headline='Intro' subheadline='Universe of experience' />
          <div className={styles.bioWrapper}>
            <Typography as='p' variant='L16Soft' className={styles.leadText}>
              I’m a seasoned full-stack engineer with a strong frontend focus, specializing in
              React, TypeScript, and building fast, accessible, and scalable web apps.
            </Typography>
            <Typography as='p' variant='L16Soft' className={styles.secondaryText}>
              I also bring solid backend experience with Node.js, Java, and Go. With over a decade
              in the industry, I’ve led teams, mentored developers, and shipped products used by
              millions.
            </Typography>
          </div>

          {/* Tech Pills at bottom of left panel */}
          <Flex gap='var(--gap-s)' className={styles.techPills}>
            <div className={styles.pill}>React</div>
            <div className={styles.pill}>TypeScript</div>
            <div className={styles.pill}>Next.js</div>
            <div className={styles.pill}>Node.js</div>
          </Flex>
        </Flex>

        {/* Right Panel - Stats Cards */}
        <div className={styles.rightPanel}>
          <div className={styles.statCard}>
            <div className={styles.iconWrapper}>
              {/* Sharp Code Brackets */}
              <svg
                viewBox='0 0 24 24'
                fill='none'
                className={styles.icon}
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M7 8L3 12L7 16'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='square'
                  strokeLinejoin='miter'
                />
                <path
                  d='M17 8L21 12L17 16'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='square'
                  strokeLinejoin='miter'
                />
                <path
                  d='M14 4L10 20'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='square'
                  strokeLinejoin='miter'
                />
              </svg>
            </div>
            <div>
              <Typography as='h3' variant='T32Strong' className={styles.statNumber}>
                <Counter value='10+' />
              </Typography>
              <Typography as='p' variant='T12Strong' className={styles.statLabel}>
                YEARS EXPERIENCE
              </Typography>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.iconWrapper}>
              {/* Sharp Bolt */}
              <svg
                viewBox='0 0 24 24'
                fill='none'
                className={styles.icon}
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M13 2L3 14H12L11 22L21 10H12L13 2Z'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='square'
                  strokeLinejoin='miter'
                />
              </svg>
            </div>
            <div>
              <Typography as='h3' variant='T32Strong' className={styles.statNumber}>
                <Counter value='100M+' />
              </Typography>
              <Typography as='p' variant='T12Strong' className={styles.statLabel}>
                USERS IMPACTED
              </Typography>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.iconWrapper}>
              {/* Geometric Atom */}
              <svg
                viewBox='0 0 24 24'
                fill='none'
                className={styles.icon}
                xmlns='http://www.w3.org/2000/svg'
              >
                <ellipse
                  cx='12'
                  cy='12'
                  rx='3'
                  ry='9'
                  transform='rotate(45 12 12)'
                  stroke='currentColor'
                  strokeWidth='1.5'
                />
                <ellipse
                  cx='12'
                  cy='12'
                  rx='3'
                  ry='9'
                  transform='rotate(-45 12 12)'
                  stroke='currentColor'
                  strokeWidth='1.5'
                />
                <circle cx='12' cy='12' r='2' stroke='currentColor' strokeWidth='1.5' />
              </svg>
            </div>
            <div>
              <Typography as='h3' variant='T32Strong' className={styles.statNumber}>
                <Counter value='8+' />
              </Typography>
              <Typography as='p' variant='T12Strong' className={styles.statLabel}>
                YEARS REACT
              </Typography>
            </div>
          </div>
        </div>
      </Flex>
    </Flex>
  </Section>
)

import { AtomIcon } from '@/src/components/icons/AtomIcon'
import { CodeIcon } from '@/src/components/icons/CodeIcon'
import { Counter } from '@/src/components/shared/Counter/Counter'
import { FlashIcon } from '@/src/components/icons/FlashIcon'
import { Flex } from '@/src/components/shared/Flex/Flex'
import { Number } from '@/src/components/shared/Number/Number'
import { Section } from '@/src/components/shared/Section/Section'
import { SectionHeadings } from '@/src/components/shared/SectionHeadings/SectionHeadings'
import { Typography } from '@/src/components/shared/Typography/Typography'
import { data } from './data'
import styles from './Intro.module.scss'

export const Intro = () => (
  <Section id='intro'>
    <Flex flexCol fullWidth justifyBetween className={styles.container}>
      <Number number='01' />

      <Flex fullWidth className={styles.splitLayout}>
        <Flex flexCol className={styles.leftPanel}>
          <SectionHeadings headline='Intro' subheadline='Universe of experience' />
          <div className={styles.bioWrapper}>
            {data.paragraphs.map((paragraph, index) => (
              <Typography
                key={paragraph}
                as='p'
                variant='L16Soft'
                className={index === 0 ? styles.leadText : styles.secondaryText}
              >
                {paragraph}
              </Typography>
            ))}
          </div>

          <Flex gap='var(--gap-s)' className={styles.techPills}>
            {data.pills.map(pill => (
              <div key={pill} className={styles.pill}>
                <Typography as='span' variant='T14Soft' className={styles.pillText}>
                  {pill}
                </Typography>
              </div>
            ))}
          </Flex>
        </Flex>

        <Flex flexCol className={styles.rightPanel}>
          {data.stats.map(stat => (
            <Flex key={stat.label} flexCol justifyBetween itemsStart className={styles.statCard}>
              <Flex itemsCenter justifyCenter className={styles.iconWrapper}>
                {stat.icon === 'code' && <CodeIcon className={styles.icon} />}
                {stat.icon === 'flash' && <FlashIcon className={styles.icon} />}
                {stat.icon === 'atom' && <AtomIcon className={styles.icon} />}
              </Flex>
              <div>
                <Typography as='h3' variant='T32Strong' className={styles.statNumber}>
                  <Counter value={stat.value} />
                </Typography>
                <Typography as='p' variant='T12Strong' className={styles.statLabel}>
                  {stat.label}
                </Typography>
              </div>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  </Section>
)

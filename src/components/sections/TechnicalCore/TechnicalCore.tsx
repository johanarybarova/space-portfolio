import { Flex } from '@/src/components/shared/Flex/Flex'
import { Number } from '@/src/components/shared/Number/Number'
import { Section } from '@/src/components/shared/Section/Section'
import { SectionHeadings } from '@/src/components/shared/SectionHeadings/SectionHeadings'
import { Typography } from '@/src/components/shared/Typography/Typography'
import { data } from './data'
import cx from 'classnames'
import styles from './TechnicalCore.module.scss'

export const TechnicalCore = () => (
  <Section>
    <Flex flexCol fullWidth justifyBetween className={styles.container}>
      <Number number='03' />
      <Flex flexCol fullWidth className={styles.textContentWrapper}>
        <SectionHeadings headline='Technical Core' subheadline='Solar System of Skills' />
        <Flex as='ul' flexCol fullWidth gap='var(--gap-lg)' className={styles.bottomContent}>
          {data.paragraphs.map((item, i) => (
            <li key={i}>
              <Typography as='span' variant='L16Soft'>
                {item}
              </Typography>
            </li>
          ))}
          <Flex as='ul' flexWrap fullWidth className={styles.pillsWrapper}>
            {data.pills.map((item, i) => (
              <li
                key={i}
                className={cx(styles.pill, {
                  [styles.colored]:
                    item.includes('React – 8 years') || item.includes('Next.js – 8 years'),
                })}
              >
                <Typography
                  as='span'
                  variant='L16Soft'
                  className={cx(styles.pillText, {
                    [styles.colored]:
                      item.includes('React – 8 years') || item.includes('Next.js – 8 years'),
                  })}
                >
                  {item}
                </Typography>
              </li>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  </Section>
)

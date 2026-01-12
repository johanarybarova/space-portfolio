import React from 'react'

import { Flex } from '@/src/components/shared/Flex/Flex'
import { Number } from '@/src/components/shared/Number/Number'
import { Section } from '@/src/components/shared/Section/Section'
import { SectionHeadings } from '@/src/components/shared/SectionHeadings/SectionHeadings'
import { Typography } from '@/src/components/shared/Typography/Typography'

import { data } from './data'
import styles from './TechnicalCore.module.scss'

export const TechnicalCore = () => (
  <Section id='core'>
    <Flex flexCol fullWidth justifyBetween className={styles.container}>
      <Number number='03' />
      <Flex flexCol fullWidth className={styles.textContentWrapper}>
        <div className={styles.headerGroup}>
          <SectionHeadings headline='Technical Core' subheadline='Solar System of Skills' />
        </div>

        <Flex flexCol fullWidth gap='var(--gap-lg)' className={styles.bottomContent}>
          <div className={styles.introText}>
            {data.paragraphs.map((item, i) => (
              <Typography key={i} as='p' variant='L16Soft' className={styles.paragraph}>
                {item}
              </Typography>
            ))}
          </div>

          <Flex as='ul' flexWrap fullWidth gap='var(--gap-s)' className={styles.pillsWrapper}>
            {data.pills.map((item, i) => (
              <li key={i} className={styles.pill}>
                <Typography as='span' className={styles.pillText}>
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

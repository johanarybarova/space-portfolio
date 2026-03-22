import { Flex } from '@/src/components/shared/Flex/Flex'
import { Number } from '@/src/components/shared/Number/Number'
import { Section } from '@/src/components/shared/Section/Section'
import { SectionHeadings } from '@/src/components/shared/SectionHeadings/SectionHeadings'
import { Typography } from '@/src/components/shared/Typography/Typography'
import { data } from './data'
import React from 'react'
import styles from './GalaxyOfRoles.module.scss'

export const GalaxyOfRoles = () => (
  <Section id='galaxy'>
    <Flex flexCol fullWidth justifyBetween className={styles.container}>
      <Number number='02' />
      <Flex flexCol fullWidth className={styles.textContentWrapper}>
        <div className={styles.headerGroup}>
          <SectionHeadings headline='Galaxy of Roles' subheadline='Orbiting Companies' />
        </div>

        <Flex
          as='ul'
          flexCol
          fullWidth
          className={styles.timeline}
          style={{ '--total-items': data.length } as React.CSSProperties}
        >
          {data.map((item, index) => (
            <Flex
              as='li'
              key={item.company}
              flexCol
              className={styles.timelineItem}
              style={{ '--index': index } as React.CSSProperties}
            >
              <div className={styles.timelineConnector}>
                <div className={styles.timelineNode} style={{ animationDelay: `${index * 1}s` }} />
                <div className={styles.timelineLine} />
              </div>

              <div className={styles.itemContent}>
                <Flex justifyBetween itemsCenter fullWidth className={styles.itemHeader}>
                  <Flex flexCol>
                    <Typography as='h3' variant='T20Soft' className={styles.company}>
                      {item.company}
                    </Typography>
                    <Typography as='span' variant='T16Soft' className={styles.role}>
                      {item.role}
                    </Typography>
                  </Flex>
                  <Typography as='span' variant='T12Strong' className={styles.dateBadge}>
                    {item.date}
                  </Typography>
                </Flex>

                {item.bullets.length > 0 && (
                  <Flex as='ul' flexCol gap='var(--gap-xs)' className={styles.bullets}>
                    {item.bullets.map((bullet, i) => (
                      <li key={i} className={styles.bulletItem}>
                        <span className={styles.bulletDot}>›</span>
                        <Typography as='span' variant='L16Soft' className={styles.bulletText}>
                          {bullet}
                        </Typography>
                      </li>
                    ))}
                  </Flex>
                )}
              </div>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  </Section>
)

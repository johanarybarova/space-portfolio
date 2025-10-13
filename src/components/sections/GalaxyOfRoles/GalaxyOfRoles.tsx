import { Flex } from '@/src/components/shared/Flex/Flex'
import { Number } from '@/src/components/shared/Number/Number'
import { Section } from '@/src/components/shared/Section/Section'
import { SectionHeadings } from '@/src/components/shared/SectionHeadings/SectionHeadings'
import { Typography } from '@/src/components/shared/Typography/Typography'
import { data } from './data'
import styles from './GalaxyOfRoles.module.scss'

export const GalaxyOfRoles = () => (
  <Section>
    <Flex flexCol fullWidth justifyBetween className={styles.container}>
      <Number number='02' />
      <Flex flexCol fullWidth className={styles.textContentWrapper}>
        <SectionHeadings headline='Galaxy of Roles' subheadline='Orbiting Companies' />
        <Flex as='ul' flexCol fullWidth gap='var(--gap-lg)' className={styles.bottomContent}>
          {data.map(item => (
            <Flex as='li' key={item.company} flexCol gap='var(--gap-m)'>
              <Flex as='div' flexCol gap='var(--gap-s)'>
                <Typography as='h3' variant='T20Strong'>
                  {item.company}
                  <span className={styles.role}> – {item.role}</span>
                </Typography>
                <Typography as='p' variant='T16Soft'>
                  {item.date}
                </Typography>
              </Flex>

              {item.bullets.length > 0 && (
                <Flex as='ul' flexCol gap='var(--gap-xs)'>
                  {item.bullets.map((bullet, i) => (
                    <li key={i}>
                      <Typography as='span' variant='L16Soft'>
                        {bullet}
                      </Typography>
                    </li>
                  ))}
                </Flex>
              )}
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  </Section>
)

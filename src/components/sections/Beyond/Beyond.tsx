import { Button } from '@/src/components/shared/Button/Button'
import { Flex } from '@/src/components/shared/Flex/Flex'
import { Number } from '@/src/components/shared/Number/Number'
import { Section } from '@/src/components/shared/Section/Section'
import { SectionHeadings } from '@/src/components/shared/SectionHeadings/SectionHeadings'
import { Typography } from '@/src/components/shared/Typography/Typography'
import { data } from './data'
import Link from 'next/link'
import styles from './Beyond.module.scss'

export const Beyond = () => (
  <Section id='beyond'>
    <Flex flexCol fullWidth justifyBetween className={styles.container}>
      <Number number='04' />
      <Flex flexCol fullWidth className={styles.textContentWrapper}>
        <Flex className={styles.contentLeft}>
          <div className={styles.headerGroup}>
            <SectionHeadings headline='Beyond' subheadline='Every Action Sparks a Reaction' />
          </div>
        </Flex>

        <Flex flexCol fullWidth>
          <Flex flexCol fullWidth className={styles.textContent}>
            {data.paragraphs.map((item, i) => (
              <Typography key={i} as='span' variant='L16Soft' className={styles.text}>
                {item}
              </Typography>
            ))}
          </Flex>
          <Button as={Link} href='#contact' variant='spark' className={styles.mentorButton}>
            Mentor me
          </Button>
        </Flex>
      </Flex>
    </Flex>
  </Section>
)

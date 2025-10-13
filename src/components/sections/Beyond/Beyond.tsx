import { Flex } from '@/src/components/shared/Flex/Flex'
import { Number } from '@/src/components/shared/Number/Number'
import { Section } from '@/src/components/shared/Section/Section'
import { SectionHeadings } from '@/src/components/shared/SectionHeadings/SectionHeadings'
import { Typography } from '@/src/components/shared/Typography/Typography'
import { data } from './data'
import styles from './Beyond.module.scss'

export const Beyond = () => (
  <Section>
    <Flex flexCol fullWidth justifyBetween className={styles.container}>
      <Number number='04' />
      <Flex flexCol fullWidth className={styles.textContentWrapper}>
        <SectionHeadings headline='Beyond' subheadline='Every Action Sparks a Reaction' />
        <Flex as='ul' flexCol fullWidth gap='var(--gap-lg)' className={styles.bottomContent}>
          {data.paragraphs.map((item, i) => (
            <li key={i}>
              <Typography as='span' variant='L16Soft'>
                {item}
              </Typography>
            </li>
          ))}
        </Flex>
      </Flex>
    </Flex>
  </Section>
)

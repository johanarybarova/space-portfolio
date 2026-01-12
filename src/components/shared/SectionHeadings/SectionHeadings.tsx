import { Flex } from '@/src/components/shared/Flex/Flex'
import { Typography } from '@/src/components/shared/Typography/Typography'
import styles from './SectionHeadings.module.scss'

export const SectionHeadings = ({
  headline,
  subheadline,
}: {
  headline: string
  subheadline: string
}) => (
  <Flex flexCol gap='var(--gap-m)' className={styles.sectionHeadings}>
    <Typography as='h2' variant='T32Strong' className={styles.headline}>
      {headline}
    </Typography>
    <Typography as='p' variant='T12Strong' className={styles.subheadline}>
      {subheadline}
    </Typography>
  </Flex>
)

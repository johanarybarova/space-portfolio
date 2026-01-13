import { Flex } from '@/src/components/shared/Flex/Flex'
import { Typography } from '@/src/components/shared/Typography/Typography'
import cx from 'classnames'
import styles from './SectionHeadings.module.scss'

export const SectionHeadings = ({
  headline,
  subheadline,
  className,
}: {
  headline: string
  subheadline: string
  className?: string
}) => (
  <Flex flexCol gap='var(--gap-m)' className={cx(styles.sectionHeadings, className)}>
    <Typography as='h2' variant='T32Strong' className={styles.headline}>
      {headline}
    </Typography>
    <Typography as='p' variant='T12Strong' className={styles.subheadline}>
      {subheadline}
    </Typography>
  </Flex>
)

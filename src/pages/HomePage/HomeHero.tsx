import { Flex } from '@/src/components/shared/Flex/Flex'
import { Typography } from '@/src/components/shared/Typography/Typography'
import styles from './HomeHero.module.scss'

export const HomeHero = () => (
  <Flex
    flexCol
    justifyCenter
    itemsCenter
    as='section'
    gap='var(--gap-s)'
    className={styles.section}
  >
    {/* <Typography as='h1' variant='T16Strong' className={styles.headline}>
      Lucas Cizek
    </Typography>
    <Typography as='p' variant='T12Soft' className={styles.subheadline}>
      Senior Full-Stack Engineer | Team Leader
    </Typography> */}
    <Typography as='p' variant='T32Strong' className={styles.headline}>
      👻 Hero not yet here... 👻
    </Typography>
  </Flex>
)

export default HomeHero

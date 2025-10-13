import { Typography } from '../Typography/Typography'
import styles from './Number.module.scss'

export const Number = ({ number }: { number: string }) => (
  <Typography as='p' className={styles.number}>
    {number}
  </Typography>
)

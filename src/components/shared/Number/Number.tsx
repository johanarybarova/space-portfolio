import { Typography } from '../Typography/Typography'
import cx from 'classnames'
import styles from './Number.module.scss'

export const Number = ({ number }: { number: string }) => (
  <Typography as='p' className={cx(styles.number, styles.cyanText)}>
    {number}
  </Typography>
)

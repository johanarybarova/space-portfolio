import { Flex } from '../Flex/Flex'
import { Typography } from '../Typography/Typography'
import Link from 'next/link'
import styles from './Header.module.scss'

export const Header = () => (
  <header>
    <Flex as='nav' fullWidth itemsCenter justifyBetween className={styles.navigation}>
      <Link href='/' className={styles.navContent}>
        <Typography as='p' variant='T16Soft'>
          Lucas Cizek
        </Typography>
      </Link>
      <Flex flexWrap justifyCenter itemsCenter gap='var(--gap-s)'>
        <Typography as='p' variant='T16Soft' className={styles.navContent}>
          10<sup>-10</sup> m
        </Typography>
        <figure className={styles.iconWrapper}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='40'
            height='40'
            fill='none'
            className={styles.icon}
          >
            <path
              stroke='#00DEFF'
              strokeWidth='.947'
              d='M19.986 34.827c.61 0 1.246-.325 1.88-1.033.634-.708 1.227-1.76 1.734-3.099 1.013-2.675 1.65-6.403 1.65-10.545 0-4.14-.637-7.869-1.65-10.545-.507-1.339-1.1-2.39-1.734-3.098-.634-.708-1.27-1.033-1.88-1.033-.61 0-1.246.325-1.88 1.033-.634.708-1.227 1.76-1.734 3.098-1.013 2.676-1.65 6.404-1.65 10.545 0 4.142.637 7.87 1.65 10.545.508 1.34 1.1 2.391 1.734 3.099.634.708 1.27 1.033 1.88 1.033Z'
            />
            <path
              stroke='#00DEFF'
              strokeWidth='.947'
              d='M32.699 27.49c.305-.527.342-1.241.046-2.145-.297-.903-.91-1.941-1.817-3.05-1.81-2.215-4.721-4.63-8.308-6.701-3.586-2.07-7.133-3.384-9.957-3.844-1.413-.23-2.62-.243-3.55-.048-.93.195-1.53.584-1.835 1.112-.305.528-.341 1.242-.045 2.145.296.902.91 1.941 1.817 3.05 1.81 2.215 4.72 4.63 8.307 6.7 3.587 2.072 7.133 3.384 9.957 3.845 1.413.23 2.62.243 3.55.048.93-.195 1.53-.583 1.835-1.111Z'
            />
            <path
              stroke='#00DEFF'
              strokeWidth='.947'
              d='M32.721 12.808c-.304-.528-.904-.917-1.835-1.112-.93-.195-2.137-.182-3.55.048-2.824.46-6.37 1.773-9.957 3.844-3.586 2.07-6.497 4.486-8.307 6.7-.907 1.11-1.52 2.149-1.817 3.051-.296.904-.26 1.618.046 2.146.305.528.904.916 1.834 1.111.93.195 2.137.183 3.55-.048 2.824-.46 6.37-1.773 9.957-3.844 3.587-2.07 6.497-4.486 8.308-6.7.906-1.11 1.52-2.149 1.817-3.051.296-.903.26-1.617-.046-2.145Z'
            />
            <circle
              cx='2.547'
              cy='2.547'
              r='2.074'
              fill='#00DEFF'
              stroke='#00DEFF'
              strokeWidth='.947'
              transform='matrix(1 0 0 -1 17.439 22.72)'
            />
          </svg>
        </figure>
      </Flex>
    </Flex>
  </header>
)
